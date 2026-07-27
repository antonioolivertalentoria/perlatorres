# Perla Torres — El ROI de la conciencia

Sitio satélite de marca personal. Objetivo doble: posicionar por sí mismo en
torno a la tesis **"El ROI de la conciencia"**, y desde esa autoridad propia
transferir señal a [talentoria.com](https://talentoria.com).

---

## Arrancar

```bash
npm install
npm run dev          # http://localhost:3000
npm run build        # build de producción
npm run auditoria    # revisión de SEO (con el sitio corriendo)
```

Node 20 o superior.

### Vista previa sin servidor

Genera una copia estática navegable con doble clic, sin necesidad de levantar
nada. Sirve para enseñarle el diseño a alguien que no tiene Node instalado.

```bash
npm run vistaprevia        # macOS / Linux
npm run vistaprevia:win    # Windows
```

Queda en `out/`. Abre `out/index.html`. Ojo: ahí cada clic recarga la página
entera y las direcciones se ven como archivos del disco — es el precio de
funcionar sin servidor. El sitio real no tiene ninguna de las dos cosas.

## Subir a GitHub

El repositorio ya está inicializado, con el primer commit hecho y el remoto
configurado apuntando a
`https://github.com/antonioolivertalentoria/perlatorres.git`.

```bash
git push -u origin main
```

Si es la primera vez que usas git en esta máquina, antes:

```bash
git config --global user.name "Antonio Oliver"
git config --global user.email "tu@correo.com"
```

## Publicar en Vercel

1. Entra a **vercel.com** y crea la cuenta con *Continue with GitHub*.
2. **Add New → Project → Import** el repositorio `perlatorres`. Detecta Next.js
   solo: no cambies nada de la configuración de build.
3. Antes de dar Deploy, abre **Environment Variables** y añade:

   | Variable | Valor |
   |---|---|
   | `NEXT_PUBLIC_SITE_URL` | `https://perlatorres.com` |

   De aquí salen las URLs canónicas, el sitemap, el robots.txt y los
   identificadores del schema. **Si queda mal, el SEO queda mal.** Pon el
   dominio definitivo aunque todavía no lo hayas conectado; mientras tanto
   Vercel te da igual una URL `.vercel.app` para revisar.
4. Deploy. Tarda dos o tres minutos.
5. Cuando tengas el dominio: **Settings → Domains → Add**, y sigue las
   instrucciones de DNS que te dé Vercel.
6. Da de alta el sitio en Google Search Console y envía `/sitemap.xml`.

A partir de ahí, cada `git push` a `main` redespliega solo.

---

## Cómo está hecho

| | |
|---|---|
| Framework | Next.js 15 (App Router, React 19) |
| Estilos | Tailwind CSS 3 |
| 3D | React Three Fiber 9 + three.js, shaders GLSL propios |
| Contenido | archivos `.mdx` con frontmatter |
| Tipografías | autoalojadas vía `next/font/local` |
| Despliegue | Vercel |

Las 19 páginas se generan estáticas en el build. No hay base de datos ni
servidor que mantener.

---

## Estructura

```
app/
  layout.tsx              Layout raíz, fuentes, metadatos y schema base
  page.tsx                Portada
  principios/
    page.tsx              Índice de los diez principios
    [slug]/page.tsx       Cada ensayo
  [...slug]/page.tsx      Pilares, semblanza, Talentoría, contacto
  sitemap.ts              Sitemap derivado del contenido
  robots.ts
components/
  Campo.tsx               El sistema de partículas (dos mundos → toroide)
  Hero.tsx                Portada: orquesta el scroll y monta el 3D en diferido
  Constelacion.tsx        Los diez principios como grafo navegable
  Articulo.tsx            Plantilla de las páginas de texto largo
  Prosa.tsx               Markdown + sustitución de los enlaces salientes
  Hueco.tsx               Marcadores de posición de las fotos de Perla
content/
  paginas/*.mdx           Pilares y páginas sueltas
  principios/*.mdx        Los diez ensayos
lib/
  site.ts                 Configuración central (empieza por aquí)
  contenido.ts            Lectura del contenido
  schema.ts               Datos estructurados
```

---

## Las tres reglas del proyecto

Si alguien más toca este repositorio, que sea respetando esto.

### 1. El 3D nunca contiene texto indexable

Todo el texto es HTML renderizado en servidor. El canvas es decoración con
`aria-hidden`. La constelación de principios son diez `<a href>` reales; el
grafo solo los coloca en el espacio. Si WebGL no arranca, el sitio funciona
y posiciona igual.

### 2. Los enlaces a Talentoría se declaran, no se escriben

Van en el frontmatter de cada `.mdx`, y en el cuerpo solo aparece un marcador:

```yaml
enlacesTalentoria:
  - url: "https://talentoria.com/headhunting/"
    anchor: "una búsqueda especializada para un puesto clave"
    marcador: "TALENTORIA_1"
```

Así se auditan de un vistazo. Las reglas, que no son negociables:

- **Máximo 2 por página**, y solo donde el texto lo pida de verdad.
- **Dentro del cuerpo**, nunca en el pie ni en la navegación. Cero sitewide.
- **Anchor distinto en cada página.** Repetir anchor exacto es la señal más
  fácil de detectar para un algoritmo antispam.

Hoy hay 13 enlaces con 13 anchors únicos. El script de auditoría lo verifica.

### 3. El presupuesto de rendimiento manda sobre el efecto

El canvas se carga con `dynamic()` y solo cuando el hero entra en pantalla.
El LCP es el `<h1>`, que es texto plano. Las fuentes son locales. Objetivo:
LCP < 2.5 s en móvil 4G. Si un efecto nuevo lo rompe, el efecto se va.

Con `prefers-reduced-motion` el 3D no se monta y las animaciones se apagan.

---

## Datos estructurados: la jugada de entidades

`lib/schema.ts` declara:

```
Person(Perla Torres) --founder--> Organization(Talentoría)
```

Esto vincula ambas entidades en el Knowledge Graph. Es transferencia de
autoridad **semántica**: no depende del PageRank de un enlace y no es
penalizable como un backlink manipulado.

**Falta cerrar el círculo.** Para que la señal sea bidireccional —que es
cuando de verdad pesa— talentoria.com debe declarar a Perla como `founder`
desde su propio schema, apuntando a la URL de este sitio.

---

## Añadir contenido

Crea un `.mdx` en `content/principios/` o `content/paginas/`. Aparece solo en
las rutas, en el sitemap y en la constelación. Frontmatter mínimo:

```yaml
---
title: "Título largo y descriptivo: puede llevar dos puntos"
slug: "slug-en-kebab-case"
description: "Meta description de 120 a 165 caracteres."
eyebrow: "ETIQUETA CORTA"
keywords: ["…"]
lecturaMin: 7
numero: 4          # solo en principios
resumen: "Una línea para el índice y la constelación."
enlacesTalentoria: []
faqs:
  - q: "¿Pregunta?"
    a: "Respuesta."
---
```

El `<title>` se recorta solo a 45 caracteres (corta por los dos puntos). Si
quieres controlarlo a mano, añade `tituloSeo: "…"`.

---

## Auditoría

`auditoria.mjs` (en la raíz del entregable) recorre el sitemap y verifica en
cada página: un solo H1, jerarquía de encabezados, largo de título y meta
description, canónica, tipos de schema, número de enlaces salientes y unicidad
de los anchors.

```bash
npm run build && npm start   # en una terminal
node auditoria.mjs           # en otra
```

Pásalo antes de cada despliegue.

---

## Pendientes

- [ ] **Confirmar el dominio** y fijar `NEXT_PUBLIC_SITE_URL`.
- [ ] **Fotos de Perla.** Los `<Hueco>` de `app/page.tsx` marcan qué toma va en
      cada sitio y en qué proporción. Se sustituyen por `next/image`.
- [ ] **Imagen Open Graph** (1200×630) en `app/opengraph-image.jpg`.
- [ ] **Perfiles sociales** en `SITE.autor.sameAs` (`lib/site.ts`). Cada uno
      refuerza la entidad.
- [ ] **Schema recíproco en talentoria.com** (ver arriba).
- [ ] **Sección de podcast**, cuando haya tres episodios grabados. Con
      transcripción completa: es el motor de long tail más barato que hay.
- [ ] **Migrar a Sanity** cuando Perla quiera publicar sin tocar código. El
      contrato de datos ya está aislado en `lib/contenido.ts`: solo hay que
      cambiar la fuente, no las páginas.
