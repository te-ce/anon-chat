import { CreateRoom } from "@/components/createRoom";

export default function Home() {
  return (
    <main className="flex h-screen w-screen flex-col items-center justify-center gap-8 p-4">
      <header>
        <h1 className="text-2xl font-bold tracking-tight text-green-500">
          {">"}private_chat
        </h1>
        <p className="text-sm text-zinc-500">
          A private, self-destructing chat room.
        </p>
      </header>
      <CreateRoom />
    </main>
  );
}
