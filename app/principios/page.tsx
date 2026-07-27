import type { Metadata } from 'next';
import Link from 'next/link';
import Aparece from '@/components/Aparece';
import { principios } from '@/lib/contenido';

export const metadata: Metadata = {
  title: 'Los diez principios',
  description:
    'La matriz filosófica de Perla Torres: diez principios sobre trabajo interior, liderazgo y negocios, probados en veinte años de gestión de personas.',
  alternates: { canonical: '/principios' },
};

export default function IndicePrincipios() {
  const lista = principios();

  return (
    <div className="relative pb-24 pt-[clamp(140px,20vh,220px)]">
      <div className="mx-auto max-w-[1180px] px-[clamp(20px,5vw,64px)]">
        <header className="max-w-[760px]">
          <p className="ojo mb-6">La matriz</p>
          <h1 className="font-serif text-[clamp(36px,6vw,74px)] font-normal leading-[1.04] tracking-[-0.02em]">
            Los diez principios
          </h1>
          <p className="mt-7 max-w-[62ch] text-[clamp(18px,1.6vw,22px)] leading-[1.6] text-[#E6EEFA]">
            Diez ideas que llevo veinte años probando en campo. No son teoría: cada una tiene
            detrás una decisión que costó dinero, una contratación que salió bien o un año en
            que no supe si íbamos a llegar.
          </p>
        </header>

        <h2 className="sr-only">Índice de los diez principios</h2>

        <ul className="mt-16 border-t border-luz/10">
          {lista.map((p, i) => (
            <Aparece as="li" key={p.slug} delay={i * 40}>
              <Link
                href={`/principios/${p.slug}`}
                className="group grid gap-4 border-b border-luz/10 py-9 no-underline md:grid-cols-[auto_1fr_auto] md:items-baseline md:gap-10"
              >
                <span className="font-mono text-[12px] tracking-[0.16em] text-senal">
                  {String(p.numero).padStart(2, '0')}
                </span>
                <span>
                  <span className="block max-w-[28ch] font-serif text-[clamp(23px,2.8vw,32px)] leading-[1.15] text-luz transition-colors group-hover:text-claro">
                    {p.title.split(':')[0]}
                  </span>
                  {p.resumen && (
                    <span className="mt-3 block max-w-[58ch] text-[16px] leading-relaxed text-tenue">
                      {p.resumen}
                    </span>
                  )}
                </span>
                <span
                  className="hidden font-mono text-[11px] uppercase tracking-[0.16em] text-tenue transition-colors group-hover:text-claro md:block"
                  aria-hidden="true"
                >
                  {p.lecturaMin} min →
                </span>
              </Link>
            </Aparece>
          ))}
        </ul>
      </div>
    </div>
  );
}
