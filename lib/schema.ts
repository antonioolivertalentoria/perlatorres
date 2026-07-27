import { SITE, SITE_URL } from './site';
import type { Documento } from './contenido';

/**
 * ---------------------------------------------------------------------------
 * LA JUGADA DE ENTIDADES
 * ---------------------------------------------------------------------------
 * Person(Perla Torres) --founder--> Organization(Talentoría)
 *
 * Declarar esta relación desde este dominio vincula ambas entidades en el
 * Knowledge Graph. Es transferencia de autoridad SEMÁNTICA: no depende del
 * PageRank de un enlace y no es penalizable como un backlink manipulado.
 *
 * Para cerrar el círculo, talentoria.com debe declarar a Perla como `founder`
 * desde su propio schema. Eso convierte la señal en bidireccional, que es
 * cuando de verdad pesa.
 * ---------------------------------------------------------------------------
 */

const ID_PERSONA = `${SITE_URL}/#perla-torres`;
const ID_ORG = `${SITE.organizacion.url}#organization`;
const ID_SITIO = `${SITE_URL}/#website`;

export function organizacion() {
  return {
    '@type': 'Organization',
    '@id': ID_ORG,
    name: SITE.organizacion.nombre,
    url: SITE.organizacion.url,
    description: SITE.organizacion.descripcion,
    address: {
      '@type': 'PostalAddress',
      addressLocality: SITE.organizacion.ciudad,
      addressCountry: SITE.organizacion.pais,
    },
    founder: { '@id': ID_PERSONA },
  };
}

export function persona() {
  return {
    '@type': 'Person',
    '@id': ID_PERSONA,
    name: SITE.autor.nombre,
    url: SITE_URL,
    jobTitle: SITE.autor.puesto,
    description: SITE.descripcion,
    knowsAbout: [...SITE.autor.conoceDe],
    sameAs: [...SITE.autor.sameAs],
    worksFor: { '@id': ID_ORG },
    // La relación inversa, declarada explícitamente.
    founderOf: { '@id': ID_ORG },
  };
}

export function sitio() {
  return {
    '@type': 'WebSite',
    '@id': ID_SITIO,
    url: SITE_URL,
    name: `${SITE.nombre} — ${SITE.tesis}`,
    inLanguage: SITE.idioma,
    publisher: { '@id': ID_PERSONA },
  };
}

/** Grafo base, se inyecta una sola vez en el layout raíz. */
export function grafoBase() {
  return {
    '@context': 'https://schema.org',
    '@graph': [persona(), organizacion(), sitio()],
  };
}

function migas(ruta: string, titulo: string) {
  const partes = ruta.split('/').filter(Boolean);
  const items = [{ '@type': 'ListItem', position: 1, name: 'Inicio', item: SITE_URL }];

  let acumulado = '';
  partes.forEach((parte, i) => {
    acumulado += `/${parte}`;
    items.push({
      '@type': 'ListItem',
      position: i + 2,
      name: i === partes.length - 1 ? titulo : parte.replace(/-/g, ' '),
      item: `${SITE_URL}${acumulado}`,
    });
  });

  return { '@type': 'BreadcrumbList', itemListElement: items };
}

/** Grafo por artículo: Article + FAQPage + BreadcrumbList. */
export function grafoArticulo(doc: Documento, ruta: string) {
  const url = `${SITE_URL}${ruta}`;

  const nodos: Record<string, unknown>[] = [
    {
      '@type': 'Article',
      '@id': `${url}#article`,
      headline: doc.title,
      description: doc.description,
      inLanguage: SITE.idioma,
      author: { '@id': ID_PERSONA },
      publisher: { '@id': ID_PERSONA },
      mainEntityOfPage: url,
      ...(doc.keywords?.length ? { keywords: doc.keywords.join(', ') } : {}),
      about: { '@id': ID_PERSONA },
    },
    migas(ruta, doc.title),
  ];

  if (doc.faqs.length) {
    nodos.push({
      '@type': 'FAQPage',
      '@id': `${url}#faq`,
      mainEntity: doc.faqs.map((f) => ({
        '@type': 'Question',
        name: f.q,
        acceptedAnswer: { '@type': 'Answer', text: f.a },
      })),
    });
  }

  return { '@context': 'https://schema.org', '@graph': nodos };
}

export function grafoPerfil(doc: Documento, ruta: string) {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'ProfilePage',
        '@id': `${SITE_URL}${ruta}#profile`,
        mainEntity: { '@id': ID_PERSONA },
        description: doc.description,
        inLanguage: SITE.idioma,
      },
      migas(ruta, doc.title),
    ],
  };
}
