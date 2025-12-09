import { NextRequest, NextResponse } from "next/server";
import { redis } from "./lib/redis";
import { nanoid } from "nanoid";
import { ERROR_CODE } from "./app/util/consts";

export const proxy = async (req: NextRequest) => {
  const pathname = req.nextUrl.pathname;
  const roomMatch = pathname.match(/^\/room\/([^/]+)$/);

  if (!roomMatch) return NextResponse.redirect(new URL("/", req.url));

  const roomId = roomMatch[1];
  const room = await redis.hgetall<{ connected: string[]; createdAt: number }>(
    `meta:${roomId}`,
  );

  if (!room) {
    return NextResponse.redirect(
      new URL(`/?error=${ERROR_CODE.ROOM_NOT_FOUND}`, req.url),
    );
  }

  const existingToken = req.cookies.get("x-auth-token")?.value;

  if (existingToken && room.connected.includes(existingToken)) {
    return NextResponse.next();
  }

  if (room.connected.length >= 2) {
    return NextResponse.redirect(
      new URL(`/?error=${ERROR_CODE.ROOM_FULL}`, req.url),
    );
  }

  const response = NextResponse.next();
  const token = nanoid();

  response.cookies.set("x-auth-token", token, {
    path: "/",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });

  await redis.hset(`meta:${roomId}`, {
    connected: [...room.connected, token],
  });

  return response;
};

export const config = {
  matcher: "/room/:path*",
};
