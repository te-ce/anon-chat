import z from "zod";
import { authMiddleware } from "./auth";
import Elysia from "elysia";
import { redis } from "@/lib/redis";
import { Message, realtime } from "@/lib/realtime";
import { nanoid } from "nanoid";

export const messages = new Elysia({ prefix: "/messages" })
  .use(authMiddleware)
  .post(
    "/",
    async ({ body, auth }) => {
      const { sender, text } = body;
      const { roomId } = auth;

      const roomExists = await redis.exists(`meta:${roomId}`);

      if (!roomExists) {
        throw new Error("Room not found");
      }

      const message: Message = {
        id: nanoid(),
        sender,
        text,
        timestamp: Date.now(),
        roomId,
      };

      await redis.rpush(`messages:${roomId}`, {
        ...message,
        token: auth.token,
      });
      await realtime.channel(roomId).emit("chat.message", message);

      const remaining = await redis.ttl(`meta:${roomId}`);
      await Promise.all([
        redis.expire(`messages:${roomId}`, remaining),
        redis.expire(`history:${roomId}`, remaining),
        redis.expire(roomId, remaining),
      ]);
    },
    {
      query: z.object({ roomId: z.string() }),
      body: z.object({
        sender: z.string().max(100),
        text: z.string().max(1000),
      }),
    },
  )
  .get(
    "/",
    async ({ auth }) => {
      const messages = await redis.lrange<Message>(
        `messages:${auth.roomId}`,
        0,
        -1,
      );

      return {
        messages: messages.map((message) => ({
          ...message,
          token: message.token === auth.token ? auth.token : undefined,
        })),
      };
    },
    { query: z.object({ roomId: z.string() }) },
  );
