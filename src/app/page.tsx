"use client";

import { CreateRoom } from "@/components/createRoom";
import { ErrorBanner } from "@/components/ErrorBanner";
import { useRouter } from "next/navigation";
import { Suspense } from "react";

export default function Home() {
  const router = useRouter();
  return (
    <Suspense>
      <main className="flex h-screen w-screen flex-col items-center justify-center gap-8 p-4">
        <ErrorBanner />
        <header>
          <h1 className="text-2xl font-bold tracking-tight text-green-500">
            {">"}private_chat
          </h1>
          <p className="text-sm text-zinc-500">
            A private, self-destructing chat room.
          </p>
        </header>
        <CreateRoom router={router} />
      </main>
    </Suspense>
  );
}
