"use client";
import { useEffect, useRef } from "react";

export function AdSlot({ width, height, className }: any) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    ref.current.innerHTML = ""; // clear

    const script1 = document.createElement("script");
    script1.innerHTML = `
      atOptions = {
        'key' : '101c6d1138f9b92802136fd3942bb33f',
        'format' : 'iframe',
        'height' : ${height},
        'width' : ${width},
        'params' : {}
      };
    `;
    const script2 = document.createElement("script");
    script2.src = "https://www.highrevenueformat.com/101c6d1138f9b92802136fd3942bb33f/invoke.js";
    script2.async = true;

    ref.current.appendChild(script1);
    ref.current.appendChild(script2);
  }, [width, height]);

  return (
    <div className={`flex justify-center my-4 ${className}`}>
      <div ref={ref} style={{ width: `${width}px`, height: `${height}px` }} />
    </div>
  );
}
