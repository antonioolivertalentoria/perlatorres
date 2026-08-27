'use client';

import { useMemo, useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

/**
 * ---------------------------------------------------------------------------
 * EL CAMPO
 * ---------------------------------------------------------------------------
 * La tesis del sitio, ejecutada en movimiento.
 *
 *   Estado A · dos mundos separados
 *     · izquierda: retícula ordenada, azul señal     → LA MATERIA
 *     · derecha:   nube orgánica, blanca             → LA CONCIENCIA
 *
 *   Estado B · un solo campo
 *     · ambos se funden en un toroide que gira sobre su eje.
 *       Toroide = campo cerrado: lo que sale por un lado vuelve por el otro.
 *
 * El progreso entre A y B lo manda el scroll (prop `avance`, 0→1).
 *
 * REGLA DE ORO: aquí no vive NADA indexable. Todo el texto del hero es HTML
 * renderizado en servidor, encima de este canvas. El buscador nunca depende
 * de que WebGL arranque.
 * ---------------------------------------------------------------------------
 */

const COLORES = {
  senal: new THREE.Color('#3E7BD1'),
  claro: new THREE.Color('#8FB8EE'),
  luz: new THREE.Color('#FFFFFF'),
  hielo: new THREE.Color('#BBD6FF'),
};

const vertexShader = /* glsl */ `
  uniform float uTime;
  uniform float uAvance;
  uniform float uSize;
  uniform float uPR;
  uniform vec3  uPuntero;

  attribute vec3  aInicio;
  attribute vec3  aToroide;
  attribute float aAzar;
  attribute float aLado;   // 0 = materia, 1 = conciencia

  varying float vAzar;
  varying float vLado;
  varying float vProf;

  vec3 deriva(vec3 p, float t, float amplitud) {
    return vec3(
      sin(p.y * 0.55 + t * 0.75),
      cos(p.x * 0.48 + t * 0.62),
      sin(p.x * 0.36 + p.y * 0.29 + t * 0.51)
    ) * amplitud;
  }

  void main() {
    vAzar = aAzar;
    vLado = aLado;

    float m = smoothstep(0.0, 1.0, uAvance);
    vec3 pos = mix(aInicio, aToroide, m);

    // El mundo interior respira más que el material. La retícula se mantiene
    // quieta a propósito: es la diferencia entre estructura y flujo.
    float amplitud = mix(aLado * 0.42 + 0.035, 0.16, m);
    pos += deriva(aInicio, uTime + aAzar * 6.283, amplitud);

    // Gira sobre Z para que el anillo siga viéndose de frente, y se inclina
    // en X para ganar profundidad. Rotar en Y lo dejaría de canto.
    float ang = uTime * 0.085 + m * 0.9;
    float c = cos(ang), s = sin(ang);
    vec3 giro = vec3(pos.x * c - pos.y * s, pos.x * s + pos.y * c, pos.z);

    float tx = 0.46 * m;
    float ct = cos(tx), st = sin(tx);
    vec3 rot = vec3(giro.x, giro.y * ct - giro.z * st, giro.y * st + giro.z * ct);
    pos = mix(pos, rot, m);

    // El puntero empuja el campo.
    vec2 d = pos.xy - uPuntero.xy;
    pos.xy += normalize(d + 0.0001) * smoothstep(3.4, 0.0, length(d)) * 1.35;

    vec4 mv = modelViewMatrix * vec4(pos, 1.0);
    vProf = -mv.z;
    gl_Position = projectionMatrix * mv;
    gl_PointSize = uSize * uPR * (0.6 + aAzar * 1.5) * (14.0 / max(-mv.z, 0.1));
  }
`;

// Sin declaración de precisión: three.js inyecta la suya y debe coincidir
// con la del vertex shader, o el programa no compila.
const fragmentShader = /* glsl */ `
  uniform float uAvance;
  uniform vec3  uSenal;
  uniform vec3  uClaro;
  uniform vec3  uLuz;
  uniform vec3  uHielo;

  varying float vAzar;
  varying float vLado;
  varying float vProf;

  void main() {
    vec2 c = gl_PointCoord - 0.5;
    float d = length(c);
    if (d > 0.5) discard;
    float a = smoothstep(0.5, 0.02, d);

    // Materia: azul saturado. Conciencia: blanco.
    vec3 base = mix(mix(uSenal, uClaro, vAzar * 0.55), uLuz, vLado);

    // Integrado: los dos, con destellos de hielo.
    vec3 unido = mix(uSenal, uLuz, 0.5 + 0.5 * sin(vAzar * 11.0));
    unido = mix(unido, uHielo, step(0.955, vAzar));

    vec3 col = mix(base, unido, smoothstep(0.15, 0.95, uAvance));
    float lejania = smoothstep(34.0, 5.0, vProf);

    gl_FragColor = vec4(col, a * (0.22 + 0.72 * vAzar) * lejania);
  }
`;

function Particulas({ avance }: { avance: React.MutableRefObject<number> }) {
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const { size, camera } = useThree();
  const movil = size.width < 780;

  const puntero = useRef(new THREE.Vector3(999, 999, 0));
  const punteroDestino = useRef(new THREE.Vector3(999, 999, 0));
  const suave = useRef(0);

  const { geometria, uniforms } = useMemo(() => {
    const CANT = movil ? 9000 : 26000;
    const DISPERSION = movil ? 0.52 : 1.0;
    const R = movil ? 3.5 : 6.0;
    const r = movil ? 0.95 : 1.5;

    const inicio = new Float32Array(CANT * 3);
    const toroide = new Float32Array(CANT * 3);
    const azar = new Float32Array(CANT);
    const lado = new Float32Array(CANT);

    const columnas = 46;
    const filas = Math.ceil(CANT / 2 / columnas);

    for (let i = 0; i < CANT; i++) {
      const i3 = i * 3;
      const interior = i % 2 === 1;
      lado[i] = interior ? 1 : 0;
      azar[i] = Math.random();

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
    }

    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.BufferAttribute(inicio.slice(), 3));
    g.setAttribute('aInicio', new THREE.BufferAttribute(inicio, 3));
    g.setAttribute('aToroide', new THREE.BufferAttribute(toroide, 3));
    g.setAttribute('aAzar', new THREE.BufferAttribute(azar, 1));
    g.setAttribute('aLado', new THREE.BufferAttribute(lado, 1));

    return {
      geometria: g,
      uniforms: {
        uTime: { value: 0 },
        uAvance: { value: 0 },
        uSize: { value: movil ? 2.7 : 2.3 },
        uPR: { value: Math.min(typeof window === 'undefined' ? 1 : window.devicePixelRatio, 1.8) },
        uPuntero: { value: new THREE.Vector3(999, 999, 0) },
        uSenal: { value: COLORES.senal },
        uClaro: { value: COLORES.claro },
        uLuz: { value: COLORES.luz },
        uHielo: { value: COLORES.hielo },
      },
    };
  }, [movil]);

  useFrame(({ clock, pointer }, delta) => {
    const mat = materialRef.current;
    if (!mat) return;

    const t = clock.getElapsedTime();
    mat.uniforms.uTime.value = t;

    // Suavizado independiente del framerate.
    const k = 1 - Math.pow(0.001, delta);
    suave.current += (avance.current - suave.current) * k;
    mat.uniforms.uAvance.value = suave.current;

    punteroDestino.current.set(pointer.x * 11.5, pointer.y * 6.6, 0);
    puntero.current.lerp(punteroDestino.current, k * 0.9);
    mat.uniforms.uPuntero.value.copy(puntero.current);

    camera.position.z = 15 + suave.current * 2.6;
    camera.position.y = Math.sin(t * 0.18) * 0.35;
    camera.lookAt(0, 0, 0);
  });

  return (
    <points geometry={geometria} frustumCulled={false}>
      <shaderMaterial
        ref={materialRef}
        uniforms={uniforms}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

export default function Campo({ avance }: { avance: React.MutableRefObject<number> }) {
  return (
    <Canvas
      camera={{ fov: 55, position: [0, 0, 15], near: 0.1, far: 120 }}
      gl={{ antialias: false, alpha: true, powerPreference: 'high-performance' }}
      dpr={[1, 1.8]}
      // Pausa el bucle cuando la pestaña no está visible: no quema batería.
      frameloop="always"
      style={{ width: '100%', height: '100%' }}
    >
      <Particulas avance={avance} />
    </Canvas>
  );
}
