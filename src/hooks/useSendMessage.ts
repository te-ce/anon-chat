import { client } from "@/lib/client";
import { useMutation } from "@tanstack/react-query";

interface SendMessageProps {
  text: string;
  roomId: string;
  username: string;
}

export const useSendMessage = () => {
  const { mutate: sendMessage, isPending } = useMutation({
    mutationFn: async ({ text, roomId, username }: SendMessageProps) => {
      await client.messages.post(
        { sender: username, text },
        { query: { roomId } },
      );
    },
  });

  return { sendMessage, isPending };
};
