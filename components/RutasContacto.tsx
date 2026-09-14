import Link from 'next/link';
import { RUTAS_CONTACTO } from '@/lib/site';

/**
 * Las dos rutas, siempre juntas y siempre en el mismo orden.
 * Quien busca un servicio va a Talentoría, que es quien diseña y ejecuta;
 * quien busca a Perla —conferencias, medios, alianzas— le escribe a ella.
 * Separarlas evita prometer que Perla atenderá personalmente cada solicitud.
 */
export default function RutasContacto({ compacta = false }: { compacta?: boolean }) {
  return (
    <div
      className={`grid gap-px overflow-hidden rounded-sm border border-senal/20 bg-senal/20 md:grid-cols-2 ${
        compacta ? 'mt-8' : 'mt-10'
      }`}
    >
      {RUTAS_CONTACTO.map((r) => (
        <div key={r.titulo} className="flex flex-col bg-marino p-[clamp(24px,3.5vw,38px)]">
          <h3 className="font-serif text-[clamp(20px,2.3vw,26px)] leading-snug text-luz">
            {r.titulo}
          </h3>
          <p className="mt-3 flex-1 max-w-[46ch] text-[15px] leading-[1.7] text-cuerpo">
            {r.texto}
          </p>
          {r.externo ? (
            <a
              href={r.href}
              target="_blank"
              rel="noopener"
              className="mt-6 inline-flex w-fit items-baseline gap-2 rounded-sm border border-luz/20 px-5 py-2.5 font-mono text-[11.5px] uppercase tracking-[0.16em] text-claro no-underline transition-colors hover:border-luz/50 hover:text-luz"
            >
              {r.boton}
              <span aria-hidden="true">↗</span>
            </a>
          ) : (
            <Link
              href={r.href}
              className="mt-6 inline-flex w-fit rounded-sm border border-senal/60 bg-senal/15 px-5 py-2.5 font-mono text-[11.5px] uppercase tracking-[0.16em] text-luz no-underline transition-colors hover:border-senal hover:bg-senal/30"
            >
              {r.boton}
            </Link>
          )}
        </div>
      ))}
    </div>
  );
}
