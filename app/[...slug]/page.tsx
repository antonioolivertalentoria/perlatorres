import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Articulo from '@/components/Articulo';
import FormularioContacto from '@/components/FormularioContacto';
import Jsonld from '@/components/Jsonld';
import { pagina, paginas } from '@/lib/contenido';
import { grafoArticulo, grafoPerfil } from '@/lib/schema';

type Props = { params: Promise<{ slug: string[] }> };

export function generateStaticParams() {
  return paginas().map((p) => ({ slug: p.slug.split('/') }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const doc = pagina(slug.join('/'));
  if (!doc) return {};

  return {
    title: doc.tituloSeo,
    description: doc.description,
    keywords: doc.keywords,
    alternates: { canonical: `/${doc.slug}` },
    openGraph: {
      type: 'article',
      title: doc.title,
      description: doc.description,
      url: `/${doc.slug}`,
    },
  };
}

/** Enlaces "siguiente" curados: guían la lectura y reparten autoridad interna. */
const SIGUIENTE: Record<string, { href: string; texto: string; etiqueta: string }> = {
  'conciencia-y-negocios': {
    href: '/liderazgo-consciente',
    texto: 'Qué es el liderazgo consciente',
    etiqueta: 'Continúa',
  },
  'perla-torres': {
    href: '/conciencia-y-negocios',
    texto: 'Por qué el mundo material está sostenido por el mundo interior',
    etiqueta: 'Continúa',
  },
};

/** Cierre con invitación a escribir, al final de cada página. */
const INVITACION: Record<string, { titulo: string; texto?: string }> = {
  'conciencia-y-negocios': {
    titulo: 'Si algo de esto te sonó a tu empresa, escríbeme.',
    texto:
      'No necesito que traigas el problema bien diagnosticado. Cuéntame qué está pasando en tus palabras y te contesto con honestidad, incluso si la respuesta es que no soy la persona indicada.',
  },
  'perla-torres': {
    titulo: '¿Trabajamos juntos?',
    texto:
      'Ya sabes de dónde vengo. Cuéntame de dónde vienes tú y qué está pasando en tu equipo o en tu carrera.',
  },
  'liderazgo-consciente': {
    titulo: 'Hablemos de tus líderes.',
    texto:
      'Un diagnóstico honesto empieza con una conversación. Dime el tamaño de la empresa, el área y qué has intentado ya.',
  },
};

export default async function PaginaSuelta({ params }: Props) {
  const { slug } = await params;
  const ruta = slug.join('/');
  const doc = pagina(ruta);
  if (!doc) notFound();

  // La semblanza se marca como ProfilePage: le dice al buscador que esta URL
  // ES la página de la entidad "Perla Torres", no un artículo más sobre ella.
  const datos =
    ruta === 'perla-torres'
      ? grafoPerfil(doc, `/${ruta}`)
      : grafoArticulo(doc, `/${ruta}`);

  return (
    <>
      <Jsonld datos={datos} />
      <Articulo
        doc={doc}
        siguiente={SIGUIENTE[ruta]}
        invitacion={INVITACION[ruta]}
        extra={ruta === 'contacto' ? <FormularioContacto /> : undefined}
      />
    </>
  );
}
