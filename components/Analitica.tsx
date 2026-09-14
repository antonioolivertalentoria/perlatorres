import Script from 'next/script';

/**
 * Google Analytics 4.
 *
 * No se monta si no hay `NEXT_PUBLIC_GA_ID`: mientras la variable no exista
 * en Vercel, el sitio no carga un solo byte de Google y no deja cookies. En
 * cuanto se define (formato G-XXXXXXXXXX), empieza a medir sin tocar código.
 *
 * Las vistas de página de la navegación interna las recoge la medición
 * mejorada de GA4, que escucha los cambios de historial que hace next/link.
 */
export default function Analitica({ id }: { id: string }) {
  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${id}`}
        strategy="afterInteractive"
      />
      <Script id="ga4" strategy="afterInteractive">
        {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${id}');`}
      </Script>
    </>
  );
}
