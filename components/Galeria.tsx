import Image from 'next/image';

export type Foto = {
  src: string;
  ancho: number;
  alto: number;
  alt: string;
  etiqueta: string;
};

/**
 * Tira horizontal de fotos de archivo, cada una con su proporción real.
 * A propósito no se recortan: son fotos de eventos y teléfono, no una sesión
 * de estudio, y forzarlas a una caja cuadrada o 16:9 se ve peor que dejarlas
 * respirar. La altura es fija, el ancho lo pone la propia imagen.
 */
export default function Galeria({ fotos }: { fotos: Foto[] }) {
  return (
    <div className="mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-3">
      {fotos.map((f) => (
        <figure key={f.src} className="shrink-0 snap-start">
          <Image
            src={f.src}
            width={f.ancho}
            height={f.alto}
            alt={f.alt}
            className="h-64 w-auto rounded-sm border border-hielo/10 sm:h-80"
          />
          <figcaption className="mt-3 max-w-[26ch] font-mono text-[10.5px] uppercase leading-relaxed tracking-[0.16em] text-tenue">
            {f.etiqueta}
          </figcaption>
        </figure>
      ))}
    </div>
  );
}
