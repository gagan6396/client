import React from "react";

const InfiniteMarquee = () => {
  const items = [
    { 
      text: "ALL NATURAL", 
      icon: "1.png",
      color: "text-emerald-300"
    },
    { 
      text: "SUSTAINABLY SOURCED", 
      icon: "2.png",
      color: "text-emerald-300"
    },
    { 
      text: "TRUE HEIRLOOM", 
      icon: "3.png",
      color: "text-amber-300"
    },
    { 
      text: "SINGLE ORIGIN", 
      icon: "4.png",
      color: "text-amber-300"
    },
    { 
      text: "PESTICIDE FREE", 
      icon: "5.png",
      color: "text-amber-300"
    },
    { 
      text: "NUTRIENT RICH", 
      icon: "6.png",
      color: "text-rose-300"
    },
    { 
      text: "WHOLESOME", 
      icon: "7.png",
      color: "text-emerald-300"
    },

    {
      text: "UPLIFTING WOMEN",
      icon:
        "8.png"
    },
  ];

  return (
    <div className="relative w-full overflow-hidden bg-gradient-to-r from-[#2d5437] via-[#3a6b47] to-[#2d5437] py-10">
      {/* Gradient edges */}
      <div className="absolute left-0 top-0 h-full w-24 bg-gradient-to-r from-[#2d5437] to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 h-full w-24 bg-gradient-to-l from-[#2d5437] to-transparent z-10 pointer-events-none" />

      {/* Marquee Container */}
      <div className="flex">
        {/* First set */}
        <div className="flex whitespace-nowrap animate-marquee">
          {items.map((item, index) => (
            <div
              key={`first-${index}`}
              className="mx-6 inline-flex items-center gap-3 group transition-all duration-300 hover:scale-105"
            >
              <div className={`${item.color} group-hover:scale-110 transition-transform duration-300`}>
                <img 
                  src={item.icon} 
                  alt={item.text}
                  className="w-10 h-10 object-contain"
                  style={{ minWidth: '40px', minHeight: '40px' }}
                />
              </div>
              <span className="text-white text-xl tracking-wider group-hover:text-emerald-100 transition-colors duration-300">
                {item.text}
              </span>
              <div className="w-1 h-6 bg-gradient-to-b from-emerald-300/50 to-transparent rounded-full" />
            </div>
          ))}
        </div>

        {/* Second set */}
        <div className="flex whitespace-nowrap animate-marquee">
          {items.map((item, index) => (
            <div
              key={`second-${index}`}
              className="mx-6 inline-flex items-center gap-3 group transition-all duration-300 hover:scale-105"
            >
              <div className={`${item.color} group-hover:scale-110 transition-transform duration-300`}>
                <img 
                  src={item.icon} 
                  alt={item.text}
                  className="w-10 h-10 object-contain"
                  style={{ minWidth: '40px', minHeight: '40px' }}
                />
              </div>
              <span className="text-white text-xl tracking-wider group-hover:text-emerald-100 transition-colors duration-300">
                {item.text}
              </span>
              <div className="w-1 h-6 bg-gradient-to-b from-emerald-300/50 to-transparent rounded-full" />
            </div>
          ))}
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-100%);
          }
        }

        .animate-marquee {
          animation: marquee 30s linear infinite;
        }

        @media (prefers-reduced-motion: reduce) {
          .animate-marquee {
            animation-play-state: paused;
          }
        }

        .hover\\:pause-animation:hover {
          animation-play-state: paused;
        }
      ` }} />
    </div>
  );
};

export default InfiniteMarquee;
