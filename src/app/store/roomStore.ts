import { create } from "zustand";

interface RoomStore {
  roomId: string;
  setRoomId: (roomId: string) => void;
  showQrCode: boolean;
  setShowQrCode: (showQrCode: boolean) => void;
}

export const useRoomStore = create<RoomStore>((set) => ({
  roomId: "",
  setRoomId: (roomId: string) => set({ roomId }),
  showQrCode: false,
  setShowQrCode: (showQrCode: boolean) => set({ showQrCode }),
}));
