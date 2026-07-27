/**
 * Hueco reservado para las fotografías de Perla.
 * Cuando lleguen las imágenes, se sustituye este componente por <Image>
 * conservando las mismas proporciones. El `nota` documenta la toma pedida.
 */
export default function Hueco({
  etiqueta,
  nota,
  formato,
  proporcion = 'aspect-[16/9]',
  className = '',
}: {
  etiqueta: string;
  nota: string;
  formato: string;
  proporcion?: string;
  className?: string;
}) {
  return (
    <div
      className={`relative flex flex-col items-center justify-center gap-2 overflow-hidden rounded-sm border border-dashed border-senal/35 bg-marino p-6 text-center ${proporcion} ${className}`}
      style={{
        backgroundImage:
          'repeating-linear-gradient(135deg, rgba(62,123,209,.05) 0 12px, transparent 12px 24px)',
      }}
    >
      <span
        className="pointer-events-none absolute inset-0"
        style={{ background: 'radial-gradient(circle at 50% 0%, rgba(255,255,255,.07), transparent 65%)' }}
      />
      <span className="relative font-mono text-[10.5px] uppercase tracking-[0.2em] text-senal">
        {etiqueta}
      </span>
      <span className="relative max-w-[30ch] text-[12.5px] leading-relaxed text-tenue">{nota}</span>
      <span className="relative font-mono text-[9.5px] tracking-[0.14em] text-tenue/60">{formato}</span>
    </div>
  );
}
