import type { Metadata } from 'next';
import './globals.css';
import Cabecera from '@/components/Cabecera';
import PieDePagina from '@/components/PieDePagina';
import Jsonld from '@/components/Jsonld';
import { grafoBase } from '@/lib/schema';
import { SITE, SITE_URL } from '@/lib/site';

import localFont from 'next/font/local';

/**
 * Fuentes autoalojadas (archivos en app/fuentes/).
 *
 * Van servidas desde nuestro propio dominio en lugar de Google Fonts: elimina
 * una conexión externa en el camino crítico, hace el build reproducible sin
 * depender de la red, y quita a Google del aviso de privacidad.
 */
const serif = localFont({
  src: [
    { path: './fuentes/instrument-serif-latin-400-normal.woff2', weight: '400', style: 'normal' },
    { path: './fuentes/instrument-serif-latin-400-italic.woff2', weight: '400', style: 'italic' },
  ],
  display: 'swap',
  variable: '--font-serif',
  fallback: ['Georgia', 'serif'],
});

const sans = localFont({
  src: [
    { path: './fuentes/space-grotesk-latin-300-normal.woff2', weight: '300', style: 'normal' },
    { path: './fuentes/space-grotesk-latin-400-normal.woff2', weight: '400', style: 'normal' },
    { path: './fuentes/space-grotesk-latin-500-normal.woff2', weight: '500', style: 'normal' },
  ],
  display: 'swap',
  variable: '--font-sans',
  fallback: ['system-ui', 'sans-serif'],
});

const mono = localFont({
  src: [
    { path: './fuentes/jetbrains-mono-latin-300-normal.woff2', weight: '300', style: 'normal' },
    { path: './fuentes/jetbrains-mono-latin-400-normal.woff2', weight: '400', style: 'normal' },
  ],
  display: 'swap',
  variable: '--font-mono',
  fallback: ['ui-monospace', 'monospace'],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE.nombre} — ${SITE.tesis}`,
    template: `%s · ${SITE.nombre}`,
  },
  description: SITE.descripcion,
  applicationName: SITE.nombre,
  authors: [{ name: SITE.autor.nombre, url: SITE_URL }],
  creator: SITE.autor.nombre,
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    locale: 'es_MX',
    url: SITE_URL,
    siteName: `${SITE.nombre} — ${SITE.tesis}`,
    title: `${SITE.nombre} — ${SITE.tesis}`,
    description: SITE.descripcion,
  },
  twitter: {
    card: 'summary_large_image',
    title: `${SITE.nombre} — ${SITE.tesis}`,
    description: SITE.descripcion,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
  },
};

export const viewport = {
  themeColor: '#04101F',
  colorScheme: 'dark',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es-MX" className={`${serif.variable} ${sans.variable} ${mono.variable}`}>
      <body className="grano font-sans font-light antialiased">
        <Jsonld datos={grafoBase()} />
        <a
          href="#contenido"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded focus:bg-marino2 focus:px-4 focus:py-2 focus:text-luz"
        >
          Saltar al contenido
        </a>
        <Cabecera />
        <main id="contenido" className="relative z-10">
          {children}
        </main>
        <PieDePagina />
      </body>
    </html>
  );
}
