import type { Bloque } from '@/lib/contenido';
import Aparece from './Aparece';

/**
 * Listas que antes iban en prosa corrida y ahora se pueden escanear de un
 * vistazo. El texto sigue siendo HTML plano: no se pierde nada para el buscador.
 */
export default function Tarjetas({
  titulo,
  ojo,
  items,
  columnas = 3,
}: {
  titulo?: string;
  ojo?: string;
  items: Bloque[];
  columnas?: 2 | 3;
}) {
  if (!items.length) return null;

  return (
    <section className="mt-14">
      {ojo && <p className="ojo mb-5">{ojo}</p>}
      {titulo && (
        <h2 className="mb-9 font-serif text-[clamp(26px,3.4vw,40px)] font-normal leading-[1.12] text-luz">
          {titulo}
        </h2>
      )}
      <div
        className={`grid gap-px bg-senal/15 sm:grid-cols-2 ${
          columnas === 3 ? 'lg:grid-cols-3' : ''
        } border border-senal/15`}
      >
        {items.map((b, i) => (
          <Aparece key={b.titulo} delay={i * 40} className="bg-marino p-[clamp(22px,2.6vw,30px)]">
            <p className="mb-3 font-mono text-[11px] tracking-[0.18em] text-senal">
              {String(i + 1).padStart(2, '0')}
            </p>
            <h3 className="mb-3 font-serif text-[clamp(19px,2vw,23px)] leading-[1.2] text-luz">
              {b.titulo}
            </h3>
            <p className="text-[15px] leading-[1.7] text-cuerpo">{b.texto}</p>
          </Aparece>
        ))}
      </div>
    </section>
  );
}
