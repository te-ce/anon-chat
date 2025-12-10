import { useRoomStore } from "@/app/store/roomStore";
import { useDeleteRoom } from "@/hooks/useDeleteRoom";
import { useHandleRemainingTime } from "@/hooks/useHandleRemainingTime";
import { useState } from "react";

const formatTimeRemaining = (seconds: number) => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, "0")}`;
};

export const RoomHeader = () => {
  const [copyStatus, setCopyStatus] = useState<"copy" | "copied">("copy");
  const showQrCode = useRoomStore((state) => state.showQrCode);
  const setShowQrCode = useRoomStore((state) => state.setShowQrCode);
  const roomId = useRoomStore((state) => state.roomId);
  const { timeRemaining } = useHandleRemainingTime(roomId);
  const { destroyRoom } = useDeleteRoom();

  const copyLink = () => {
    navigator.clipboard.writeText(`${window.location.origin}/room/${roomId}`);
    setCopyStatus("copied");

    setTimeout(() => {
      setCopyStatus("copy");
    }, 2000);
  };

  const toggleQrCode = () => {
    setShowQrCode(!showQrCode);
  };

  return (
    <header className="flex flex-col items-center justify-between gap-2 border-b border-zinc-800 bg-zinc-900/30 p-4 md:flex-row">
      <section className="flex items-center gap-4">
        <div className="flex flex-col">
          <span className="text-xs text-zinc-500 uppercase">Room ID</span>
          <span className="truncate font-bold text-green-500">
            {roomId.slice(0, 10) + "..."}
          </span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <button
            onClick={copyLink}
            className="w-full rounded bg-zinc-800 px-2 py-0.5 text-[10px] whitespace-nowrap text-zinc-400 transition-colors hover:bg-zinc-700 hover:text-zinc-200"
          >
            {copyStatus} link
          </button>
          <button
            onClick={toggleQrCode}
            className="w-full rounded bg-zinc-800 px-2 py-0.5 text-[10px] whitespace-nowrap text-zinc-400 transition-colors hover:bg-zinc-700 hover:text-zinc-200"
          >
            {showQrCode ? "hide" : "show"} qr
          </button>
        </div>
        <div className="hidden h-8 w-px bg-zinc-800 md:block" />
      </section>
      <section className="flex items-center justify-between gap-2 md:w-full">
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
        <div className="flex items-center gap-2">
          <button
            onClick={() => destroyRoom(roomId)}
            className="group flex items-center gap-2 rounded bg-zinc-800 px-3 py-1.5 text-xs font-bold whitespace-nowrap text-zinc-400 transition-all hover:bg-red-600 hover:text-white disabled:opacity-50"
          >
            <span className="group-hover:animate-pulse">💣</span>
            DESTROY NOW
          </button>
        </div>
      </section>
    </header>
  );
};
