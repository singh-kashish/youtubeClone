import React from "react";
import useSubscribedToHook from "../src/hooks/useSubscribedToHook";
import { useUser } from "@supabase/auth-helpers-react";

export default function Subscriptions() {
  const user = useUser();
  console.log(user?.id); 
  const { videos, error, loading } = useSubscribedToHook(user?.id);

  // ✅ Clean structured logging
  console.log("[Subscriptions] videos:", videos);
  console.log("[Subscriptions] error:", error);
  console.log("[Subscriptions] loading:", loading);

  if (loading) return <div className="text-white">Loading...</div>;
  if (error) return <div className="text-red-500">Error: {error.message}</div>;

  return (<>
    <h1>You've {`${videos?.length}`} Videos from your subscriptions</h1>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      {videos?.map((video) => (
        <div
          key={video.id}
          className="bg-zinc-800 rounded-lg overflow-hidden shadow-md"
        >
          <img
            src={video.thumbnailUrl || "/placeholder.png"}
            alt={video.title}
            className="w-full h-48 object-cover"
          />
          <div className="p-3">
            <h3 className="text-white font-semibold truncate">
              {video.title}
            </h3>
            <p className="text-gray-400 text-sm line-clamp-2">
              {video.description}
            </p>
            <div className="flex items-center justify-between mt-2 text-gray-400 text-xs">
              <span>{video.profiles?.username}</span>
              <span>{video.viewCount} views</span>
            </div>
          </div>
        </div>
      ))}
    </div>
    </>
  );
}
