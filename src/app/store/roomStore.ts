import { create } from "zustand";
import { persist } from "zustand/middleware";

interface RoomStore {
  roomId: string;
  setRoomId: (roomId: string) => void;
  showQrCode: boolean;
  setShowQrCode: (showQrCode: boolean) => void;
}

export const useRoomStore = create<RoomStore>()(
  persist(
    (set) => ({
      roomId: "",
      setRoomId: (roomId: string) => set({ roomId }),
      showQrCode: false,
      setShowQrCode: (showQrCode: boolean) => set({ showQrCode }),
    }),
    { name: "room-store" },
  ),
);
