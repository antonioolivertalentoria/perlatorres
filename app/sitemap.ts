import type { MetadataRoute } from 'next';
import { rutas } from '@/lib/contenido';
import { SITE_URL } from '@/lib/site';

/** Se deriva del contenido: si añades un .mdx, entra al sitemap solo. */
export default function sitemap(): MetadataRoute.Sitemap {
  const ahora = new Date();

  return rutas().map((ruta) => ({
    url: `${SITE_URL}${ruta === '/' ? '' : ruta}`,
    lastModified: ahora,
    changeFrequency: ruta === '/' ? 'weekly' : 'monthly',
    priority: ruta === '/' ? 1 : ruta.split('/').length > 2 ? 0.6 : 0.8,
  }));
}
