'use client';

import { useEffect, useRef } from 'react';

// Top Banner - 728x90
export function AdSlot({ width, height }: { width: number; height: number }) {
  const bannerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!bannerRef.current) return;
    bannerRef.current.innerHTML = '';

    const optionsScript = document.createElement('script');
    optionsScript.innerHTML = `
      atOptions = {
        'key' : '101c6d1138f9b92802136fd3942bb33f',
        'format' : 'iframe',
        'height' : ${height},
        'width' : ${width},
        'params' : {}
      };
    `;

    const invokeScript = document.createElement('script');
    invokeScript.src = 'https://www.highrevenueformat.com/101c6d1138f9b92802136fd3942bb33f/invoke.js';

    bannerRef.current.appendChild(optionsScript);
    bannerRef.current.appendChild(invokeScript);
  }, [width, height]);

  return (
    <div className="w-full flex justify-center overflow-hidden">
      <div
        ref={bannerRef}
        className="max-w-full"
        style={{ width: `${width}px`, height: `${height}px`, maxWidth: '100%' }}
      />
    </div>
  );
}

// Side Native Bar - Mobile responsive
export function NativeAdSlot() {
  const nativeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!nativeRef.current) return;

    // Purana ad clear karo taaki 2 baar na load ho
    const containerId = 'container-33a44e0346854dbc8c664a7c76a4f13f';
    let container = document.getElementById(containerId);
    if (!container) {
      container = document.createElement('div');
      container.id = containerId;
      nativeRef.current.appendChild(container);
    }

    const script = document.createElement('script');
    script.async = true;
    script.setAttribute('data-cfasync', 'false');
    script.src = 'https://pl31287192.profitableratecpmnetwork.com/33a44e0346854dbc8c664a7c76a4f13f/invoke.js';

    if (!document.querySelector(`script[src="${script.src}"]`)) {
      document.body.appendChild(script);
    }
  }, []);

  return (
    <div ref={nativeRef} className="w-full max-w-[300px] sm:max-w-[320px] mx-auto overflow-hidden flex justify-center min-h-[250px] bg-muted/10 rounded">
      <div id="container-33a44e0346854dbc8c664a7c76a4f13f"></div>
    </div>
  );
}
