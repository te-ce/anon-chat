"use client";

import { useRoomStore } from "@/app/store/roomStore";
import { RoomHeader } from "@/components/room/roomHeader";
import { RoomInput } from "@/components/room/roomInput";
import { RoomMessages } from "@/components/room/roomMessages";
import { useParams } from "next/navigation";

const Page = () => {
  const params = useParams();
  const roomId = params.roomId as string;
  const setRoomId = useRoomStore((state) => state.setRoomId);
  setRoomId(roomId);

  return (
    <main className="flex h-dvh flex-col overflow-hidden">
      <RoomHeader />
      <RoomMessages />
      <RoomInput />
    </main>
  );
};

export default Page;
