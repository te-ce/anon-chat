import { client } from "@/lib/client";
import { useQuery } from "@tanstack/react-query";

export const useGetMessages = (roomId: string) => {
  const { data, refetch } = useQuery({
    queryKey: ["messages", roomId],
    queryFn: async () => {
      const res = await client.messages.get({ query: { roomId } });
      return res.data;
    },
  });

  return { data, refetch };
};
