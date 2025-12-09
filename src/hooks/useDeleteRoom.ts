import { client } from "@/lib/client";
import { useMutation } from "@tanstack/react-query";

export const useDeleteRoom = () => {
  const { mutate: destroyRoom } = useMutation({
    mutationFn: async (roomId: string) => {
      await client.room.delete(null, { query: { roomId } });
    },
  });
  return { destroyRoom };
};
