import Link from 'next/link';

export default function NoEncontrado() {
  return (
    <div className="mx-auto flex min-h-[70vh] max-w-[1180px] flex-col justify-center px-[clamp(20px,5vw,64px)] pt-32">
      <p className="ojo mb-6">Error 404</p>
      <h1 className="max-w-[16ch] font-serif text-[clamp(36px,6vw,74px)] font-normal leading-[1.04] tracking-[-0.02em]">
        Esta página todavía no existe.
      </h1>
      <p className="mt-7 max-w-[52ch] text-[17px] leading-relaxed text-cuerpo">
        Puede que la hayamos movido, o que estés adelantándote a algo que aún no escribo.
      </p>
      <div className="mt-10 flex flex-wrap gap-8">
        <Link
          href="/"
          className="border-b border-senal/40 pb-1 font-mono text-[12px] uppercase tracking-[0.16em] text-claro no-underline transition-colors hover:border-luz hover:text-luz"
        >
          Ir al inicio
        </Link>
        <Link
          href="/conciencia-y-negocios"
          className="border-b border-senal/40 pb-1 font-mono text-[12px] uppercase tracking-[0.16em] text-claro no-underline transition-colors hover:border-luz hover:text-luz"
        >
          Leer el ensayo
        </Link>
      </div>
    </div>
  );
}
