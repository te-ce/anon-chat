import z from "zod";
import { authMiddleware } from "./auth";
import Elysia from "elysia";
import { redis } from "@/lib/redis";

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

      console.log("SENDING MESSAGE", { sender, text });

      return { message: "Message sent" };
    },
    {
      query: z.object({ roomId: z.string() }),
      body: z.object({
        sender: z.string().max(100),
        text: z.string().max(1000),
      }),
    },
  );
