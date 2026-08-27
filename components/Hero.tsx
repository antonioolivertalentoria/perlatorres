'use client';

import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

/**
 * El canvas se carga en diferido y solo cuando el hero está en pantalla.
 * El LCP es el <h1>, que es HTML puro renderizado en servidor: el 3D no
 * participa en la métrica que Google mide.
 */
const Campo = dynamic(() => import('./Campo'), { ssr: false });
const CampoLigero = dynamic(() => import('./CampoLigero'), { ssr: false });

/**
 * Hay equipos donde WebGL no arranca: aceleración por hardware apagada, GPU en
 * lista negra, navegadores embebidos en otras apps. Ahí no basta con no montar
 * el canvas — la portada se queda muerta y el sitio pierde su argumento. Se
 * comprueba antes de elegir motor, y el respaldo 2D hace la misma coreografía.
 */
function hayWebGL(): boolean {
  try {
    const c = document.createElement('canvas');
    return !!(c.getContext('webgl2') || c.getContext('webgl'));
  } catch {
    return false;
  }
}

export default function Hero() {
  const seccion = useRef<HTMLElement>(null);
  const avance = useRef(0);
  const [motor, setMotor] = useState<'ninguno' | 'webgl' | 'ligero'>('ninguno');
  const [etapa, setEtapa] = useState<'inicio' | 'mundos' | 'campo'>('inicio');
  const capa = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const menosMovimiento = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (menosMovimiento) return;

    // Solo montamos el campo si el hero llega a estar visible.
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setMotor(hayWebGL() ? 'webgl' : 'ligero');
          io.disconnect();
        }
      },
      { rootMargin: '200px' },
    );
    if (seccion.current) io.observe(seccion.current);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    let pendiente = false;

    const alScroll = () => {
      if (pendiente) return;
      pendiente = true;

      requestAnimationFrame(() => {
        pendiente = false;
        const el = seccion.current;
        if (!el) return;

        const recorrido = el.offsetHeight - window.innerHeight;
        const p = Math.min(Math.max(window.scrollY / recorrido, 0), 1);

        // Los dos mundos se sostienen hasta el 30%. Después se funden.
        avance.current = Math.min(Math.max((p - 0.3) / 0.55, 0), 1);

        if (p > 0.05 && p < 0.42) setEtapa('mundos');
        else if (avance.current > 0.82) setEtapa('campo');
        else setEtapa('inicio');

        // Al salir del hero el campo se atenúa hasta quedar de fondo:
        // deja de competir con el texto pero no desaparece del todo.
        if (capa.current) {
          const pasado = window.scrollY - recorrido;
          capa.current.style.opacity =
            pasado <= 0
              ? '1'
              : String(Math.max(0.08, 1 - pasado / (window.innerHeight * 0.7)));
        }
      });
    };

    window.addEventListener('scroll', alScroll, { passive: true });
    alScroll();
    return () => window.removeEventListener('scroll', alScroll);
  }, []);

  return (
    <section ref={seccion} className="relative h-[320vh]" aria-label="Portada">
      {/* Capa 3D: puramente decorativa. */}
      <div ref={capa} className="pointer-events-none fixed inset-0 z-0 transition-opacity duration-300" aria-hidden="true">
        {motor === 'webgl' && <Campo avance={avance} />}
        {motor === 'ligero' && <CampoLigero avance={avance} />}
      </div>

      <div className="sticky top-0 flex h-screen flex-col items-center justify-center px-5 text-center">
        {/* Viñeta que garantiza el contraste del texto sobre el anillo. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-1/2 h-[min(620px,72vh)] w-[min(1000px,92vw)] -translate-x-1/2 -translate-y-1/2"
          style={{
            background:
              'radial-gradient(ellipse at center, rgba(4,16,31,.86) 0%, rgba(4,16,31,.6) 45%, transparent 74%)',
          }}
        />

        {/* Etiquetas de los dos mundos. */}
        <div className="pointer-events-none absolute inset-0 hidden md:block" aria-hidden="true">
          <div
            className="absolute left-[clamp(20px,7vw,110px)] top-1/2 max-w-[170px] -translate-y-1/2 text-left font-mono text-[10.5px] uppercase leading-[1.9] tracking-[0.24em] text-claro transition-opacity duration-700"
            style={{ opacity: etapa === 'mundos' ? 1 : 0 }}
          >
            <b className="mb-1.5 block font-serif text-[22px] font-normal normal-case tracking-normal text-luz">
              Materia
            </b>
            Empresa · dinero · resultados · estructura
          </div>
          <div
            className="absolute right-[clamp(20px,7vw,110px)] top-1/2 max-w-[170px] -translate-y-1/2 text-right font-mono text-[10.5px] uppercase leading-[1.9] tracking-[0.24em] text-luz/70 transition-opacity duration-700"
            style={{ opacity: etapa === 'mundos' ? 1 : 0 }}
          >
            <b className="mb-1.5 block font-serif text-[22px] font-normal normal-case tracking-normal text-luz">
              Conciencia
            </b>
            Interior · propósito · intuición · sentido
          </div>
        </div>

        <p className="relative mb-7 font-mono text-[11px] uppercase tracking-[0.3em] text-tenue">
          Psicóloga organizacional · Cofundadora de Talentoría
        </p>

        <h1 className="relative max-w-[12ch] font-serif text-[clamp(46px,10.5vw,150px)] font-normal leading-[0.94] tracking-[-0.03em]">
          <span className="block">Perla</span>
          <span
            className="block italic text-transparent"
            style={{
              backgroundImage:
                'linear-gradient(100deg, #8FB8EE 0%, #3E7BD1 34%, #FFFFFF 100%)',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
            }}
          >
            Torres
          </span>
        </h1>

        <p className="relative mt-8 max-w-[52ch] text-[clamp(15px,1.35vw,19px)] leading-[1.7] text-[#E6EEFA]">
          Veinte años en gestión de personas. Acompaño a quien dirige a tomar mejores
          decisiones sobre su gente, y a las empresas a construir culturas donde valga la
          pena quedarse.
        </p>

        <div className="relative mt-10 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/contacto"
            className="rounded-sm border border-senal/60 bg-senal/15 px-7 py-3.5 font-mono text-[12px] uppercase tracking-[0.16em] text-luz no-underline transition-colors hover:border-senal hover:bg-senal/30"
          >
            Escríbeme
          </Link>
          <Link
            href="/conciencia-y-negocios"
            className="rounded-sm border border-luz/20 px-7 py-3.5 font-mono text-[12px] uppercase tracking-[0.16em] text-tenue no-underline transition-colors hover:border-luz/50 hover:text-luz"
          >
            Leer el ensayo
          </Link>
        </div>

        <p
          className="pointer-events-none absolute bottom-[14vh] left-1/2 -translate-x-1/2 whitespace-nowrap font-mono text-[11px] uppercase tracking-[0.22em] text-hielo transition-opacity duration-700"
          style={{ opacity: etapa === 'campo' ? 1 : 0 }}
          aria-hidden="true"
        >
          Un solo campo · Integración
        </p>

        <div
          className="absolute bottom-9 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2.5 font-mono text-[10px] uppercase tracking-[0.24em] text-tenue"
          aria-hidden="true"
        >
          Desliza
          <span className="block h-11 w-px animate-pulse bg-gradient-to-b from-senal to-transparent" />
        </div>
      </div>
    </section>
  );
}
