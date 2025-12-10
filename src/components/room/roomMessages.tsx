import { useGetMessages } from "@/hooks/useGetMessages";
import { useRoomStore } from "@/app/store/roomStore";
import { useGetUsername } from "@/hooks/useGetUsername";
import { format } from "date-fns";
import { useRealtime } from "@/lib/realtimeClient";
import { useRouter } from "next/navigation";
import QRCode from "react-qr-code";

export const RoomMessages = () => {
  const router = useRouter();
  const roomId = useRoomStore((state) => state.roomId);
  const { data, refetch } = useGetMessages(roomId);
  const { username } = useGetUsername();
  const showQrCode = useRoomStore((state) => state.showQrCode);
  const setShowQrCode = useRoomStore((state) => state.setShowQrCode);

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
    <section className="scrollbar-thin relative flex-1 space-y-4 overflow-y-auto p-4">
      {showQrCode && (
        <figure
          className="absolute inset-0 z-10 flex h-full items-center justify-center backdrop-blur-[6px]"
          onClick={() => setShowQrCode(false)}
        >
          <span className="bg-white p-2">
            <QRCode value={`${window.location.origin}/room/${roomId}`} />
          </span>
        </figure>
      )}

      {data?.messages.map((message) => (
        <section
          key={message.id}
          className="group relative flex max-w-[80%] flex-col items-start"
        >
          <header className="mb-1 flex items-baseline gap-3">
            <span
              className={`text-xs font-bold ${
                message.sender === username ? "text-green-500" : "text-blue-500"
              }`}
            >
              {message.sender === username ? "YOU" : message.sender}
            </span>

            <span className="text-[10px] text-zinc-600">
              {format(message.timestamp, "HH:mm")}
            </span>
          </header>

          <p className="text-sm leading-relaxed break-all text-zinc-300">
            {message.text}
          </p>
        </section>
      ))}
    </section>
  );
};
