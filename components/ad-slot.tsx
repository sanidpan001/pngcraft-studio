"use client";
import { useEffect, useRef, useId } from "react";

export function AdSlot({ width, height, className }: { width: number, height: number, className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const id = useId().replace(/:/g, "");

  useEffect(() => {
    if (!containerRef.current) return;
    const isMobile = window.innerWidth < 768;
    const adWidth = isMobile? 300 : width;
    const adHeight = isMobile? 250 : height;

    // Purana ad clear
    containerRef.current.innerHTML = "";

    // 1. atOptions wala banner
    const bannerDiv = document.createElement("div");
    bannerDiv.id = `ad-${id}`;

    const script1 = document.createElement("script");
    script1.type = "text/javascript";
    script1.innerHTML = `
      atOptions = {
        'key' : '101c6d1138f9b92802136fd3942bb33f',
        'format' : 'iframe',
        'height' : ${adHeight},
        'width' : ${adWidth},
        'params' : {}
      };
    `;

    const script2 = document.createElement("script");
    script2.type = "text/javascript";
    script2.src = `https://www.highperformanceformat.com/101c6d1138f9b92802136fd3942bb33f/invoke.js?cb=${Date.now()}-${id}`;

    bannerDiv.appendChild(script1);
    bannerDiv.appendChild(script2);
    containerRef.current.appendChild(bannerDiv);

  }, [width, height, id]);

  return (
    <div className={`flex justify-center my-4 w-full overflow-hidden ${className}`}>
      <div ref={containerRef} className="max-w-full flex justify-center" />
    </div>
  );
}

// Side wale box ke liye alag component - Native ke liye
export function NativeAdSlot() {
  return (
    <div className="w-full max-w-3xl mx-auto px-2 overflow-hidden">
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
        {/* Ad 1 */}
        <a href="#" className="block group">
          <img
            src="https://picsum.photos/seed/ad1/300/200"
            className="w-full h-[90px] sm:h-[110px] object-cover rounded-md"
            alt="ad"
          />
          <p className="mt-1 text-[10px] leading-tight sm:text-[11px] line-clamp-2 text-left">Lonely divorced moms are here 👀</p>
        </a>
        {/* Ad 2 */}
        <a href="#" className="block group">
          <img
            src="https://picsum.photos/seed/ad2/300/200"
            className="w-full h-[90px] sm:h-[110px] object-cover rounded-md"
            alt="ad"
          />
          <p className="mt-1 text-[10px] leading-tight sm:text-[11px] line-clamp-2 text-left">NHL Finals — Live in HD</p>
        </a>
        {/* Ad 3 */}
        <a href="#" className="block group">
          <img
            src="https://picsum.photos/seed/ad3/300/200"
            className="w-full h-[90px] sm:h-[110px] object-cover rounded-md"
            alt="ad"
          />
          <p className="mt-1 text-[10px] leading-tight sm:text-[11px] line-clamp-2 text-left">College girls need friends</p>
        </a>
        {/* Ad 4 */}
        <a href="#" className="block group">
          <img
            src="https://picsum.photos/seed/ad4/300/200"
            className="w-full h-[90px] sm:h-[110px] object-cover rounded-md"
            alt="ad"
          />
          <p className="mt-1 text-[10px] leading-tight sm:text-[11px] line-clamp-2 text-left">Backrooms: Watch now horror you can't escape</p>
        </a>
      </div>
    </div>
  );
}
