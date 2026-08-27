import Link from 'next/link';
import { CONTACTO, NAV_COMPLETO, SITE } from '@/lib/site';

export default function PieDePagina() {
  return (
    <footer className="mt-24 border-t border-luz/10 py-16">
      <div className="mx-auto max-w-[1180px] px-[clamp(20px,5vw,64px)]">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div className="max-w-[38ch]">
            <p className="font-serif text-[24px] leading-tight text-luz">Perla Torres</p>
            <p className="mt-3 text-[14px] leading-relaxed text-tenue">
              El mundo material está sostenido por el mundo interior. Y no hay que elegir
              entre los dos.
            </p>
          </div>

          <nav aria-label="Pie de página" className="flex flex-col gap-2.5">
            {NAV_COMPLETO.map((e) => (
              <Link
                key={e.href}
                href={e.href}
                className="font-mono text-[11px] uppercase tracking-[0.14em] text-tenue no-underline transition-colors hover:text-claro"
              >
                {e.texto}
              </Link>
            ))}
          </nav>

          <div className="flex flex-col gap-2.5">
            <p className="font-mono text-[10.5px] uppercase tracking-[0.2em] text-senal">
              Escríbeme
            </p>
            <a
              href={`mailto:${CONTACTO.correo}`}
              className="text-[14px] text-cuerpo no-underline transition-colors hover:text-luz"
            >
              {CONTACTO.correo}
            </a>
            <a
              href={CONTACTO.linkedin}
              target="_blank"
              rel="noopener"
              className="text-[14px] text-cuerpo no-underline transition-colors hover:text-luz"
            >
              LinkedIn
            </a>
            <a
              href={SITE.organizacion.url}
              target="_blank"
              rel="noopener"
              className="mt-3 font-mono text-[11px] uppercase tracking-[0.14em] text-tenue no-underline transition-colors hover:text-claro"
            >
              talentoria.com ↗
            </a>
          </div>
        </div>

        <p className="mt-14 font-mono text-[11px] leading-loose tracking-[0.06em] text-tenue/70">
          {SITE.nombre} · {SITE.autor.puesto}
        </p>
      </div>
    </footer>
  );
}
