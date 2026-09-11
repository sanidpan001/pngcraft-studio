import { cn } from "@/lib/utils";
import Script from "next/script";

interface AdSlotProps {
  width: number;
  height: number;
  label?: string;
  className?: string;
}

export function AdSlot({ width, height, label = 'Advertisement', className }: AdSlotProps) {
  return (
    <div className={cn("flex flex-col items-center gap-1", className)}>
      <span className="ad-label">{label}</span>
      <div
        className="ad-slot flex justify-center items-center"
        style={{
          width: '100%',
          maxWidth: `${width}px`,
          minHeight: `${height}px`,
        }}
      >
        {/* Adsterra 728x90 Banner */}
        <Script id={`atOptions-${width}-${height}`} strategy="afterInteractive">
          {`
            atOptions = {
              'key' : '101c6d1138f9b92802136fd3942bb33f',
              'format' : 'iframe',
              'height' : ${height},
              'width' : ${width},
              'params' : {}
            };
          `}
        </Script>
        <Script
          src="https://www.highrevenueformat.com/101c6d1138f9b92802136fd3942bb33f/invoke.js"
          strategy="afterInteractive"
        />
      </div>
    </div>
  );
}
