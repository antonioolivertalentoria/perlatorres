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

/**
 * Arquitectura de marcas (instrucción de Perla, septiembre de 2026):
 *   Perla Torres → marca personal y casa digital (este sitio).
 *   Talentoría   → servicios empresariales de RH; ahí se diseña y se ejecuta.
 *   El ROI de la Conciencia → proyecto editorial independiente, más adelante.
 * Talentoría y El ROI de la Conciencia NUNCA se enlazan directamente entre sí.
 */
export const TALENTORIA_URL = 'https://talentoria.com/';

export const SITE = {
  nombre: 'Perla Torres',
  lema: 'Empresaria y estratega de talento',
  descripcion:
    'Perla Torres es empresaria y estratega de talento, cofundadora y directora comercial de Talentoría. Especialista en fidelización, liderazgo, innovación en RH y desarrollo de negocios.',
  autor: {
    nombre: 'Perla Torres',
    puesto: 'Cofundadora y directora comercial de Talentoría',
    /**
     * sameAs son OTROS perfiles de la MISMA persona. talentoria.com no lo es
     * (es la organización, y ya va declarada en worksFor/founderOf), así que
     * aquí solo entran perfiles que identifican inequívocamente a Perla.
     */
    sameAs: [CONTACTO.linkedin],
    conoceDe: [
      'Estrategia de talento',
      'Fidelización del talento',
      'Innovación en Recursos Humanos',
      'Liderazgo',
      'Cultura organizacional',
      'Desarrollo de negocios',
      'Venta consultiva B2B',
    ],
  },
  organizacion: {
    nombre: 'Talentoría',
    url: TALENTORIA_URL,
    descripcion:
      'Consultora de recursos humanos: headhunting, capacitación, cultura organizacional y evaluación de talento.',
    ciudad: 'Chihuahua',
    pais: 'MX',
  },
  idioma: 'es-MX',
} as const;

/**
 * Reconocimientos con la denominación exacta.
 * `corto` es lo que se imprime en la franja de la portada; `nombre` y
 * `contexto` van en la lista de la trayectoria, y `url` apunta a la fuente
 * externa oficial cuando existe.
 */
export type Reconocimiento = {
  nombre: string;
  corto?: string;
  contexto?: string;
  url?: string;
};

export const RECONOCIMIENTOS: Reconocimiento[] = [
  {
    nombre: 'Generación 2026 del E-100 · ASEM',
    corto: 'Generación 2026 E-100 · ASEM',
    contexto:
      'Integrante de la Generación 2026 del E-100 de la Asociación de Emprendedores de México (ASEM), iniciativa que reconoce a las 100 personas fundadoras más inspiradoras de México.',
    url: 'https://e100.asem.mx/gen2026/',
  },
  {
    nombre: 'Santander Women | Future 50 (W50)',
    corto: 'Santander Women | Future 50',
  },
  {
    nombre: 'Top 50 de consultorías de Recursos Humanos en México para Talentoría',
    corto: 'Top 50 consultorías de RH · Talentoría',
    contexto:
      'Talentoría ocupa el lugar 35 del ranking de las mejores consultoras de Recursos Humanos de México que publica Revista Consultoría.',
    url: 'https://revistaconsultoria.com.mx/las-mejores-consultoras-en-recursos-humanos/',
  },
  {
    nombre: 'Embajadora Internacional de Expertos en Bienestar Laboral · CEBEL',
    corto: 'Embajadora Internacional · CEBEL',
  },
];

/**
 * Evidencia pública verificable. Alimenta el bloque de la semblanza y le da
 * a buscadores y a modelos generativos fuentes externas que confirman lo que
 * afirma el sitio.
 */
export type Evidencia = { titulo: string; acredita: string; url: string };

export const EVIDENCIAS: Evidencia[] = [
  {
    titulo: 'Perfil individual E-100 de ASEM',
    acredita: 'Trayectoria, impacto, reconocimientos y legado empresarial.',
    url: 'https://e100.asem.mx/wp-content/uploads/2026/07/Perla-Torres.pdf',
  },
  {
    titulo: 'Generación E-100 2026 · ASEM',
    acredita:
      'Reconocimiento entre las 100 personas emprendedoras más inspiradoras de México.',
    url: 'https://e100.asem.mx/gen2026/',
  },
  {
    titulo: 'Las Mejores Consultoras en RH · Revista Consultoría',
    acredita: 'Talentoría en el lugar 35 de las mejores consultorías de RH de México.',
    url: 'https://revistaconsultoria.com.mx/las-mejores-consultoras-en-recursos-humanos/',
  },
  {
    titulo: 'Empresas por la Paz · página oficial',
    acredita: 'Contexto y relevancia nacional del distintivo.',
    url: 'https://dialogonacionalporlapaz.org.mx/new/empresas-por-la-paz/',
  },
  {
    titulo: 'Talentoría entre las mejores consultorías de RH en México',
    acredita: 'Reconocimiento como estratega de talento y cofundadora; clientes e impacto.',
    url: 'https://liderazgoycrecimiento.com/talentoria-entre-las-mejores-consultorias-de-recursos-humanos-en-mexico-impulsa-soluciones-estrategicas-para-las-empresas/',
  },
  {
    titulo: '«¡El rol de Recursos Humanos debe desaparecer!» · artículo propio',
    acredita: 'Autoridad intelectual y visión sobre la evolución estratégica de RH.',
    url: 'https://liderazgoycrecimiento.com/recursos-humanos-talentoria/',
  },
  {
    titulo: 'Talentoría',
    acredita: 'Trayectoria empresarial, servicios, alcance y posicionamiento de la firma.',
    url: TALENTORIA_URL,
  },
  {
    titulo: 'LinkedIn de Perla Torres',
    acredita: 'Trayectoria vigente, publicaciones, red y posicionamiento profesional.',
    url: CONTACTO.linkedin,
  },
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

/**
 * Las dos rutas de contacto. Nunca una sola: la web no debe generar la
 * expectativa de que Perla atiende personalmente cualquier solicitud.
 */
export type RutaContacto = {
  titulo: string;
  texto: string;
  href: string;
  externo: boolean;
  boton: string;
};

export const RUTAS_CONTACTO: RutaContacto[] = [
  {
    titulo: 'Servicios para empresas',
    texto:
      'Diagnósticos, headhunting, capacitación y programas de liderazgo los diseña y los ejecuta Talentoría.',
    href: TALENTORIA_URL,
    externo: true,
    boton: 'Ir a Talentoría',
  },
  {
    titulo: 'Conferencias, medios y alianzas',
    texto:
      'Invitaciones a conferencia, entrevistas, colaboraciones editoriales y alianzas: eso lo veo yo.',
    href: '/contacto',
    externo: false,
    boton: 'Escríbeme',
  },
];
