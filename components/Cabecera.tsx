'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { NAV } from '@/lib/site';

export default function Cabecera() {
  const [solida, setSolida] = useState(false);

  useEffect(() => {
    const al = () => setSolida(window.scrollY > 90);
    window.addEventListener('scroll', al, { passive: true });
    al();
    return () => window.removeEventListener('scroll', al);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 flex items-center justify-between border-b px-[clamp(20px,5vw,64px)] py-[22px] transition-colors duration-500 ${
        solida ? 'border-senal/15 bg-abismo/75 backdrop-blur-md' : 'border-transparent'
      }`}
    >
      <Link href="/" className="font-serif text-[20px] tracking-[0.02em] no-underline text-luz">
        Perla <span className="text-senal">Torres</span>
      </Link>

      <nav aria-label="Principal" className="hidden gap-7 md:flex">
        {NAV.map((e) => (
          <Link
            key={e.href}
            href={e.href}
            className="font-mono text-[12px] uppercase tracking-[0.14em] text-tenue no-underline transition-colors hover:text-claro"
          >
            {e.texto}
          </Link>
        ))}
      </nav>
    </header>
  );
}
