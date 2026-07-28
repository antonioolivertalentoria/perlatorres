'use client';

import { useEffect, useRef } from 'react';

/**
 * ---------------------------------------------------------------------------
 * EL CAMPO — VERSIÓN LIGERA
 * ---------------------------------------------------------------------------
 * Lo mismo que `Campo`, pero en canvas 2D, para cuando WebGL no arranca:
 * aceleración por hardware apagada, GPU en lista negra, equipos viejos,
 * navegadores dentro de apps. Sin esto la portada se queda muerta y el sitio
 * pierde justo lo que lo explica.
 *
 * Misma coreografía: dos mundos separados que se funden en un toroide, con el
 * avance mandado por el scroll y el puntero empujando el campo. Menos puntos
 * (la CPU no es la tarjeta) y proyección hecha a mano, pero la lectura es la
 * misma.
 *
 * OJO CON EL COSTE: si no hay WebGL, casi siempre tampoco hay aceleración por
 * hardware, así que este canvas también se compone por software. Por eso el
 * lienzo va a DPR 1, el bucle se limita a 30 fps y la cantidad de puntos se
 * ajusta sola midiendo cuánto tarda cada cuadro. Con los ajustes de la versión
 * WebGL (26.000 puntos, DPR 1.8) esto congela el hilo principal.
 *
 * Igual que en la versión WebGL: aquí no vive NADA indexable.
 * ---------------------------------------------------------------------------
 */

const FOV = 55;

// 30 fps basta para un fondo y deja respirar al hilo principal.
const MS_POR_CUADRO = 1000 / 30;

// Suelo de puntos: por debajo se nota el hueco, así que si ni con esto alcanza
// más vale quedarse quieto que ir a tirones.
const MINIMO = 220;

// Rampa señal → claro → luz. Los puntos se pintan con sprites pre-teñidos
// tomados de esta rampa: teñir en 2D por punto y por cuadro sale carísimo.
const RAMPA: [number, number, number][] = [
  [0x3e, 0x7b, 0xd1],
  [0x8f, 0xb8, 0xee],
  [0xff, 0xff, 0xff],
];
const HIELO: [number, number, number] = [0xbb, 0xd6, 0xff];
const PASOS = 32;

function enRampa(t: number): [number, number, number] {
  const x = Math.min(Math.max(t, 0), 1) * (RAMPA.length - 1);
  const i = Math.min(Math.floor(x), RAMPA.length - 2);
  const f = x - i;
  const a = RAMPA[i];
  const b = RAMPA[i + 1];
  return [a[0] + (b[0] - a[0]) * f, a[1] + (b[1] - a[1]) * f, a[2] + (b[2] - a[2]) * f];
}

/** Punto redondo con caída suave. Se dibuja escalado, así que basta uno por tinte. */
function hacerSprite([r, g, b]: [number, number, number]): HTMLCanvasElement {
  const L = 32;
  const c = document.createElement('canvas');
  c.width = c.height = L;
  const x = c.getContext('2d')!;
  const grad = x.createRadialGradient(L / 2, L / 2, 0, L / 2, L / 2, L / 2);
  const rgb = `${Math.round(r)},${Math.round(g)},${Math.round(b)}`;
  grad.addColorStop(0, `rgba(${rgb},1)`);
  grad.addColorStop(0.35, `rgba(${rgb},0.55)`);
  grad.addColorStop(1, `rgba(${rgb},0)`);
  x.fillStyle = grad;
  x.fillRect(0, 0, L, L);
  return c;
}

function suavizar(borde0: number, borde1: number, x: number) {
  const t = Math.min(Math.max((x - borde0) / (borde1 - borde0), 0), 1);
  return t * t * (3 - 2 * t);
}

export default function CampoLigero({ avance }: { avance: React.MutableRefObject<number> }) {
  const lienzo = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const cv = lienzo.current;
    if (!cv) return;
    const ctx = cv.getContext('2d', { alpha: true });
    if (!ctx) return;

    const sprites = Array.from({ length: PASOS + 1 }, (_, i) =>
      hacerSprite(i === PASOS ? HIELO : enRampa(i / (PASOS - 1))),
    );

    let ancho = 0;
    let alto = 0;
    let pr = 1;
    let movil = false;

    // Nubes de puntos. Se rehacen si el ancho cruza el umbral móvil.
    // `activos` es cuántos se dibujan de verdad: baja solo si el equipo sufre.
    // El orden va barajado, así que dibujar un prefijo adelgaza la retícula y
    // la nube por igual en vez de cortarlas por la mitad.
    let CANT = 0;
    let activos = 0;
    let inicio = new Float32Array(0);
    let toroide = new Float32Array(0);
    let azar = new Float32Array(0);
    let lado = new Float32Array(0);
    let tBase = new Float32Array(0);
    let tUnido = new Float32Array(0);

    function sembrar() {
      // Bastantes menos que en WebGL: cada punto es un drawImage compuesto por
      // software. Es el techo; el bucle baja desde aquí si hace falta.
      CANT = movil ? 480 : 1100;
      activos = CANT;
      inicio = new Float32Array(CANT * 3);
      toroide = new Float32Array(CANT * 3);
      azar = new Float32Array(CANT);
      lado = new Float32Array(CANT);
      tBase = new Float32Array(CANT);
      tUnido = new Float32Array(CANT);

      const DISPERSION = movil ? 0.52 : 1.0;
      const R = movil ? 3.5 : 6.0;
      const r = movil ? 0.95 : 1.5;
      const columnas = 26;
      const filas = Math.ceil(CANT / 2 / columnas);

      for (let i = 0; i < CANT; i++) {
        const i3 = i * 3;
        const interior = i % 2 === 1;
        lado[i] = interior ? 1 : 0;
        const az = Math.random();
        azar[i] = az;

        if (!interior) {
          // MATERIA — retícula ordenada, a la izquierda.
          const k = i >> 1;
          const cx = k % columnas;
          const cy = Math.floor(k / columnas) % filas;
          inicio[i3] = (-9.6 + (cx / (columnas - 1)) * 7.0) * DISPERSION;
          inicio[i3 + 1] = 4.6 - (cy / (filas - 1)) * 9.2;
          inicio[i3 + 2] = (Math.random() - 0.5) * 0.7;
        } else {
          // CONCIENCIA — nube orgánica, a la derecha.
          const th = Math.random() * Math.PI * 2;
          const ph = Math.acos(2 * Math.random() - 1);
          const rad = 3.5 * Math.cbrt(Math.random()) + Math.random() * 1.4;
          inicio[i3] = 5.9 * DISPERSION + rad * Math.sin(ph) * Math.cos(th) * DISPERSION;
          inicio[i3 + 1] = rad * Math.sin(ph) * Math.sin(th) * 0.95;
          inicio[i3 + 2] = rad * Math.cos(ph) * 0.8;
        }

        // EL TOROIDE — el campo unificado.
        const u = Math.random() * Math.PI * 2;
        const v = Math.random() * Math.PI * 2;
        const rr = r * (0.82 + Math.random() * 0.3);
        toroide[i3] = (R + rr * Math.cos(v)) * Math.cos(u);
        toroide[i3 + 1] = (R + rr * Math.cos(v)) * Math.sin(u);
        toroide[i3 + 2] = rr * Math.sin(v);

        // Posición en la rampa, separada como en el shader: la materia va del
        // azul señal al claro; la conciencia es blanca; el campo unido mezcla.
        tBase[i] = interior ? 1 : az * 0.275;
        tUnido[i] = 0.5 + 0.5 * Math.sin(az * 11);
      }

      // Barajado (Fisher–Yates). Sin esto, recortar a los primeros `activos`
      // dejaría la retícula cortada por arriba y descompensados los dos mundos.
      for (let i = CANT - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        for (let c = 0; c < 3; c++) {
          const a = i * 3 + c;
          const b = j * 3 + c;
          let tmp = inicio[a];
          inicio[a] = inicio[b];
          inicio[b] = tmp;
          tmp = toroide[a];
          toroide[a] = toroide[b];
          toroide[b] = tmp;
        }
        for (const arr of [azar, lado, tBase, tUnido]) {
          const tmp = arr[i];
          arr[i] = arr[j];
          arr[j] = tmp;
        }
      }
    }

    function medir() {
      const rect = cv!.getBoundingClientRect();
      const nuevoMovil = rect.width < 780;
      ancho = rect.width;
      alto = rect.height;
      // DPR 1 a propósito: aquí no hay GPU que rellene píxeles gratis, y a 1.8
      // el lienzo se cuadruplica. Los puntos son manchas suaves, así que el
      // dentado no se nota.
      pr = 1;
      cv!.width = Math.max(1, Math.round(ancho * pr));
      cv!.height = Math.max(1, Math.round(alto * pr));
      if (nuevoMovil !== movil || CANT === 0) {
        movil = nuevoMovil;
        sembrar();
      }
    }

    medir();
    const ro = new ResizeObserver(medir);
    ro.observe(cv);

    // Puntero en el mismo rango que el `pointer` de r3f: -1..1 sobre el lienzo.
    const puntero = { x: 999, y: 999 };
    const destino = { x: 999, y: 999 };
    const alMover = (e: PointerEvent) => {
      const rect = cv.getBoundingClientRect();
      destino.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      destino.y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
    };
    const alSalir = () => {
      destino.x = 999;
      destino.y = 999;
    };
    window.addEventListener('pointermove', alMover, { passive: true });
    window.addEventListener('pointerleave', alSalir, { passive: true });

    let raf = 0;
    let previo = performance.now();
    let ultimoPintado = previo;
    let suave = 0;
    const arranque = previo;

    // Termómetro para el ajuste automático.
    let muestras = 0;
    let acumulado = 0;

    function cuadro(ahora: number) {
      raf = requestAnimationFrame(cuadro);

      // La pestaña oculta no gasta batería.
      if (document.hidden) {
        previo = ahora;
        ultimoPintado = ahora;
        return;
      }

      // Tope de 30 fps. Sin esto, en software el bucle se come el hilo y la
      // página deja de responder al scroll.
      if (ahora - ultimoPintado < MS_POR_CUADRO - 1) return;
      ultimoPintado = ahora;

      const delta = Math.min((ahora - previo) / 1000, 0.05);
      previo = ahora;

      const inicioCuadro = performance.now();
      const t = (ahora - arranque) / 1000;
      const k = 1 - Math.pow(0.001, delta);
      suave += (avance.current - suave) * k;
      const m = suavizar(0, 1, suave);

      puntero.x += (destino.x - puntero.x) * k * 0.9;
      puntero.y += (destino.y - puntero.y) * k * 0.9;
      const pux = puntero.x * 11.5;
      const puy = puntero.y * 6.6;

      const camZ = 15 + suave * 2.6;
      const camY = Math.sin(t * 0.18) * 0.35;
      const f = alto / 2 / Math.tan(((FOV / 2) * Math.PI) / 180);
      const cx = ancho / 2;
      const cy = alto / 2;

      const ang = t * 0.085 + m * 0.9;
      const cA = Math.cos(ang);
      const sA = Math.sin(ang);
      const tx = 0.46 * m;
      const cT = Math.cos(tx);
      const sT = Math.sin(tx);
      const mezclaColor = suavizar(0.15, 0.95, m);
      const amplitudUnida = 0.16;

      ctx!.setTransform(pr, 0, 0, pr, 0, 0);
      ctx!.clearRect(0, 0, ancho, alto);
      ctx!.globalCompositeOperation = 'lighter';

      for (let i = 0; i < activos; i++) {
        const i3 = i * 3;
        const az = azar[i];

        // Interpolación mundos → toroide.
        let px = inicio[i3] + (toroide[i3] - inicio[i3]) * m;
        let py = inicio[i3 + 1] + (toroide[i3 + 1] - inicio[i3 + 1]) * m;
        let pz = inicio[i3 + 2] + (toroide[i3 + 2] - inicio[i3 + 2]) * m;

        // El mundo interior respira más que el material.
        const ampSep = lado[i] * 0.42 + 0.035;
        const amp = ampSep + (amplitudUnida - ampSep) * m;
        const th = t + az * 6.283;
        px += Math.sin(inicio[i3 + 1] * 0.55 + th * 0.75) * amp;
        py += Math.cos(inicio[i3] * 0.48 + th * 0.62) * amp;
        pz += Math.sin(inicio[i3] * 0.36 + inicio[i3 + 1] * 0.29 + th * 0.51) * amp;

        // Giro sobre Z y, mezclada por el avance, la inclinación en X.
        if (m > 0) {
          const gx = px * cA - py * sA;
          const gy = px * sA + py * cA;
          const rx = gx;
          const ry = gy * cT - pz * sT;
          const rz = gy * sT + pz * cT;
          px += (rx - px) * m;
          py += (ry - py) * m;
          pz += (rz - pz) * m;
        }

        // El puntero empuja el campo.
        const dx = px - pux;
        const dy = py - puy;
        const dist = Math.hypot(dx, dy);
        if (dist < 3.4) {
          const empuje = suavizar(0, 1, 1 - dist / 3.4) * 1.35;
          px += (dx / (dist + 0.0001)) * empuje;
          py += (dy / (dist + 0.0001)) * empuje;
        }

        // Proyección.
        const d = camZ - pz;
        if (d < 0.1) continue;
        const sx = cx + (px * f) / d;
        const sy = cy - ((py - camY) * f) / d;
        if (sx < -40 || sx > ancho + 40 || sy < -40 || sy > alto + 40) continue;

        const lejania = suavizar(0, 1, (34 - d) / 29);
        const alfa = (0.22 + 0.72 * az) * lejania;
        if (alfa <= 0.01) continue;

        const radio = (movil ? 2.7 : 2.3) * (0.6 + az * 1.5) * (14 / d);

        const tt = tBase[i] + (tUnido[i] - tBase[i]) * mezclaColor;
        const idx =
          az > 0.955 && mezclaColor > 0.5
            ? PASOS
            : Math.min(PASOS - 1, Math.max(0, Math.round(tt * (PASOS - 1))));

        ctx!.globalAlpha = alfa;
        ctx!.drawImage(sprites[idx], sx - radio, sy - radio, radio * 2, radio * 2);
      }

      ctx!.globalAlpha = 1;
      ctx!.globalCompositeOperation = 'source-over';

      // Ajuste automático: mide lo que cuesta dibujar y busca el punto donde
      // el cuadro cabe holgado en el presupuesto de 33 ms. Un equipo sin GPU
      // acaba en unos cientos de puntos; uno decente se queda arriba.
      acumulado += performance.now() - inicioCuadro;
      if (++muestras >= 24) {
        const medio = acumulado / muestras;
        muestras = 0;
        acumulado = 0;
        if (medio > 14 && activos > MINIMO) {
          activos = Math.max(MINIMO, Math.floor(activos * 0.7));
        } else if (medio < 6 && activos < CANT) {
          activos = Math.min(CANT, Math.floor(activos * 1.25) + 20);
        }
      }
    }

    raf = requestAnimationFrame(cuadro);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      window.removeEventListener('pointermove', alMover);
      window.removeEventListener('pointerleave', alSalir);
    };
  }, [avance]);

  return <canvas ref={lienzo} className="h-full w-full" />;
}
