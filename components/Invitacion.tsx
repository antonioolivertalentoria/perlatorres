import Link from 'next/link';
import { CONTACTO } from '@/lib/site';

/**
 * Cierre con invitación a escribir. Va donde el interés es más alto, no solo
 * al final de la página.
 */
export default function Invitacion({
  titulo,
  texto,
  boton = 'Escríbeme',
  compacta = false,
}: {
  titulo: string;
  texto?: string;
  boton?: string;
  compacta?: boolean;
}) {
  return (
    <aside
      className={`max-w-medida overflow-hidden rounded-sm border border-senal/25 bg-marino ${
        compacta ? 'mt-12 p-[clamp(24px,3.5vw,40px)]' : 'mt-20 p-[clamp(30px,5vw,60px)]'
      }`}
    >
      <span
        className="mb-6 block h-px w-full bg-gradient-to-r from-senal via-hielo to-transparent"
        aria-hidden="true"
      />
      <h2
        className={`font-serif font-normal leading-[1.12] text-luz ${
          compacta ? 'text-[clamp(22px,2.6vw,30px)]' : 'text-[clamp(26px,3.6vw,42px)]'
        }`}
      >
        {titulo}
      </h2>
      {texto && <p className="mt-5 max-w-[58ch] text-[16px] leading-[1.75] text-cuerpo">{texto}</p>}

      <div className="mt-8 flex flex-wrap items-center gap-x-7 gap-y-4">
        <Link
          href="/contacto"
          className="rounded-sm border border-senal/60 bg-senal/15 px-6 py-3 font-mono text-[12px] uppercase tracking-[0.16em] text-luz no-underline transition-colors hover:border-senal hover:bg-senal/30"
        >
          {boton}
        </Link>
        <a
          href={`mailto:${CONTACTO.correo}`}
          className="font-mono text-[12px] tracking-[0.06em] text-tenue no-underline transition-colors hover:text-luz"
        >
          {CONTACTO.correo}
        </a>
      </div>
    </aside>
  );
}
