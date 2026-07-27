'use client';

import { useEffect, useRef } from 'react';

/**
 * Aparición al entrar en pantalla. El estado final es el que está en el CSS
 * base, así que si el JS falla o el usuario pidió menos movimiento, el
 * contenido se ve igual: nunca escondemos contenido detrás de una animación.
 */
export default function Aparece({
  children,
  className = '',
  as: Etiqueta = 'div',
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  as?: 'div' | 'section' | 'article' | 'header' | 'li';
  delay?: number;
}) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          el.dataset.visible = 'true';
          io.disconnect();
        }
      },
      // threshold 0, no 0.12: un bloque más alto que la ventana (un artículo
      // completo) nunca llegaría a mostrar el 12% de su área y se quedaría
      // invisible para siempre. Con 0 basta con que asome.
      { threshold: 0, rootMargin: '0px 0px -8% 0px' },
    );

    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    // @ts-expect-error — etiqueta dinámica
    <Etiqueta ref={ref} className={`aparece ${className}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </Etiqueta>
  );
}
