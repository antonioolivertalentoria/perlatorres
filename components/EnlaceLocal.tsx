'use client';

import { forwardRef } from 'react';

/**
 * Sustituto de next/link SOLO para la exportación estática de vista previa.
 *
 * next/link hace navegación del lado del cliente: pide al servidor la carga
 * RSC de la ruta destino. Abriendo los archivos con file:// no hay servidor,
 * así que esas peticiones fallan y la navegación se rompe.
 *
 * Este componente renderiza un <a> normal, que provoca una carga completa de
 * página. Más lenta, pero funciona sin servidor. En el sitio real (Vercel)
 * este archivo no se usa: manda next/link.
 */
type Props = React.AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string;
  prefetch?: boolean;
  replace?: boolean;
  scroll?: boolean;
};

const EnlaceLocal = forwardRef<HTMLAnchorElement, Props>(function EnlaceLocal(
  { href, prefetch, replace, scroll, children, ...resto },
  ref,
) {
  return (
    <a ref={ref} href={href} {...resto}>
      {children}
    </a>
  );
});

export default EnlaceLocal;
