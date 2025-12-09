import { useSearchParams } from "next/navigation";

export const ErrorBanner = () => {
  const searchParams = useSearchParams();
  const wasDestroyed = searchParams.get("destroyed") === "true";
  const error = searchParams.get("error");
  const roomNotFound = error === "room-not-found";
  const roomFull = error === "room-full";

  return (
    <>
      {wasDestroyed && (
        <div className="border border-red-900 bg-red-950/50 p-4 text-center">
          <p className="text-sm font-bold text-red-500">ROOM DESTROYED</p>
          <p className="mt-1 text-xs text-zinc-500">
            All messages were permanently deleted.
          </p>
        </div>
      )}
      {roomNotFound && (
        <div className="border border-red-900 bg-red-950/50 p-4 text-center">
          <p className="text-sm font-bold text-red-500">ROOM NOT FOUND</p>
          <p className="mt-1 text-xs text-zinc-500">
            This room may have expired or never existed.
          </p>
        </div>
      )}
      {roomFull && (
        <div className="border border-red-900 bg-red-950/50 p-4 text-center">
          <p className="text-sm font-bold text-red-500">ROOM FULL</p>
          <p className="mt-1 text-xs text-zinc-500">
            This room is at maximum capacity.
          </p>
        </div>
      )}
    </>
  );
};
