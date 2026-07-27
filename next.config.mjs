import path from 'node:path';

const esExportacion = process.env.EXPORT_LOCAL === '1';

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['three'],
  images: { formats: ['image/avif', 'image/webp'] },

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
