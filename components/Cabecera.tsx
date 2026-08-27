'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { NAV, NAV_CONTACTO } from '@/lib/site';

/**
 * Cabecera fija. Se queda arriba durante todo el scroll a propósito: las
 * páginas son largas y quien se convence a la mitad de la lectura tiene que
 * poder ir a Contacto sin volver a subir.
 */
export default function Cabecera() {
  const [solida, setSolida] = useState(false);
  const [abierto, setAbierto] = useState(false);
  const ruta = usePathname();

  useEffect(() => {
    const al = () => setSolida(window.scrollY > 90);
    window.addEventListener('scroll', al, { passive: true });
    al();
    return () => window.removeEventListener('scroll', al);
  }, []);

  // Al cambiar de página el menú móvil se cierra solo.
  useEffect(() => setAbierto(false), [ruta]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b transition-colors duration-500 ${
        solida || abierto
          ? 'border-senal/15 bg-abismo/90 backdrop-blur-md'
          : 'border-transparent'
      }`}
    >
      <div className="flex items-center justify-between px-[clamp(20px,5vw,64px)] py-[22px]">
        <Link
          href="/"
          className="font-serif text-[20px] tracking-[0.02em] no-underline text-luz"
          aria-label="Perla Torres — inicio"
        >
          Perla <span className="text-senal">Torres</span>
        </Link>

        <nav aria-label="Principal" className="hidden items-center gap-7 md:flex">
          {NAV.map((e) => (
            <Link
              key={e.href}
              href={e.href}
              aria-current={ruta === e.href ? 'page' : undefined}
              className={`font-mono text-[12px] uppercase tracking-[0.14em] no-underline transition-colors hover:text-claro ${
                ruta === e.href ? 'text-luz' : 'text-tenue'
              }`}
            >
              {e.texto}
            </Link>
          ))}
          <Link
            href={NAV_CONTACTO.href}
            className="rounded-sm border border-senal/60 bg-senal/10 px-4 py-2 font-mono text-[12px] uppercase tracking-[0.14em] text-luz no-underline transition-colors hover:bg-senal/25 hover:border-senal"
          >
            {NAV_CONTACTO.texto}
          </Link>
        </nav>

        {/* Móvil: hasta ahora no había ninguna forma de navegar. */}
        <button
          type="button"
          onClick={() => setAbierto((v) => !v)}
          aria-expanded={abierto}
          aria-controls="menu-movil"
          className="flex flex-col gap-[5px] p-2 md:hidden"
        >
          <span className="sr-only">{abierto ? 'Cerrar menú' : 'Abrir menú'}</span>
          <span
            className={`block h-px w-6 bg-luz transition-transform ${abierto ? 'translate-y-[6px] rotate-45' : ''}`}
          />
          <span className={`block h-px w-6 bg-luz transition-opacity ${abierto ? 'opacity-0' : ''}`} />
          <span
            className={`block h-px w-6 bg-luz transition-transform ${abierto ? '-translate-y-[6px] -rotate-45' : ''}`}
          />
        </button>
      </div>

      {abierto && (
        <nav
          id="menu-movil"
          aria-label="Principal móvil"
          className="flex flex-col gap-1 border-t border-luz/10 px-[clamp(20px,5vw,64px)] pb-7 pt-4 md:hidden"
        >
          {NAV.map((e) => (
            <Link
              key={e.href}
              href={e.href}
              className="border-b border-luz/[0.07] py-3.5 font-mono text-[13px] uppercase tracking-[0.14em] text-tenue no-underline"
            >
              {e.texto}
            </Link>
          ))}
          <Link
            href={NAV_CONTACTO.href}
            className="mt-4 rounded-sm border border-senal/60 bg-senal/10 px-4 py-3 text-center font-mono text-[13px] uppercase tracking-[0.14em] text-luz no-underline"
          >
            {NAV_CONTACTO.texto}
          </Link>
        </nav>
      )}
    </header>
  );
}
