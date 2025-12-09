import { client } from "@/lib/client";
import { useMutation } from "@tanstack/react-query";

export const useCreateRoom = () => {
  const { mutate: createRoom } = useMutation({
    mutationFn: async () => {
      const res = await client.room.create.post();
    },
  });

  return { createRoom };
};
