import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Articulo from '@/components/Articulo';
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
  'el-roi-de-la-conciencia': {
    href: '/principios',
    texto: 'Los diez principios, uno por uno',
    etiqueta: 'Continúa',
  },
  'liderazgo-consciente': {
    href: '/liderazgo-consciente/para-empresas',
    texto: 'Qué implica esto dentro de una empresa',
    etiqueta: 'Continúa',
  },
  'liderazgo-consciente/para-empresas': {
    href: '/liderazgo-consciente/cultura-organizacional',
    texto: 'Cultura organizacional consciente',
    etiqueta: 'Continúa',
  },
  'liderazgo-consciente/cultura-organizacional': {
    href: '/contacto',
    texto: 'Hablemos de tu equipo',
    etiqueta: 'Continúa',
  },
  'perla-torres': {
    href: '/talentoria',
    texto: 'Por qué fundé Talentoría',
    etiqueta: 'Continúa',
  },
  talentoria: {
    href: '/el-roi-de-la-conciencia',
    texto: 'El ROI de la conciencia',
    etiqueta: 'Continúa',
  },
};

const MIGAS: Record<string, { href: string; texto: string }[]> = {
  'liderazgo-consciente/para-empresas': [
    { href: '/liderazgo-consciente', texto: 'Liderazgo consciente' },
  ],
  'liderazgo-consciente/cultura-organizacional': [
    { href: '/liderazgo-consciente', texto: 'Liderazgo consciente' },
  ],
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
      <Articulo doc={doc} migas={MIGAS[ruta]} siguiente={SIGUIENTE[ruta]} />
    </>
  );
}
