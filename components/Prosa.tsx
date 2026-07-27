import ReactMarkdown from 'react-markdown';
import type { EnlaceTalentoria } from '@/lib/contenido';

/**
 * Renderiza el cuerpo Markdown y sustituye los marcadores TALENTORIA_n por el
 * enlace declarado en el frontmatter.
 *
 * Mantener los enlaces salientes en los metadatos y no incrustados en la prosa
 * permite auditarlos de un vistazo: cuántos hay, hacia dónde van y con qué
 * anchor. Es lo que evita que el sitio derive en una granja de enlaces sin que
 * nadie se dé cuenta.
 */
export default function Prosa({
  cuerpo,
  enlaces,
  className = '',
}: {
  cuerpo: string;
  enlaces: EnlaceTalentoria[];
  className?: string;
}) {
  const texto = enlaces.reduce(
    (acc, e) => acc.split(e.marcador).join(`[${e.anchor}](${e.url})`),
    cuerpo,
  );

  return (
    <div className={`prosa ${className}`}>
      <ReactMarkdown
        components={{
          a: ({ href, children }) => {
            const externo = !!href && /^https?:\/\//.test(href);
            return (
              <a
                href={href}
                {...(externo ? { target: '_blank', rel: 'noopener' } : {})}
              >
                {children}
              </a>
            );
          },
        }}
      >
        {texto}
      </ReactMarkdown>
    </div>
  );
}
