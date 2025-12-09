import { create } from "zustand";
import { persist } from "zustand/middleware";

interface RoomStore {
  roomId: string;
  setRoomId: (roomId: string) => void;
}

export const useRoomStore = create<RoomStore>()(
  persist(
    (set) => ({
      roomId: "",
      setRoomId: (roomId: string) => set({ roomId }),
    }),
    { name: "room-store" },
  ),
);
