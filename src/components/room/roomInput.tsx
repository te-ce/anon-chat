import { useRef, useState } from "react";

export const RoomInput = () => {
  const [input, setInput] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const sendMessage = (message: { text: string }) => {
    // TODO: Implement send message
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
              if (e.key === "Enter" && input.trim()) {
                sendMessage({ text: input });
                inputRef.current?.focus();
              }
            }}
            placeholder="Type message..."
            onChange={(e) => setInput(e.target.value)}
            className="w-full border border-zinc-800 bg-black py-3 pr-4 pl-8 text-sm text-zinc-100 transition-colors placeholder:text-zinc-700 focus:border-zinc-700 focus:outline-none"
          />
        </div>

        <button
          onClick={() => {
            sendMessage({ text: input });
            inputRef.current?.focus();
          }}
          disabled={!input.trim()}
          className="cursor-pointer bg-zinc-800 px-6 text-sm font-bold text-zinc-400 transition-all hover:text-zinc-200 disabled:cursor-not-allowed disabled:opacity-50"
        >
          SEND
        </button>
      </div>
    </div>
  );
};
