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
            <summary className="cursor-pointer list-none font-serif text-[clamp(19px,2.1vw,24px)] leading-snug text-luz marker:hidden">
              <span className="mr-3 font-mono text-[11px] align-middle text-senal">
                {String(i + 1).padStart(2, '0')}
              </span>
              {f.q}
            </summary>
            <p className="mt-4 max-w-[62ch] pl-9 text-[16px] leading-relaxed text-cuerpo">{f.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
