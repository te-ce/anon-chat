"use client";

import { useCreateRoom } from "@/hooks/useCreateRoom";
import { useUsername } from "@/hooks/useGetUsername";

export default function Home() {
  const { username } = useUsername();
  const createRoom = useCreateRoom();
  return (
    <main className="flex h-screen w-screen items-center justify-center p-4">
      <div className="border border-zinc-800 bg-zinc-900/50 p-6 backdrop-blur-md">
        <div className="space-y-5">
          <div className="space-y-2">
            <label className="flex items-center text-zinc-500">
              Your Identity
            </label>

            <div className="flex items-center gap-3">
              <div className="flex-1 bg-zinc-950 border border-zinc-800 p-3 text-sm text-zinc-400 font-mono">
                {username}
              </div>
            </div>
          </div>

          <button
            onClick={() => createRoom()}
            className="w-full bg-zinc-100 text-black p-3 text-sm font-bold hover:bg-zinc-50 hover:text-black transition-colors mt-2 cursor-pointer disabled:opacity-50"
          >
            CREATE SECURE ROOM
          </button>
        </div>
      </div>
    </main>
  );
}
