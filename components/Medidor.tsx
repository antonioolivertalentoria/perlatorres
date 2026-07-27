'use client';

import { useEffect, useRef, useState } from 'react';

const R = 86;
const CIRC = 2 * Math.PI * R;

/** Arco que se llena al entrar en pantalla. Decorativo, con aria-hidden. */
export default function Medidor() {
  const ref = useRef<HTMLDivElement>(null);
  const [dentro, setDentro] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setDentro(true);
          io.disconnect();
        }
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className="relative mx-auto aspect-square w-full max-w-[400px]">
      <svg viewBox="0 0 200 200" className="h-full w-full -rotate-90" aria-hidden="true">
        <defs>
          <linearGradient id="arco" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#8FB8EE" />
            <stop offset="48%" stopColor="#3E7BD1" />
            <stop offset="100%" stopColor="#FFFFFF" />
          </linearGradient>
        </defs>
        <circle cx="100" cy="100" r={R} fill="none" stroke="rgba(255,255,255,.07)" strokeWidth="2" />
        <circle
          cx="100" cy="100" r="70" fill="none"
          stroke="rgba(255,255,255,.07)" strokeWidth="2" strokeDasharray="1 7"
        />
        <circle
          cx="100" cy="100" r={R} fill="none" stroke="url(#arco)"
          strokeWidth="3" strokeLinecap="round"
          strokeDasharray={CIRC}
          strokeDashoffset={dentro ? CIRC * 0.16 : CIRC}
          style={{ transition: 'stroke-dashoffset 2.6s cubic-bezier(.16,.9,.24,1)' }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
        <span
          className="font-serif text-[clamp(48px,7vw,86px)] leading-none text-transparent"
          style={{
            backgroundImage: 'linear-gradient(140deg,#8FB8EE,#3E7BD1 50%,#FFFFFF)',
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
          }}
          aria-hidden="true"
        >
          ∞
        </span>
        <span className="mt-3 max-w-[20ch] font-mono text-[10px] uppercase leading-[1.8] tracking-[0.22em] text-tenue">
          Retorno sobre la conciencia
        </span>
      </div>
    </div>
  );
}
