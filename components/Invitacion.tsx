import { CONTACTO } from '@/lib/site';
import RutasContacto from './RutasContacto';

/**
 * Cierre con invitación. Va donde el interés es más alto, no solo al final de
 * la página, y siempre ofrece las dos rutas: servicios de empresa a Talentoría,
 * y conferencias, medios y alianzas a Perla.
 */
export default function Invitacion({
  titulo,
  texto,
  compacta = false,
}: {
  titulo: string;
  texto?: string;
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

      <RutasContacto compacta={compacta} />

      <a
        href={`mailto:${CONTACTO.correo}`}
        className="mt-7 inline-block font-mono text-[12px] tracking-[0.06em] text-tenue no-underline transition-colors hover:text-luz"
      >
        {CONTACTO.correo}
      </a>
    </aside>
  );
}
