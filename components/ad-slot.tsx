'use client';
import { useEffect, useRef } from 'react';

export function AdSlot({ width, height }: { width: number; height: number }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!ref.current) return;
    ref.current.innerHTML = '';
    const s1 = document.createElement('script');
    s1.innerHTML = `atOptions={'key':'101c6d1138f9b92802136fd3942bb33f','format':'iframe','height':${height},'width':${width},'params':{}};`;
    const s2 = document.createElement('script');
    s2.src = 'https://www.highrevenueformat.com/101c6d1138f9b92802136fd3942bb33f/invoke.js';
    ref.current.append(s1, s2);
  }, [width, height]);
  return <div className="w-full flex justify-center overflow-hidden"><div ref={ref} style={{ width: `${width}px`, maxWidth: '100%', height: `${height}px` }} /></div>;
}

export function NativeAdSlot() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const id = 'container-33a44e0346854dbc8c664a7c76a4f13f';
    if (!document.getElementById(id)) {
      const div = document.createElement('div');
      div.id = id;
      ref.current?.appendChild(div);
    }
    const s = document.createElement('script');
    s.src = 'https://pl31287192.profitableratecpmnetwork.com/33a44e0346854dbc8c664a7c76a4f13f/invoke.js';
    s.async = true;
    s.setAttribute('data-cfasync', 'false');
    if (!document.querySelector(`script[src="${s.src}"]`)) document.body.appendChild(s);
  }, []);
  return <div ref={ref} className="w-full max-w-[300px] mx-auto min-h-[250px]"><div id="container-33a44e0346854dbc8c664a7c76a4f13f"></div></div>;
}
