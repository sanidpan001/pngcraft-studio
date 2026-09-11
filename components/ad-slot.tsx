'use client';

import { useEffect, useRef } from 'react';

export function AdSlot({ width, height }: { width: number; height: number }) {
  const adRef = useRef<HTMLModElement>(null);

  useEffect(() => {
    try {
      // @ts-ignore
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {
      console.log("AdSense error:", e);
    }
  }, []);

  return (
    <div style={{ width, height }} className="flex justify-center items-center overflow-hidden bg-muted/30 rounded">
      <ins
        ref={adRef as any}
        className="adsbygoogle"
        style={{ display: 'block', width: `${width}px`, height: `${height}px` }}
        data-ad-client="ca-pub-YOUR_ID"
        data-ad-slot="YOUR_SLOT_ID"
        data-ad-format="auto"
      />
    </div>
  );
}

export function NativeAdSlot() {
  // ye random id banayega taaki 2 banner clash na kare
  const randomId = Math.random().toString(36).substring(7);

  return (
    <div className="w-full max-w-[340px] sm:max-w-3xl mx-auto px-1">
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
        <div className="overflow-hidden">
          <img src={`https://picsum.photos/seed/${randomId}1/200/120`} className="w-full h-[75px] sm:h-[90px] object-cover rounded" alt="" />
          <p className="text-[9px] sm:text-[10px] mt-1 line-clamp-2">Lonely divorced moms are here</p>
        </div>
        <div className="overflow-hidden">
          <img src={`https://picsum.photos/seed/${randomId}2/200/120`} className="w-full h-[75px] sm:h-[90px] object-cover rounded" alt="" />
          <p className="text-[9px] sm:text-[10px] mt-1 line-clamp-2">NHL Finals — Live in HD</p>
        </div>
        <div className="overflow-hidden">
          <img src={`https://picsum.photos/seed/${randomId}3/200/120`} className="w-full h-[75px] sm:h-[90px] object-cover rounded" alt="" />
          <p className="text-[9px] sm:text-[10px] mt-1 line-clamp-2">College girls need friends</p>
        </div>
        <div className="overflow-hidden">
          <img src={`https://picsum.photos/seed/${randomId}4/200/120`} className="w-full h-[75px] sm:h-[90px] object-cover rounded" alt="" />
          <p className="text-[9px] sm:text-[10px] mt-1 line-clamp-2">Backrooms: Watch now</p>
        </div>
      </div>
    </div>
  );
}
