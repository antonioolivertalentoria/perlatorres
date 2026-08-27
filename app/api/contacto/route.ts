import { NextResponse } from 'next/server';
import { CONTACTO, SITE } from '@/lib/site';

export const runtime = 'nodejs';

/**
 * Recepción del formulario de contacto.
 *
 * Manda dos correos con Resend: el mensaje a Perla (con Reply-To de quien
 * escribe, para que pueda responder directo desde su bandeja) y el acuse a la
 * persona. Si el acuse falla, el mensaje a Perla ya salió: nunca se pierde un
 * contacto por un problema del correo automático.
 *
 * Variables de entorno en Vercel:
 *   RESEND_API_KEY   clave del panel de Resend
 *   CORREO_REMITENTE remitente verificado, p. ej. "Perla Torres <hola@perlatorres.com>"
 *   CORREO_DESTINO   opcional; por omisión, el correo público de contacto
 */

const API = 'https://api.resend.com/emails';
const LIMITES = { nombre: 120, correo: 160, mensaje: 5000 };

type Cuerpo = {
  nombre?: string;
  correo?: string;
  tipo?: string;
  mensaje?: string;
  /** Trampa para robots: si viene llena, se descarta en silencio. */
  sitioWeb?: string;
};

const limpiar = (v: unknown, max: number) => String(v ?? '').trim().slice(0, max);
const correoValido = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v);
const escapar = (v: string) =>
  v.replace(/[&<>"']/g, (c) =>
    ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c] as string,
  );

async function enviar(payload: Record<string, unknown>, clave: string) {
  const r = await fetch(API, {
    method: 'POST',
    headers: { Authorization: `Bearer ${clave}`, 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!r.ok) throw new Error(`Resend ${r.status}: ${await r.text()}`);
}

export async function POST(peticion: Request) {
  let datos: Cuerpo;
  try {
    datos = await peticion.json();
  } catch {
    return NextResponse.json({ error: 'Petición mal formada.' }, { status: 400 });
  }

  if (datos.sitioWeb) return NextResponse.json({ ok: true });

  const nombre = limpiar(datos.nombre, LIMITES.nombre);
  const correo = limpiar(datos.correo, LIMITES.correo);
  const mensaje = limpiar(datos.mensaje, LIMITES.mensaje);
  const tipo = datos.tipo === 'empresa' ? 'Tema de empresa' : 'Tema personal';

  if (!nombre || !mensaje || !correoValido(correo)) {
    return NextResponse.json(
      { error: 'Faltan datos: revisa tu nombre, tu correo y el mensaje.' },
      { status: 422 },
    );
  }

  const clave = process.env.RESEND_API_KEY;
  const remitente = process.env.CORREO_REMITENTE;
  const destino = process.env.CORREO_DESTINO ?? CONTACTO.correo;

  if (!clave || !remitente) {
    console.error('Falta configurar RESEND_API_KEY o CORREO_REMITENTE.');
    return NextResponse.json(
      { error: 'El formulario todavía no está conectado. Escríbeme a ' + CONTACTO.correo },
      { status: 503 },
    );
  }

  try {
    await enviar(
      {
        from: remitente,
        to: [destino],
        reply_to: correo,
        subject: `Nuevo mensaje de ${nombre} — ${tipo}`,
        text: `${nombre} <${correo}>\n${tipo}\n\n${mensaje}\n`,
      },
      clave,
    );
  } catch (e) {
    console.error('No se pudo enviar el mensaje:', e);
    return NextResponse.json(
      { error: 'No se pudo enviar. Escríbeme directo a ' + CONTACTO.correo },
      { status: 502 },
    );
  }

  try {
    await enviar(
      {
        from: remitente,
        to: [correo],
        subject: 'Recibí tu mensaje',
        text:
          `Hola ${nombre}:\n\n` +
          'Recibí tu mensaje. Te contesto personalmente en menos de 48 horas.\n\n' +
          'Este acuse es automático; no hace falta que respondas.\n\n' +
          `${SITE.autor.nombre}\n${SITE.autor.puesto}\n`,
        html:
          `<p>Hola ${escapar(nombre)}:</p>` +
          '<p>Recibí tu mensaje. Te contesto personalmente en menos de 48 horas.</p>' +
          '<p style="color:#667">Este acuse es automático; no hace falta que respondas.</p>' +
          `<p>${SITE.autor.nombre}<br>${SITE.autor.puesto}</p>`,
      },
      clave,
    );
  } catch (e) {
    console.error('El mensaje llegó, pero falló el acuse:', e);
  }

  return NextResponse.json({ ok: true });
}
