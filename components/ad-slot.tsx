'use client';
import { useEffect, useRef } from 'react';

export function AdSlot({ width, height, className }: { width?: number; height?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!ref.current) return;
    ref.current.innerHTML = '';
    const s1 = document.createElement('script');
    s1.innerHTML = `atOptions={'key':'101c6d1138f9b92802136fd3942bb33f','format':'iframe','height':90,'width':728,'params':{}};`;
    const s2 = document.createElement('script');
    s2.src = 'https://www.highrevenueformat.com/101c6d1138f9b92802136fd3942bb33f/invoke.js';
    ref.current.append(s1, s2);
  }, []);
  return (
    <div className={`w-full flex justify-center overflow-hidden ${className || ''}`}>
      <div ref={ref} className="scale-[0.45] sm:scale-100 origin-top" style={{ width: '728px', height: '90px' }} />
    </div>
  );
}

export function NativeAdSlot() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const id = 'container-33a44e0346854dbc8c664a7c76a4f13f';
    let container = document.getElementById(id);
    if(!container && ref.current){
      container = document.createElement('div');
      container.id = id;
      ref.current.appendChild(container);
    }
    const src = 'https://pl31287192.profitableratecpmnetwork.com/33a44e0346854dbc8c664a7c76a4f13f/invoke.js';
    if (!document.querySelector(`script[src="${src}"]`)) {
      const s = document.createElement('script');
      s.src = src;
      s.async = true;
      s.setAttribute('data-cfasync','false');
      document.body.appendChild(s);
    }
  }, []);
  return <div ref={ref} className="w-full flex justify-center"><div id="container-33a44e0346854dbc8c664a7c76a4f13f"></div></div>;
}
