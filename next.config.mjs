import path from 'node:path';

const esExportacion = process.env.EXPORT_LOCAL === '1';

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
