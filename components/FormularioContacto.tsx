'use client';

import { useState } from 'react';
import { CONTACTO } from '@/lib/site';

type Estado = 'listo' | 'enviando' | 'enviado' | 'error';

const campo =
  'w-full rounded-sm border border-luz/15 bg-abismo/60 px-4 py-3 text-[16px] text-luz outline-none transition-colors placeholder:text-tenue/60 focus:border-senal';
const etiqueta = 'mb-2 block font-mono text-[11px] uppercase tracking-[0.16em] text-tenue';

/**
 * Cuatro campos y nada más: cada campo extra baja los envíos. El correo
 * visible y LinkedIn quedan al lado para quien no llena formularios.
 */
export default function FormularioContacto() {
  const [estado, setEstado] = useState<Estado>('listo');
  const [aviso, setAviso] = useState('');

  async function enviar(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const datos = Object.fromEntries(new FormData(form));
    setEstado('enviando');
    setAviso('');

    try {
      const r = await fetch('/api/contacto', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(datos),
      });
      const cuerpo = await r.json().catch(() => ({}));
      if (!r.ok) throw new Error(cuerpo.error ?? 'No se pudo enviar el mensaje.');
      form.reset();
      setEstado('enviado');
    } catch (err) {
      setEstado('error');
      setAviso(err instanceof Error ? err.message : 'No se pudo enviar el mensaje.');
    }
  }

  return (
    <section id="escribeme" className="mt-20 scroll-mt-28">
      <p className="ojo mb-6">Escríbeme</p>

      <div className="grid gap-x-[clamp(30px,5vw,70px)] gap-y-12 md:grid-cols-[1.2fr_0.8fr]">
        <form onSubmit={enviar} className="max-w-[52ch]" noValidate>
          {/* Trampa para robots; invisible y fuera del foco del teclado. */}
          <div className="absolute h-0 w-0 overflow-hidden" aria-hidden="true">
            <label htmlFor="sitioWeb">No llenar</label>
            <input id="sitioWeb" name="sitioWeb" type="text" tabIndex={-1} autoComplete="off" />
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            <div>
              <label className={etiqueta} htmlFor="nombre">
                Nombre
              </label>
              <input id="nombre" name="nombre" required maxLength={120} className={campo} />
            </div>
            <div>
              <label className={etiqueta} htmlFor="correo">
                Correo
              </label>
              <input
                id="correo"
                name="correo"
                type="email"
                required
                maxLength={160}
                autoComplete="email"
                className={campo}
              />
            </div>
          </div>

          <fieldset className="mt-7">
            <legend className={etiqueta}>¿De qué se trata?</legend>
            <div className="flex flex-wrap gap-3">
              {[
                ['personal', 'Es un tema personal'],
                ['empresa', 'Es un tema de empresa'],
              ].map(([valor, texto], i) => (
                <label
                  key={valor}
                  className="cursor-pointer rounded-sm border border-luz/15 px-4 py-2.5 text-[15px] text-cuerpo transition-colors has-[:checked]:border-senal has-[:checked]:bg-senal/15 has-[:checked]:text-luz"
                >
                  <input
                    type="radio"
                    name="tipo"
                    value={valor}
                    defaultChecked={i === 0}
                    className="sr-only"
                  />
                  {texto}
                </label>
              ))}
            </div>
          </fieldset>

          <div className="mt-7">
            <label className={etiqueta} htmlFor="mensaje">
              Cuéntame qué está pasando
            </label>
            <textarea
              id="mensaje"
              name="mensaje"
              required
              rows={6}
              maxLength={5000}
              className={`${campo} resize-y`}
            />
          </div>

          <button
            type="submit"
            disabled={estado === 'enviando'}
            className="mt-8 rounded-sm border border-senal/60 bg-senal/15 px-7 py-3.5 font-mono text-[12px] uppercase tracking-[0.16em] text-luz transition-colors hover:border-senal hover:bg-senal/30 disabled:opacity-50"
          >
            {estado === 'enviando' ? 'Enviando…' : 'Enviar mensaje'}
          </button>

          <p aria-live="polite" className="mt-5 text-[15px] leading-relaxed">
            {estado === 'enviado' && (
              <span className="text-hielo">
                Listo, tu mensaje llegó. Te mandé un acuse por correo y Perla te contesta
                personalmente en menos de 48 horas.
              </span>
            )}
            {estado === 'error' && <span className="text-[#F0A5A5]">{aviso}</span>}
          </p>
        </form>

        <div className="md:border-l md:border-luz/10 md:pl-[clamp(24px,3vw,44px)]">
          <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-tenue">
            O directo, sin formulario
          </p>
          <a
            href={`mailto:${CONTACTO.correo}`}
            className="mt-4 block break-words font-serif text-[clamp(19px,2vw,24px)] leading-snug text-luz no-underline transition-colors hover:text-claro"
          >
            {CONTACTO.correo}
          </a>
          <a
            href={CONTACTO.linkedin}
            target="_blank"
            rel="noopener"
            className="mt-6 inline-flex items-baseline gap-2 border-b border-senal/40 pb-1 font-mono text-[12px] uppercase tracking-[0.14em] text-claro no-underline transition-colors hover:border-luz hover:text-luz"
          >
            LinkedIn
            <span aria-hidden="true">↗</span>
          </a>
          <p className="mt-8 max-w-[34ch] text-[15px] leading-[1.75] text-tenue">
            Contesto todos los mensajes, incluso cuando la respuesta honesta es que no soy la
            persona indicada.
          </p>
        </div>
      </div>
    </section>
  );
}
