import path from 'node:path';

const esExportacion = process.env.EXPORT_LOCAL === '1';

/**
 * El dominio bueno. Sale de la misma variable que alimenta canónicas,
 * sitemap y robots, así que las cuatro cosas nunca se contradicen.
 */
const CANONICO = (process.env.NEXT_PUBLIC_SITE_URL ?? 'https://perlatorres.com').replace(
  /\/$/,
  '',
);

/**
 * El sitio también responde en perlatorres.vercel.app, que es la dirección
 * de trabajo de Vercel. Publicado en dos sitios a la vez, Google ve dos
 * copias del mismo contenido; esto manda la de Vercel al dominio real.
 * Solo aplica si el dominio bueno no es, él mismo, el de Vercel.
 */
const ALIAS_VERCEL = 'perlatorres.vercel.app';
const consolidarDominio = !CANONICO.includes(ALIAS_VERCEL);

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['three'],
  images: { formats: ['image/avif', 'image/webp'] },

  /**
   * Redirecciones 301 de la reestructura de agosto de 2026.
   * Las páginas retiradas no se borran a secas: cada URL vieja manda a la que
   * heredó su contenido, para no perder lo que ya estaba indexado.
   * `permanent: true` emite un 308, que Google trata igual que un 301.
   */
  async redirects() {
    return [
      ...(consolidarDominio
        ? [
            {
              source: '/:ruta*',
              has: [{ type: 'host', value: ALIAS_VERCEL }],
              destination: `${CANONICO}/:ruta*`,
              permanent: true,
            },
          ]
        : []),
      { source: '/el-roi-de-la-conciencia', destination: '/conciencia-y-negocios', permanent: true },
      { source: '/principios', destination: '/conciencia-y-negocios', permanent: true },
      { source: '/principios/:slug*', destination: '/conciencia-y-negocios', permanent: true },
      { source: '/talentoria', destination: '/', permanent: true },
      { source: '/liderazgo-consciente/para-empresas', destination: '/liderazgo-consciente', permanent: true },
      { source: '/liderazgo-consciente/cultura-organizacional', destination: '/liderazgo-consciente', permanent: true },
    ];
  },

  // --- Vista previa local sin servidor ---------------------------------
  // Con EXPORT_LOCAL=1 el sitio se exporta como HTML plano navegable desde
  // el sistema de archivos. Solo para revisar el diseño; el despliegue real
  // en Vercel no usa nada de esto.
  ...(esExportacion
    ? {
        output: 'export',
        trailingSlash: true,
        images: { unoptimized: true },
        webpack: (config) => {
          config.resolve.alias['next/link'] = path.resolve('./components/EnlaceLocal.tsx');
          return config;
        },
      }
    : {}),
};

export default nextConfig;
