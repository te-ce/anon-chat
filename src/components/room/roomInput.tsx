import { useRef, useState } from "react";
import { useSendMessage } from "@/hooks/useSendMessage";
import { useRoomStore } from "@/app/store/roomStore";
import { useGetUsername } from "@/hooks/useGetUsername";

export const RoomInput = () => {
  const [input, setInput] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const roomId = useRoomStore((state) => state.roomId);
  const { sendMessage, isPending } = useSendMessage();
  const { username } = useGetUsername();

  const handleSendMessage = () => {
    if (!input.trim()) return;

    sendMessage({ text: input, roomId, username });
    setInput("");
    inputRef.current?.focus();
  };

  return (
    <div className="border-t border-zinc-800 bg-zinc-900/30 p-4">
      <div className="flex gap-4">
        <div className="group relative flex-1">
          <span className="absolute top-1/2 left-4 -translate-y-1/2 animate-pulse text-green-500">
            {">"}
          </span>
          <input
            autoFocus
            type="text"
            value={input}
            onKeyDown={(e) => {
              if (e.key === "Enter" && input.trim() && !isPending) {
                handleSendMessage();
              }
            }}
            placeholder="Type message..."
            onChange={(e) => setInput(e.target.value)}
            className="w-full border border-zinc-800 bg-black py-3 pr-4 pl-8 text-sm text-zinc-100 transition-colors placeholder:text-zinc-700 focus:border-zinc-700 focus:outline-none"
          />
        </div>

        <button
          onClick={handleSendMessage}
          disabled={!input.trim() || isPending}
          className="cursor-pointer bg-zinc-800 px-6 text-sm font-bold text-zinc-400 transition-all hover:text-zinc-200 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isPending ? "SENDING..." : "SEND"}
        </button>
      </div>
    </div>
  );
};
