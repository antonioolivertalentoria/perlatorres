/**
 * Configuración central del sitio.
 * Cambia SITE_URL cuando quede confirmado el dominio definitivo
 * (o define NEXT_PUBLIC_SITE_URL en Vercel y no toques este archivo).
 */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? 'https://perlatorres.com'
).replace(/\/$/, '');

export const SITE = {
  nombre: 'Perla Torres',
  tesis: 'El ROI de la conciencia',
  descripcion:
    'El mundo material está sostenido por el mundo interior. Veinte años de gestión de personas, liderazgo consciente y trabajo interior aplicado a los negocios.',
  autor: {
    nombre: 'Perla Torres',
    puesto: 'Cofundadora de Talentoría',
    // sameAs: añade aquí los perfiles reales conforme existan.
    // Cada uno refuerza la entidad "Perla Torres" en el Knowledge Graph.
    sameAs: [
      'https://talentoria.com/',
      // 'https://www.linkedin.com/in/…',
      // 'https://www.instagram.com/…',
    ],
    conoceDe: [
      'Liderazgo consciente',
      'Recursos humanos',
      'Psicología organizacional',
      'Evaluación de talento',
      'Cultura organizacional',
      'Consultoría de negocios',
    ],
  },
  organizacion: {
    nombre: 'Talentoría',
    url: 'https://talentoria.com/',
    descripcion:
      'Consultora de recursos humanos: headhunting, capacitación, cultura organizacional y evaluación de talento.',
    ciudad: 'Chihuahua',
    pais: 'MX',
  },
  idioma: 'es-MX',
} as const;

export type Enlace = { href: string; texto: string };

export const NAV: Enlace[] = [
  { href: '/el-roi-de-la-conciencia', texto: 'La tesis' },
  { href: '/principios', texto: 'Principios' },
  { href: '/liderazgo-consciente', texto: 'Liderazgo' },
  { href: '/perla-torres', texto: 'Perla' },
  { href: '/contacto', texto: 'Contacto' },
];
