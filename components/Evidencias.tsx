import { EVIDENCIAS } from '@/lib/site';
import Aparece from './Aparece';

/**
 * Evidencia pública. Cada afirmación del sitio que se pueda comprobar afuera
 * va enlazada a su fuente: eso es lo que separa una semblanza de un currículum
 * y lo que un buscador —o un modelo generativo— necesita para citarla.
 */
export default function Evidencias() {
  return (
    <section className="mt-16">
      <p className="ojo mb-6">Dónde comprobarlo</p>
      <ul className="max-w-medida border-t border-luz/10">
        {EVIDENCIAS.map((e, i) => (
          <Aparece as="li" key={e.url} delay={i * 30} className="border-b border-luz/10 py-5">
            <a
              href={e.url}
              target="_blank"
              rel="noopener"
              className="group inline-flex items-baseline gap-2 font-serif text-[clamp(17px,1.9vw,21px)] leading-snug text-luz no-underline transition-colors hover:text-claro"
            >
              {e.titulo}
              <span aria-hidden="true" className="text-senal">
                ↗
              </span>
            </a>
            <p className="mt-2 max-w-[62ch] text-[14.5px] leading-[1.7] text-tenue">
              {e.acredita}
            </p>
          </Aparece>
        ))}
      </ul>
    </section>
  );
}
