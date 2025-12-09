"use client";

import { useCreateRoom } from "@/hooks/useCreateRoom";
import { useGetUsername } from "@/hooks/useGetUsername";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

export const CreateRoom = ({ router }: { router: AppRouterInstance }) => {
  const { username } = useGetUsername();
  const { createRoom } = useCreateRoom(router);

  return (
    <div className="w-full max-w-md border border-zinc-800 bg-zinc-900/50 p-6 backdrop-blur-md">
      <div className="space-y-5">
        <div className="space-y-2">
          <label className="flex items-center text-zinc-500">
            Your Identity
          </label>

          <div className="flex items-center gap-3">
            <div className="flex-1 border border-zinc-800 bg-zinc-950 p-3 font-mono text-sm text-zinc-400">
              {username}
            </div>
          </div>
        </div>

        <button
          onClick={() => createRoom()}
          className="mt-2 w-full cursor-pointer bg-zinc-100 p-3 text-sm font-bold text-black transition-colors hover:bg-zinc-50 hover:text-black disabled:opacity-50"
        >
          CREATE SECURE ROOM
        </button>
      </div>
    </div>
  );
};
