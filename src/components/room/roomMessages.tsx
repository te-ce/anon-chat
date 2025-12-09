import { useGetMessages } from "@/hooks/useGetMessages";
import { useRoomStore } from "@/app/store/roomStore";
import { useGetUsername } from "@/hooks/useGetUsername";
import { format } from "date-fns";
import { useRealtime } from "@/lib/realtimeClient";
import { useRouter } from "next/navigation";

export const RoomMessages = () => {
  const router = useRouter();
  const roomId = useRoomStore((state) => state.roomId);
  const { data, refetch } = useGetMessages(roomId);
  const { username } = useGetUsername();

  useRealtime({
    channels: [roomId],
    events: ["chat.message", "chat.destroy"],
    onData: ({ event }) => {
      if (event === "chat.message") {
        refetch();
      }

      if (event === "chat.destroy") {
        router.push("/?destroyed=true");
      }
    },
  });

  return (
    <div className="scrollbar-thin flex-1 space-y-4 overflow-y-auto p-4">
      {data?.messages.length === 0 && (
        <div className="flex h-full items-center justify-center">
          <p className="font-mono text-sm text-zinc-600">
            No messages yet, start the conversation.
          </p>
        </div>
      )}

      {data?.messages.map((message) => (
        <div key={message.id} className="flex flex-col items-start">
          <div className="group max-w-[80%]">
            <div className="mb-1 flex items-baseline gap-3">
              <span
                className={`text-xs font-bold ${
                  message.sender === username
                    ? "text-green-500"
                    : "text-blue-500"
                }`}
              >
                {message.sender === username ? "YOU" : message.sender}
              </span>

              <span className="text-[10px] text-zinc-600">
                {format(message.timestamp, "HH:mm")}
              </span>
            </div>

            <p className="text-sm leading-relaxed break-all text-zinc-300">
              {message.text}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};
