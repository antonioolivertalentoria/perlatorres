import Link from 'next/link';
import type { Documento } from '@/lib/contenido';
import Prosa from './Prosa';
import Faqs from './Faqs';
import Aparece from './Aparece';
import Tarjetas from './Tarjetas';
import Invitacion from './Invitacion';
import Reconocimientos from './Reconocimientos';

/** Plantilla común de todas las páginas de texto largo. */
export default function Articulo({
  doc,
  migas,
  siguiente,
  invitacion,
  extra,
}: {
  doc: Documento;
  migas?: { href: string; texto: string }[];
  siguiente?: { href: string; texto: string; etiqueta?: string };
  /** Cierre con llamada a escribir, al final del texto. */
  invitacion?: { titulo: string; texto?: string };
  /** Contenido propio de la página (por ejemplo, el formulario de contacto). */
  extra?: React.ReactNode;
}) {
  /**
   * El cuerpo puede traer marcadores para intercalar bloques que no son prosa.
   * Se parte el markdown por ellos y se pinta cada trozo en su sitio, de modo
   * que el orden del texto sigue siendo el que se escribió en el .mdx.
   */
  const trozos = doc.cuerpo.split(/\[\[(SENALES|INDICADORES|INVITACION_SENALES|RECONOCIMIENTOS)\]\]/);
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

        {trozos.map((trozo, i) =>
          i % 2 === 1 ? (
            trozo === 'SENALES' ? (
              <Tarjetas key={i} items={doc.senales ?? []} columnas={3} />
            ) : trozo === 'INDICADORES' ? (
              <Tarjetas key={i} items={doc.indicadores ?? []} columnas={3} />
            ) : trozo === 'RECONOCIMIENTOS' ? (
              <Reconocimientos key={i} modo="lista" />
            ) : (
              <Invitacion
                key={i}
                compacta
                titulo="¿Reconoces tres o más en tu organización?"
                texto="Es el momento de mirarlo con datos y no de memoria. Cuéntame qué estás viendo y te digo con honestidad si es mi tema o no."
              />
            )
          ) : trozo.trim() ? (
            <Aparece as="section" key={i}>
              <Prosa cuerpo={trozo} enlaces={doc.enlacesTalentoria} />
            </Aparece>
          ) : null,
        )}

        {extra}

        <Faqs faqs={doc.faqs} />

        {invitacion && <Invitacion titulo={invitacion.titulo} texto={invitacion.texto} />}

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
