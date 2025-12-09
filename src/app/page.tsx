import { CreateRoom } from "@/components/createRoom";

export default function Home() {
  return (
    <main className="flex h-screen w-screen flex-col gap-8 items-center justify-center p-4">
      <header>
        <h1 className="text-2xl font-bold tracking-tight text-green-500">
          {">"}private_chat
        </h1>
        <p className="text-zinc-500 text-sm">
          A private, self-destructing chat room.
        </p>
      </header>
      <CreateRoom />
    </main>
  );
}
