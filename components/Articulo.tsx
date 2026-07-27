import Link from 'next/link';
import type { Documento } from '@/lib/contenido';
import Prosa from './Prosa';
import Faqs from './Faqs';
import Aparece from './Aparece';

/** Plantilla común de todas las páginas de texto largo. */
export default function Articulo({
  doc,
  migas,
  siguiente,
}: {
  doc: Documento;
  migas?: { href: string; texto: string }[];
  siguiente?: { href: string; texto: string; etiqueta?: string };
}) {
  return (
    <article className="relative pb-24 pt-[clamp(140px,20vh,220px)]">
      <div className="mx-auto max-w-[1180px] px-[clamp(20px,5vw,64px)]">
        <header className="max-w-[860px]">
          {migas?.length ? (
            <nav aria-label="Migas de pan" className="mb-8">
              <ol className="flex flex-wrap items-center gap-2 font-mono text-[10.5px] uppercase tracking-[0.16em] text-tenue">
                <li>
                  <Link href="/" className="no-underline transition-colors hover:text-claro">
                    Inicio
                  </Link>
                </li>
                {migas.map((m) => (
                  <li key={m.href} className="flex items-center gap-2">
                    <span aria-hidden="true" className="text-senal/50">
                      /
                    </span>
                    <Link href={m.href} className="no-underline transition-colors hover:text-claro">
                      {m.texto}
                    </Link>
                  </li>
                ))}
              </ol>
            </nav>
          ) : null}

          {doc.eyebrow && <p className="ojo mb-6">{doc.eyebrow}</p>}

          <h1 className="font-serif text-[clamp(36px,6vw,74px)] font-normal leading-[1.04] tracking-[-0.02em] text-luz">
            {doc.title}
          </h1>

          <p className="mt-7 max-w-[62ch] text-[clamp(18px,1.6vw,22px)] leading-[1.6] text-[#E6EEFA]">
            {doc.description}
          </p>

          {doc.lecturaMin && (
            <p className="mt-8 font-mono text-[11px] uppercase tracking-[0.2em] text-tenue">
              {doc.lecturaMin} min de lectura
            </p>
          )}
        </header>

        <hr className="my-14 max-w-[860px] border-luz/10" />

        <Aparece as="section">
          <Prosa cuerpo={doc.cuerpo} enlaces={doc.enlacesTalentoria} />
        </Aparece>

        <Faqs faqs={doc.faqs} />

        {siguiente && (
          <nav className="mt-24 max-w-medida border-t border-luz/10 pt-8" aria-label="Continuar">
            {siguiente.etiqueta && (
              <p className="mb-3 font-mono text-[10.5px] uppercase tracking-[0.2em] text-tenue">
                {siguiente.etiqueta}
              </p>
            )}
            <Link
              href={siguiente.href}
              className="group inline-flex items-baseline gap-3 font-serif text-[clamp(22px,2.6vw,30px)] leading-snug text-luz no-underline transition-colors hover:text-claro"
            >
              {siguiente.texto}
              <span className="text-senal transition-transform group-hover:translate-x-1">→</span>
            </Link>
          </nav>
        )}
      </div>
    </article>
  );
}
