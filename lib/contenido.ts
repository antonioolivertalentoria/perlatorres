import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';

export type EnlaceTalentoria = {
  url: string;
  anchor: string;
  marcador: string;
};

export type Faq = { q: string; a: string };

export type Hito = { etapa: string; titulo: string; texto: string };

export type Documento = {
  title: string;
  /** Título corto para la etiqueta <title>. Ver `tituloSeo()`. */
  tituloSeo: string;
  slug: string;
  description: string;
  eyebrow?: string;
  keywords?: string[];
  lecturaMin?: number;
  numero?: number;
  resumen?: string;
  enlacesTalentoria: EnlaceTalentoria[];
  faqs: Faq[];
  hitos?: Hito[];
  cuerpo: string;
};

const RAIZ = path.join(process.cwd(), 'content');

/**
 * El H1 puede ser largo y descriptivo; la etiqueta <title> no.
 * Google trunca alrededor de los 60 caracteres, y a eso hay que sumarle
 * el sufijo " · Perla Torres" de la plantilla. Así que recortamos a 45:
 * primero por los dos puntos (nuestros títulos usan "Tema: desarrollo"),
 * y si aún así no cabe, por la última palabra completa.
 */
export function tituloSeo(titulo: string): string {
  const base = titulo.split(':')[0].trim();
  if (base.length <= 45) return base;
  const corte = base.slice(0, 45);
  return corte.slice(0, corte.lastIndexOf(' ')).replace(/[,;·—-]$/, '').trim();
}

function leerCarpeta(carpeta: string): Documento[] {
  const dir = path.join(RAIZ, carpeta);
  if (!fs.existsSync(dir)) return [];

  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith('.mdx'))
    .map((archivo) => {
      const crudo = fs.readFileSync(path.join(dir, archivo), 'utf8');
      const { data, content } = matter(crudo);

      const title = String(data.title ?? '');

      return {
        title,
        tituloSeo: tituloSeo(data.tituloSeo ? String(data.tituloSeo) : title),
        slug: String(data.slug ?? archivo.replace(/\.mdx$/, '')),
        description: String(data.description ?? ''),
        eyebrow: data.eyebrow ? String(data.eyebrow) : undefined,
        keywords: Array.isArray(data.keywords) ? data.keywords.map(String) : [],
        lecturaMin: typeof data.lecturaMin === 'number' ? data.lecturaMin : undefined,
        numero: typeof data.numero === 'number' ? data.numero : undefined,
        resumen: data.resumen ? String(data.resumen) : undefined,
        enlacesTalentoria: Array.isArray(data.enlacesTalentoria)
          ? (data.enlacesTalentoria as EnlaceTalentoria[])
          : [],
        faqs: Array.isArray(data.faqs) ? (data.faqs as Faq[]) : [],
        hitos: Array.isArray(data.hitos) ? (data.hitos as Hito[]) : undefined,
        cuerpo: content.trim(),
      };
    });
}

/** Las diez páginas de principios, ordenadas por su número en la matriz. */
export function principios(): Documento[] {
  return leerCarpeta('principios').sort((a, b) => (a.numero ?? 99) - (b.numero ?? 99));
}

export function principio(slug: string): Documento | undefined {
  return principios().find((p) => p.slug === slug);
}

/** Páginas sueltas: pilares, semblanza, Talentoría, contacto. */
export function paginas(): Documento[] {
  return leerCarpeta('paginas');
}

export function pagina(slug: string): Documento | undefined {
  return paginas().find((p) => p.slug === slug);
}

/**
 * Todas las URLs indexables del sitio, para el sitemap.
 * Se deriva del contenido: si añades un .mdx, aparece solo.
 */
export function rutas(): string[] {
  return [
    '/',
    '/principios',
    ...paginas().map((p) => `/${p.slug}`),
    ...principios().map((p) => `/principios/${p.slug}`),
  ];
}
