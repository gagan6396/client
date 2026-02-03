"use client";

import { Card, CardContent } from "@/components/ui/card";
import { useEffect, useState } from "react";

// Interface for Instagram Reels data
interface ReelVideo {
  id: string;
  url: string;
  videoSrc: string; // Local video file path
}

// Sample Instagram Reels data (replace with your provided array)
const sampleReels: ReelVideo[] = [
  {
    id: "1",
    url: "https://www.instagram.com/p/DTIOG_5EjU0/",
    videoSrc: "/Video-375.mp4",
  },
  {
    id: "2",
    url: "https://www.instagram.com/p/DSue5aeEiIt/",
    videoSrc: "/Video-866.mp4",
  },
  {
    id: "3",
    url: "https://www.instagram.com/p/DS1qS5fEj2r/",
    videoSrc: "/Video-76.mp4",
  },
  {
    id: "4",
    url: "https://www.instagram.com/p/DSZyy0ukmKN/",
    videoSrc: "/Video-974.mp4",
  },
];

// Skeleton Card Component for Reels
const SkeletonReelsCard = () => (
  <Card className="bg-white rounded-xl shadow-sm overflow-hidden animate-pulse border border-gray-100">
    <CardContent className="p-0">
      <div className="w-full aspect-[9/16] bg-gray-200 rounded-t-xl" />
    </CardContent>
  </Card>
);

// Reels Card Component
const ReelsCard = ({ video }: { video: ReelVideo }) => {
  return (
    <a
      href={video.url}
      target="_blank"
      rel="noopener noreferrer"
      className="block"
    >
      <Card className="group bg-white rounded-xl shadow-sm overflow-hidden transition-all hover:shadow-md hover:-translate-y-0.5 duration-300 border border-gray-100 cursor-pointer">
        <CardContent className="p-0">
          <div className="relative overflow-hidden">
            <div className="w-full aspect-[9/16] relative bg-black">
              <video
                src={video.videoSrc}
                className="w-full h-full object-cover rounded-xl"
                autoPlay
                muted
                loop
                playsInline
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </a>
  );
};

export function InstagramReelsCarousel() {
  const [reels, setReels] = useState<ReelVideo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching or setting the provided reels data
    const fetchReels = async () => {
      try {
        setLoading(true);
        // Replace with your actual array of reels
        setReels(sampleReels);
      } catch (error) {
        console.error("Error loading reels:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchReels();
  }, []);

  return (
    <section className="py-8 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <h2 className="text-2xl md:text-3xl font-bold text-[#2d5437] text-center mb-6">
        Instagram Reels Spotlight
      </h2>
      <main className="container mx-auto">
        {loading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-4">
            {[...Array(6)].map((_, index) => (
              <SkeletonReelsCard key={index} />
            ))}
          </div>
        ) : reels.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-sm text-gray-500">
              No Instagram Reels available yet. Stay tuned!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-4">
            {reels.slice(0, 6).map((video) => (
              <ReelsCard key={video.id} video={video} />
            ))}
          </div>
        )}
      </main>
    </section>
  );
}

export default InstagramReelsCarousel;