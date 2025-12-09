import { useRoomStore } from "@/app/store/roomStore";
import { useDeleteRoom } from "@/hooks/useDeleteRoom";
import { useGetRemainingTime } from "@/hooks/useGetRemainingTime";
import { useState } from "react";

const formatTimeRemaining = (seconds: number) => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, "0")}`;
};

export const RoomHeader = () => {
  const roomId = useRoomStore((state) => state.roomId);
  const { timeRemaining } = useGetRemainingTime(roomId);
  const [copyStatus, setCopyStatus] = useState<"copy" | "copied">("copy");
  const { destroyRoom } = useDeleteRoom();

  const copyLink = () => {
    navigator.clipboard.writeText(`${window.location.origin}/room/${roomId}`);
    setCopyStatus("copied");

    setTimeout(() => {
      setCopyStatus("copy");
    }, 2000);
  };

  return (
    <header className="flex items-center justify-between border-b border-zinc-800 bg-zinc-900/30 p-4">
      <div className="flex items-center gap-4">
        <div className="flex flex-col">
          <span className="text-xs text-zinc-500 uppercase">Room ID</span>
          <div className="flex items-center gap-2">
            <span className="truncate font-bold text-green-500">
              {roomId.slice(0, 10) + "..."}
            </span>
            <button
              onClick={copyLink}
              className="rounded bg-zinc-800 px-2 py-0.5 text-[10px] text-zinc-400 transition-colors hover:bg-zinc-700 hover:text-zinc-200"
            >
              {copyStatus}
            </button>
          </div>
        </div>

        <div className="h-8 w-px bg-zinc-800" />

        <div className="flex flex-col">
          <span className="text-xs text-zinc-500 uppercase">Self-Destruct</span>
          <span
            className={`flex items-center gap-2 text-sm font-bold ${
              timeRemaining !== null && timeRemaining < 60
                ? "text-red-500"
                : "text-amber-500"
            }`}
          >
            {timeRemaining !== null
              ? formatTimeRemaining(timeRemaining)
              : "--:--"}
          </span>
        </div>
      </div>

      <button
        onClick={() => destroyRoom(roomId)}
        className="group flex items-center gap-2 rounded bg-zinc-800 px-3 py-1.5 text-xs font-bold text-zinc-400 transition-all hover:bg-red-600 hover:text-white disabled:opacity-50"
      >
        <span className="group-hover:animate-pulse">💣</span>
        DESTROY NOW
      </button>
    </header>
  );
};
