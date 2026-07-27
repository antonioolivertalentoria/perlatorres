import Link from 'next/link';
import Hero from '@/components/Hero';
import Constelacion from '@/components/Constelacion';
import Aparece from '@/components/Aparece';
import Medidor from '@/components/Medidor';
import Hueco from '@/components/Hueco';
import { principios, pagina } from '@/lib/contenido';

export default function Inicio() {
  const nodos = principios().map((p) => ({
    numero: p.numero ?? 0,
    titulo: p.title.split(':')[0].split('.')[0].trim(),
    slug: p.slug,
    resumen: p.resumen,
  }));

  const semblanza = pagina('perla-torres');

  return (
    <>
      <Hero />

      {/* ================= LA TESIS ================= */}
      <section className="relative py-[clamp(90px,13vh,160px)]">
        <div className="mx-auto max-w-[1180px] px-[clamp(20px,5vw,64px)]">
          <div className="max-w-[760px]">
            <Aparece>
              <p className="ojo mb-7">La tesis</p>
            </Aparece>

            <Aparece>
              <blockquote className="relative border-l-2 border-senal pl-[clamp(18px,3vw,42px)] font-serif text-[clamp(28px,4.4vw,56px)] leading-[1.16] tracking-[-0.015em] text-luz">
                Hoy sé que no debo elegir entre ser <em className="italic text-claro">una chamana</em> o{' '}
                <em className="italic text-claro">una empresaria</em>. La vida se trata de posibilidades.
              </blockquote>
              <p className="mt-8 pl-[clamp(18px,3vw,42px)] font-mono text-[11.5px] uppercase tracking-[0.2em] text-tenue">
                Semblanza personal · Perla Torres
              </p>
            </Aparece>
          </div>

          <div className="mt-[clamp(70px,10vh,120px)] max-w-[760px]">
            <Aparece>
              <h2 className="font-serif text-[clamp(34px,5.2vw,64px)] font-normal leading-[1.08] tracking-[-0.015em]">
                Dos mundos que la cultura empresarial mantiene separados.
              </h2>
            </Aparece>
            <Aparece>
              <p className="mt-7 text-[clamp(18px,1.6vw,22px)] leading-[1.6] text-[#E6EEFA]">
                Durante años me daba vergüenza hablar de espiritualidad porque pensaba que
                perdería credibilidad como empresaria. Hoy entiendo que esconder esa parte
                tampoco me permitía conectar tan profundamente.
              </p>
              <p className="mt-5 max-w-medida text-[17px] leading-[1.75] text-cuerpo">
                Este sitio existe para demostrar lo contrario de lo que me enseñaron: que la
                conciencia no le resta seriedad a un negocio, se la da. Sin recetas mágicas y
                sin humo — con método, evidencia y veinte años de campo.
              </p>
            </Aparece>
          </div>

          {/* --- Lo que se mide / lo que lo sostiene --- */}
          <Aparece className="mt-14">
            <div className="grid gap-px overflow-hidden rounded-sm border border-senal/15 bg-senal/15 md:grid-cols-2">
              <div className="bg-marino p-[clamp(28px,4vw,52px)]">
                <h3 className="mb-5 font-mono text-[11px] uppercase tracking-[0.22em] text-senal">
                  Lo que se mide
                </h3>
                <ul className="text-[15px] text-cuerpo">
                  {[
                    'Rotación, clima, productividad',
                    'Flujo de efectivo y nómina',
                    'Finanzas, marketing, ventas',
                    'Decisiones sin toda la información',
                    'Punto de equilibrio',
                  ].map((t) => (
                    <li key={t} className="border-b border-luz/[0.07] py-3 last:border-0">
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-marino p-[clamp(28px,4vw,52px)]">
                <h3 className="mb-5 font-mono text-[11px] uppercase tracking-[0.22em] text-luz/70">
                  Lo que lo sostiene
                </h3>
                <ul className="text-[15px] text-cuerpo">
                  {[
                    'Autoconocimiento e inteligencia emocional',
                    'Congruencia entre lo que pides y lo que das',
                    'Capacidad de hacer la pregunta correcta',
                    'Estómago para lo que no sabes que viene',
                    'Fe de que todo siempre sale bien',
                  ].map((t) => (
                    <li key={t} className="border-b border-luz/[0.07] py-3 last:border-0">
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Aparece>

          <Aparece className="mt-12">
            <Link
              href="/el-roi-de-la-conciencia"
              className="group inline-flex items-baseline gap-3 border-b border-senal/40 pb-1 font-mono text-[12px] uppercase tracking-[0.16em] text-claro no-underline transition-colors hover:border-luz hover:text-luz"
            >
              Leer la tesis completa
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </Link>
          </Aparece>
        </div>
      </section>

      {/* ================= PRINCIPIOS ================= */}
      <section className="relative py-[clamp(90px,13vh,160px)]">
        <div className="mx-auto max-w-[1180px] px-[clamp(20px,5vw,64px)]">
          <div className="max-w-[760px]">
            <Aparece>
              <p className="ojo mb-7">La matriz</p>
              <h2 className="font-serif text-[clamp(34px,5.2vw,64px)] font-normal leading-[1.08] tracking-[-0.015em]">
                Diez principios.
                <br />
                Diez ensayos.
              </h2>
              <p className="mt-7 text-[clamp(18px,1.6vw,22px)] leading-[1.6] text-[#E6EEFA]">
                Cada nodo es una idea que llevo veinte años probando en campo. Cada uno se
                convierte en una página con vida propia, y todas juntas construyen la
                autoridad del sitio.
              </p>
            </Aparece>
          </div>

          <Constelacion nodos={nodos} />

          <Aparece className="mt-8 hidden lg:block">
            <p className="border-l-2 border-hielo pl-4 font-mono text-[11px] leading-[1.9] tracking-[0.06em] text-tenue">
              <span className="text-hielo">Nota de arquitectura.</span>
              <br />
              Cada nodo es un enlace real en el HTML, no un objeto dentro de un canvas.
              <br />
              El buscador ve diez enlaces internos limpios. El visitante ve una constelación.
            </p>
          </Aparece>
        </div>
      </section>

      {/* ================= SEMBLANZA ================= */}
      <section className="relative py-[clamp(90px,13vh,160px)]">
        <div className="mx-auto max-w-[1180px] px-[clamp(20px,5vw,64px)]">
          <div className="grid items-center gap-[clamp(24px,4vw,64px)] md:grid-cols-[0.85fr_1.15fr]">
            <Hueco
              etiqueta="Foto 01 — Portada"
              nota="Retrato vertical, mirada a cámara, fondo oscuro limpio. Es la foto del sitio."
              formato="4:5 · mín. 2400 px"
              proporcion="aspect-[4/5]"
            />
            <div>
              <Aparece>
                <p className="ojo mb-7">Quién</p>
                <h2 className="font-serif text-[clamp(34px,5.2vw,64px)] font-normal leading-[1.08] tracking-[-0.015em]">
                  No sabía cómo,
                  <br />
                  pero sabía con quién.
                </h2>
              </Aparece>
              <Aparece>
                <div className="mt-7 max-w-medida space-y-5 text-[17px] leading-[1.75] text-cuerpo">
                  <p>
                    Desde joven intuía que mi profesión tenía que ver con trabajar con
                    personas. Para elegir, empecé a entrevistar a quienes ya se dedicaban a eso
                    — y descubrí dos cosas: que la gente está dispuesta a compartir, y que
                    entrar al mundo de alguien con un objetivo específico es revelador.
                  </p>
                  <p>
                    Siempre he considerado tremendamente violento que un adolescente deba
                    elegir a qué dedicará su vida cuando ni siquiera sabe quién es.
                  </p>
                  <p>
                    Elegí psicología, siempre hacia las empresas. Veinte años después, el
                    propósito no ha cambiado: entender a quien tengo enfrente y hacer las
                    preguntas correctas.
                  </p>
                </div>
                <Link
                  href="/perla-torres"
                  className="group mt-9 inline-flex items-baseline gap-3 border-b border-senal/40 pb-1 font-mono text-[12px] uppercase tracking-[0.16em] text-claro no-underline transition-colors hover:border-luz hover:text-luz"
                >
                  La trayectoria completa
                  <span className="transition-transform group-hover:translate-x-1">→</span>
                </Link>
              </Aparece>
            </div>
          </div>

          {/* Línea de tiempo, alimentada por el frontmatter de la semblanza. */}
          {semblanza?.hitos && (
            <div className="relative mt-20 pl-[clamp(22px,4vw,54px)]">
              <span
                className="absolute inset-y-2 left-0 w-px bg-gradient-to-b from-senal via-claro to-transparent"
                aria-hidden="true"
              />
              {semblanza.hitos.map((h, i) => (
                <Aparece key={h.etapa} className="relative pb-14" delay={i * 60}>
                  <span
                    className="absolute -left-[clamp(22px,4vw,54px)] top-[9px] h-[9px] w-[9px] -translate-x-1 rounded-full border-[1.5px] border-senal bg-abismo"
                    aria-hidden="true"
                  />
                  <p className="mb-2 font-mono text-[11px] uppercase tracking-[0.2em] text-senal">
                    {h.etapa}
                  </p>
                  <h3 className="mb-3 font-serif text-[clamp(22px,2.6vw,30px)] font-normal leading-tight text-luz">
                    {h.titulo}
                  </h3>
                  <p className="max-w-[62ch] text-[16px] leading-relaxed text-cuerpo">{h.texto}</p>
                </Aparece>
              ))}
            </div>
          )}

          <div className="mt-12 grid gap-[18px] sm:grid-cols-2 lg:grid-cols-4">
            <Hueco etiqueta="Foto 02" nota="Perla facilitando, con grupo. Prueba de oficio." formato="16:9" />
            <Hueco etiqueta="Foto 03" nota="Escenario o conferencia, con público visible." formato="16:9" />
            <Hueco etiqueta="Foto 04" nota="Humana y cercana. Café, riendo, natural." formato="1:1" proporcion="aspect-square" />
            <Hueco etiqueta="Fotos 05–08" nota="Archivo de distintas épocas para la línea de tiempo." formato="libre" proporcion="aspect-square" />
          </div>
        </div>
      </section>

      {/* ================= EL ROI ================= */}
      <section className="relative py-[clamp(90px,13vh,160px)]">
        <div className="mx-auto max-w-[1180px] px-[clamp(20px,5vw,64px)]">
          <div className="grid items-center gap-[clamp(30px,5vw,80px)] md:grid-cols-2">
            <div>
              <Aparece>
                <p className="ojo mb-7">La métrica</p>
                <h2 className="font-serif text-[clamp(34px,5.2vw,64px)] font-normal leading-[1.08] tracking-[-0.015em]">
                  ¿Cuánto rinde
                  <br />
                  lo que no se ve?
                </h2>
              </Aparece>
              <Aparece>
                <p className="mt-7 text-[clamp(18px,1.6vw,22px)] leading-[1.6] text-[#E6EEFA]">
                  Cuando me preguntan cuál es la habilidad más relevante para un emprendedor,
                  siempre esperan que diga vender o negociar.
                </p>
                <div className="mt-5 max-w-medida space-y-5 text-[17px] leading-[1.75] text-cuerpo">
                  <p>
                    No lo es. Son la inteligencia emocional y el autoconocimiento: tener
                    estómago para soportar lo que viene, que no sabes qué es, y verlo con la
                    mejor cara posible sabiendo que también eres una persona imperfecta que se
                    sigue construyendo.
                  </p>
                  <p>
                    De ahí parte la congruencia. Si afuera se pone feo por la economía o la
                    política, voy adentro a poner orden.
                  </p>
                </div>
              </Aparece>

              <Aparece className="mt-10">
                <dl className="grid grid-cols-2 gap-px border border-senal/15 bg-senal/15">
                  {[
                    ['20+', 'Años en gestión de personas'],
                    ['10', 'Años construyendo Talentoría'],
                    ['12+', 'Años de exploración interior'],
                    ['2', 'Mundos que dejó de separar'],
                  ].map(([n, t]) => (
                    <div key={t} className="bg-marino px-6 py-7">
                      <dt className="font-serif text-[clamp(30px,4vw,44px)] leading-none text-claro">
                        {n}
                      </dt>
                      <dd className="mt-2.5 font-mono text-[10px] uppercase leading-[1.7] tracking-[0.16em] text-tenue">
                        {t}
                      </dd>
                    </div>
                  ))}
                </dl>
              </Aparece>
            </div>

            <Aparece>
              <Medidor />
            </Aparece>
          </div>
        </div>
      </section>

      {/* ================= EL PUENTE ================= */}
      <section className="relative py-[clamp(90px,13vh,160px)]">
        <div className="mx-auto max-w-[1180px] px-[clamp(20px,5vw,64px)]">
          <div className="max-w-[760px]">
            <Aparece>
              <p className="ojo mb-7">El puente</p>
              <h2 className="font-serif text-[clamp(34px,5.2vw,64px)] font-normal leading-[1.08] tracking-[-0.015em]">
                Un buen trabajo
                <br />
                siempre te cambia la vida.
              </h2>
            </Aparece>

            <Aparece className="mt-13">
              <div className="relative mt-12 overflow-hidden rounded-sm border border-hielo/20 bg-marino p-[clamp(30px,5vw,64px)]">
                <span
                  className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-hielo to-transparent"
                  aria-hidden="true"
                />
                <p className="text-[clamp(18px,1.6vw,22px)] leading-[1.6] text-[#E6EEFA]">
                  Estar en un área de personas ayuda a que la gente cumpla su proyecto de vida
                  y muchas veces su propósito. Además ayuda a su familia y a la comunidad
                  entera.
                </p>
                <p className="mt-5 max-w-medida text-[17px] leading-[1.75] text-cuerpo">
                  Eso es exactamente lo que hacemos en{' '}
                  <a
                    href="https://talentoria.com"
                    target="_blank"
                    rel="noopener"
                    className="border-b border-hielo/40 text-hielo transition-colors hover:border-luz hover:text-luz"
                  >
                    Talentoría
                  </a>
                  , la consultora que fundé junto a mi socia hace diez años:{' '}
                  <a
                    href="https://talentoria.com/headhunting/"
                    target="_blank"
                    rel="noopener"
                    className="border-b border-hielo/40 text-hielo transition-colors hover:border-luz hover:text-luz"
                  >
                    encontrar a la persona correcta para el puesto correcto
                  </a>{' '}
                  y acompañar a las empresas a construir culturas donde valga la pena quedarse.
                </p>
              </div>
            </Aparece>
          </div>

          <div className="mt-12 grid gap-[18px] md:grid-cols-2">
            <Hueco etiqueta="Foto 09" nota="Perla con su socia, para la sección de Talentoría." formato="16:9" />
            <Hueco etiqueta="Foto 12" nota="Imagen para compartidos en redes (Open Graph)." formato="1200 × 630" />
          </div>
        </div>
      </section>
    </>
  );
}
