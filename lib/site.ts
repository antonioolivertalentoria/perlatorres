/**
 * Configuración central del sitio.
 * Cambia SITE_URL cuando quede confirmado el dominio definitivo
 * (o define NEXT_PUBLIC_SITE_URL en Vercel y no toques este archivo).
 */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? 'https://perlatorres.com'
).replace(/\/$/, '');

export const CONTACTO = {
  correo: 'perlatorres@talentoria.com',
  linkedin: 'https://www.linkedin.com/in/perlatorresrh/',
  linkedinTexto: 'linkedin.com/in/perlatorresrh',
} as const;

export const SITE = {
  nombre: 'Perla Torres',
  lema: 'Liderazgo consciente y gestión de personas',
  descripcion:
    'El mundo material está sostenido por el mundo interior. Veinte años de gestión de personas, liderazgo consciente y trabajo interior aplicado a los negocios.',
  autor: {
    nombre: 'Perla Torres',
    puesto: 'Cofundadora de Talentoría',
    sameAs: [
      'https://talentoria.com/',
      CONTACTO.linkedin,
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

/**
 * Reconocimientos, en el orden que pidió Perla.
 * `contexto` alimenta el bloque de la página de trayectoria; mientras esté
 * vacío, ahí solo se imprime el nombre. La franja de la portada nunca lo usa:
 * ahí van solo los nombres.
 */
export type Reconocimiento = { nombre: string; contexto?: string };

export const RECONOCIMIENTOS: Reconocimiento[] = [
  { nombre: 'Santander Women 50 · SW50' },
  { nombre: 'Una de las 100 mejores emprendedoras 2026 · ASEM' },
  { nombre: 'Top 50 mejores consultorías de RH en México 2025-2027' },
  { nombre: 'Embajadora Internacional de Expertos en Bienestar Laboral · CEBEL' },
];

export type Enlace = { href: string; texto: string };

/** Menú principal. Contacto va aparte, como botón. */
export const NAV: Enlace[] = [
  { href: '/perla-torres', texto: 'Perla' },
  { href: '/conciencia-y-negocios', texto: 'El ensayo' },
  { href: '/liderazgo-consciente', texto: 'Liderazgo' },
];

export const NAV_CONTACTO: Enlace = { href: '/contacto', texto: 'Contacto' };

/** Todas las páginas vigentes, para el pie de página. */
export const NAV_COMPLETO: Enlace[] = [...NAV, NAV_CONTACTO];
