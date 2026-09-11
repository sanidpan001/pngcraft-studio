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
    bannerDiv.id = ad-${id};

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
    script2.src = https://www.highperformanceformat.com/101c6d1138f9b92802136fd3942bb33f/invoke.js?cb=${Date.now()}-${id};

    bannerDiv.appendChild(script1);
    bannerDiv.appendChild(script2);
    containerRef.current.appendChild(bannerDiv);

  }, [width, height, id]);

  return (
    <div className={flex justify-center my-4 w-full overflow-hidden ${className}}>
      <div ref={containerRef} className="max-w-full flex justify-center" />
    </div>
  );
}
