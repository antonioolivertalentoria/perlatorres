'use client';

import Link from 'next/link';
import { useCallback, useEffect, useRef, useState } from 'react';

export type Nodo = {
  numero: number;
  titulo: string;
  slug: string;
  resumen?: string;
};

/** Posiciones en porcentaje. Compuestas a mano para que respire. */
const COORDS = [
  { x: 12, y: 22 },
  { x: 34, y: 9 },
  { x: 60, y: 16 },
  { x: 84, y: 30 },
  { x: 73, y: 53 },
  { x: 47, y: 44 },
  { x: 22, y: 52 },
  { x: 14, y: 80 },
  { x: 44, y: 86 },
  { x: 76, y: 78 },
];

const ARISTAS: [number, number][] = [
  [0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [6, 0],
  [6, 7], [7, 8], [8, 9], [9, 4], [5, 1], [5, 8], [0, 7],
];

/**
 * La constelación es DECORACIÓN sobre enlaces reales.
 *
 * En pantallas anchas se dibuja el grafo; por debajo de 900px se muestra la
 * lista. En ambos casos el HTML que recibe el buscador son diez <a href>
 * limpios con su texto: el canvas nunca es la única forma de llegar al enlace.
 */
export default function Constelacion({ nodos }: { nodos: Nodo[] }) {
  const caja = useRef<HTMLDivElement>(null);
  const refs = useRef<(HTMLAnchorElement | null)[]>([]);
  const [lineas, setLineas] = useState<{ x1: number; y1: number; x2: number; y2: number }[]>([]);
  const [caras, setCaras] = useState({ w: 0, h: 0 });
  const [activo, setActivo] = useState<number | null>(null);

  const dibujar = useCallback(() => {
    const c = caja.current;
    if (!c) return;
    const b = c.getBoundingClientRect();
    setCaras({ w: b.width, h: b.height });

    setLineas(
      ARISTAS.flatMap(([a, z]) => {
        const p1 = refs.current[a]?.getBoundingClientRect();
        const p2 = refs.current[z]?.getBoundingClientRect();
        if (!p1 || !p2) return [];
        return [{
          x1: p1.left + p1.width / 2 - b.left,
          y1: p1.top + 9 - b.top,
          x2: p2.left + p2.width / 2 - b.left,
          y2: p2.top + 9 - b.top,
        }];
      }),
    );
  }, []);

  useEffect(() => {
    dibujar();
    const ro = new ResizeObserver(dibujar);
    if (caja.current) ro.observe(caja.current);
    // Los nodos flotan: refrescamos las líneas a ritmo bajo.
    const id = window.setInterval(dibujar, 900);
    return () => {
      ro.disconnect();
      window.clearInterval(id);
    };
  }, [dibujar]);

  return (
    <>
      {/* --- Grafo (solo en pantallas anchas) --- */}
      <div
        ref={caja}
        className="relative mt-14 hidden min-h-[460px] lg:block lg:aspect-[16/9]"
      >
        <svg
          className="pointer-events-none absolute inset-0 h-full w-full overflow-visible"
          viewBox={`0 0 ${caras.w || 1} ${caras.h || 1}`}
          aria-hidden="true"
        >
          {lineas.map((l, i) => {
            const tocada =
              activo !== null && (ARISTAS[i][0] === activo || ARISTAS[i][1] === activo);
            return (
              <line
                key={i}
                {...l}
                stroke={tocada ? 'rgba(143,184,238,.65)' : 'rgba(62,123,209,.22)'}
                strokeWidth={tocada ? 1.4 : 1}
                style={{ transition: 'stroke .35s, stroke-width .35s' }}
              />
            );
          })}
        </svg>

        {nodos.slice(0, 10).map((n, i) => (
          <Link
            key={n.slug}
            href={`/principios/${n.slug}`}
            ref={(el) => {
              refs.current[i] = el;
            }}
            onMouseEnter={() => setActivo(i)}
            onMouseLeave={() => setActivo(null)}
            onFocus={() => setActivo(i)}
            onBlur={() => setActivo(null)}
            className="group absolute block -translate-x-1/2 -translate-y-1/2 no-underline"
            style={{
              left: `${COORDS[i].x}%`,
              top: `${COORDS[i].y}%`,
              animation: `flotar ${9 + (i % 3) * 2}s ease-in-out ${-i * 1.3}s infinite`,
            }}
          >
            <span className="relative mx-auto mb-3 block h-[9px] w-[9px] rounded-full bg-senal transition-all duration-300 group-hover:scale-[1.35] group-hover:bg-claro group-hover:shadow-[0_0_24px_3px_rgba(143,184,238,.55)] group-focus-visible:scale-[1.35]">
              <span className="absolute -inset-3.5 scale-50 rounded-full border border-senal/25 opacity-0 transition-all duration-300 group-hover:scale-100 group-hover:opacity-100" />
            </span>
            <span className="block whitespace-nowrap text-center text-[12.5px] text-tenue transition-colors duration-300 group-hover:text-luz">
              <span className="mb-0.5 block font-mono text-[9.5px] tracking-[0.16em] text-senal/60">
                {String(n.numero).padStart(2, '0')}
              </span>
              {n.titulo}
            </span>
          </Link>
        ))}
      </div>

      {/* --- Lista (pantallas estrechas, y respaldo siempre presente) --- */}
      <nav className="mt-10 lg:hidden" aria-label="Los diez principios">
        <ul className="border-t border-luz/10">
          {nodos.map((n) => (
            <li key={n.slug} className="border-b border-luz/10">
              <Link
                href={`/principios/${n.slug}`}
                className="group block py-5 no-underline transition-colors"
              >
                <span className="mb-1 block font-mono text-[10px] tracking-[0.16em] text-senal">
                  {String(n.numero).padStart(2, '0')}
                </span>
                <span className="block text-[17px] text-luz transition-colors group-hover:text-claro">
                  {n.titulo}
                </span>
                {n.resumen && (
                  <span className="mt-1.5 block max-w-[52ch] text-[14px] leading-relaxed text-tenue">
                    {n.resumen}
                  </span>
                )}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <style jsx global>{`
        @keyframes flotar {
          0%,
          100% {
            translate: 0 0;
          }
          50% {
            translate: 0 -9px;
          }
        }
        @media (prefers-reduced-motion: reduce) {
          @keyframes flotar {
            0%,
            100% {
              translate: 0 0;
            }
          }
        }
      `}</style>
    </>
  );
}
