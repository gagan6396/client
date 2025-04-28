"use client";

import { Card, CardContent } from "@/components/ui/card";
import { useEffect, useState } from "react";

// Interface for YouTube Shorts data
interface ShortVideo {
  id: string;
  url: string;
  title?: string;
}

// Sample YouTube Shorts data (replace with your provided array)
const sampleShorts: ShortVideo[] = [
  {
    id: "1",
    url: "https://www.youtube.com/shorts/yf4K1hPcINQ",
    title: "Amazing Trick Shot",
  },
  {
    id: "2",
    url: "https://www.youtube.com/shorts/K5xdztR0DUE",
    title: "Quick Recipe Tutorial",
  },
  {
    id: "3",
    url: "https://www.youtube.com/shorts/VF_5Jax7OT4",
    title: "Funny Pet Moment",
  },
  {
    id: "4",
    url: "https://www.youtube.com/shorts/ONg9cmMpk5w",
    title: "Dance Challenge",
  },
  {
    id: "5",
    url: "https://www.youtube.com/shorts/fxg6ozs-nQo",
    title: "DIY Craft Idea",
  },
  {
    id: "6",
    url: "https://www.youtube.com/shorts/bgs7x1utTf8",
    title: "Fitness Tip",
  },
];

// Skeleton Card Component for Shorts
const SkeletonShortsCard = () => (
  <Card className="bg-white rounded-xl shadow-sm overflow-hidden animate-pulse border border-gray-100">
    <CardContent className="p-0">
      <div className="w-full aspect-[9/16] bg-gray-200 rounded-t-xl" />
      <div className="p-3 space-y-2">
        <div className="h-3 bg-gray-200 rounded w-3/4" />
      </div>
    </CardContent>
  </Card>
);

// Shorts Card Component
const ShortsCard = ({ video }: { video: ShortVideo }) => {
  const [hovered, setHovered] = useState(false);

  // Extract YouTube video ID from URL (handles various URL formats)
  const getYouTubeId = (url: string) => {
    const regex = /(?:youtube\.com\/shorts\/|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const match = url.match(regex);
    return match ? match[1] : null;
  };

  const videoId = getYouTubeId(video.url);
  const embedUrl = videoId ? `https://www.youtube.com/embed/${videoId}` : null;

  return (
    <Card
      className="group bg-white rounded-xl shadow-sm overflow-hidden transition-all hover:shadow-md hover:-translate-y-0.5 duration-300 border border-gray-100"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <CardContent className="p-0">
        <div className="relative overflow-hidden">
          {embedUrl ? (
            <iframe
              src={`${embedUrl}?autoplay=${
                hovered ? 1 : 0
              }&mute=1&loop=1&playlist=${videoId}`}
              className="w-full aspect-[9/16] rounded-t-xl"
              title={video.title || "YouTube Short"}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <div className="w-full aspect-[9/16] bg-gray-200 flex items-center justify-center rounded-t-xl">
              <span className="text-gray-500 text-sm">Invalid Video URL</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export function YouTubeShortsCarousel() {
  const [shorts, setShorts] = useState<ShortVideo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching or setting the provided shorts data
    const fetchShorts = async () => {
      try {
        setLoading(true);
        // Replace with your actual array of shorts
        setShorts(sampleShorts);
      } catch (error) {
        console.error("Error loading shorts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchShorts();
  }, []);

  return (
    <section className="py-8 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <h2 className="text-2xl md:text-3xl font-bold text-gray-900 text-center mb-6">
        YouTube Shorts Spotlight
      </h2>
      <main className="container mx-auto">
        {loading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {[...Array(6)].map((_, index) => (
              <SkeletonShortsCard key={index} />
            ))}
          </div>
        ) : shorts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-sm text-gray-500">
              No YouTube Shorts available yet. Stay tuned!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {shorts.slice(0, 6).map((video) => (
              <ShortsCard key={video.id} video={video} />
            ))}
          </div>
        )}
      </main>
    </section>
  );
}

export default YouTubeShortsCarousel;
