import { RECONOCIMIENTOS } from '@/lib/site';
import Aparece from './Aparece';

/**
 * Dos presentaciones del mismo dato.
 * `franja`: portada, solo los nombres, sin explicación.
 * `lista`: trayectoria, cada uno con su línea de contexto (qué es, cuándo,
 * por qué) para quien está evaluando a Perla para un panel o una conferencia.
 */
export default function Reconocimientos({ modo }: { modo: 'franja' | 'lista' }) {
  if (modo === 'franja') {
    return (
      <section aria-label="Reconocimientos" className="border-y border-luz/10 bg-marino/40">
        <div className="mx-auto max-w-[1180px] px-[clamp(20px,5vw,64px)] py-[clamp(28px,4vh,44px)]">
          <ul className="grid gap-x-10 gap-y-5 sm:grid-cols-2 lg:grid-cols-4">
            {RECONOCIMIENTOS.map((r) => (
              <li
                key={r.nombre}
                className="font-mono text-[11px] uppercase leading-[1.7] tracking-[0.14em] text-tenue"
              >
                {r.nombre}
              </li>
            ))}
          </ul>
        </div>
      </section>
    );
  }

  return (
    <section className="mt-16">
      <p className="ojo mb-6">Reconocimientos</p>
      <ul className="max-w-medida border-t border-luz/10">
        {RECONOCIMIENTOS.map((r, i) => (
          <Aparece as="li" key={r.nombre} delay={i * 40} className="border-b border-luz/10 py-6">
            <p className="font-serif text-[clamp(19px,2.1vw,24px)] leading-snug text-luz">
              {r.nombre}
            </p>
            {r.contexto && (
              <p className="mt-2.5 max-w-[62ch] text-[15px] leading-[1.7] text-cuerpo">
                {r.contexto}
              </p>
            )}
          </Aparece>
        ))}
      </ul>
    </section>
  );
}
