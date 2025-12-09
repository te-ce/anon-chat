"use client";

import { RoomHeader } from "@/components/room/roomHeader";
import { RoomInput } from "@/components/room/roomInput";
import { RoomMessages } from "@/components/room/roomMessages";
import { useParams } from "next/navigation";

const Page = () => {
  const params = useParams();
  const roomId = params.roomId as string;

  return (
    <main className="flex h-screen max-h-screen flex-col overflow-hidden">
      <RoomHeader roomId={roomId} />
      <RoomMessages />
      <RoomInput />
    </main>
  );
};

export default Page;
