import type { Faq } from '@/lib/contenido';

/**
 * Se marcan con FAQPage en el schema de la página. Van en <details> para que
 * el contenido esté en el HTML aunque estén cerradas: el buscador lo lee.
 */
export default function Faqs({ faqs }: { faqs: Faq[] }) {
  if (!faqs.length) return null;

  return (
    <section className="mt-24" aria-labelledby="faq-titulo">
      <p className="ojo mb-6">Preguntas frecuentes</p>
      <h2 id="faq-titulo" className="sr-only">
        Preguntas frecuentes
      </h2>
      <div className="max-w-medida border-t border-luz/10">
        {faqs.map((f, i) => (
          <details key={i} className="group border-b border-luz/10 py-5" open={i === 0}>
            <summary className="flex cursor-pointer list-none items-baseline gap-3 font-serif text-[clamp(19px,2.1vw,24px)] leading-snug text-luz marker:hidden">
              <span className="font-mono text-[11px] text-senal">
                {String(i + 1).padStart(2, '0')}
              </span>
              <span className="flex-1">{f.q}</span>
              {/* Sin este indicador, las preguntas cerradas se leen como preguntas sin responder. */}
              <span
                aria-hidden="true"
                className="shrink-0 select-none font-mono text-[18px] leading-none text-senal transition-transform duration-300 group-open:rotate-45"
              >
                +
              </span>
            </summary>
            <p className="mt-4 max-w-[62ch] pl-9 text-[16px] leading-relaxed text-cuerpo">{f.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
