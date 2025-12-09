import { client } from "@/lib/client";
import { useMutation } from "@tanstack/react-query";

export const useSendMessage = () => {
  const { mutate: sendMessage, isPending } = useMutation({
    mutationFn: async ({
      text,
      roomId,
      username,
    }: {
      text: string;
      roomId: string;
      username: string;
    }) => {
      await client.messages.post(
        { sender: username, text },
        { query: { roomId } },
      );
    },
  });

  return { sendMessage, isPending };
};
