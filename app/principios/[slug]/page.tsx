import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Articulo from '@/components/Articulo';
import Jsonld from '@/components/Jsonld';
import { principio, principios } from '@/lib/contenido';
import { grafoArticulo } from '@/lib/schema';

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return principios().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const doc = principio(slug);
  if (!doc) return {};

  return {
    title: doc.tituloSeo,
    description: doc.description,
    keywords: doc.keywords,
    alternates: { canonical: `/principios/${doc.slug}` },
    openGraph: {
      type: 'article',
      title: doc.title,
      description: doc.description,
      url: `/principios/${doc.slug}`,
    },
  };
}

export default async function PaginaPrincipio({ params }: Props) {
  const { slug } = await params;
  const doc = principio(slug);
  if (!doc) notFound();

  const todos = principios();
  const i = todos.findIndex((p) => p.slug === slug);
  const sig = todos[(i + 1) % todos.length];

  return (
    <>
      <Jsonld datos={grafoArticulo(doc, `/principios/${doc.slug}`)} />
      <Articulo
        doc={doc}
        migas={[{ href: '/principios', texto: 'Principios' }]}
        siguiente={{
          href: `/principios/${sig.slug}`,
          texto: sig.title.split(':')[0],
          etiqueta: `Principio ${String(sig.numero).padStart(2, '0')}`,
        }}
      />
    </>
  );
}
