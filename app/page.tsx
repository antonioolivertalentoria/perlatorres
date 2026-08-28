import Image from 'next/image';
import Link from 'next/link';
import Hero from '@/components/Hero';
import Aparece from '@/components/Aparece';
import Medidor from '@/components/Medidor';
import Invitacion from '@/components/Invitacion';
import Reconocimientos from '@/components/Reconocimientos';
import Galeria from '@/components/Galeria';

/** Los tres principios que sobreviven a la matriz, como frases sueltas. */
const FRASES = [
  'La habilidad número uno de un emprendedor no es vender',
  'La congruencia se paga y la incongruencia se cobra',
  'Un buen trabajo siempre te cambia la vida',
];

const CIFRAS: [string, string][] = [
  ['20+', 'Años en gestión de personas'],
  ['10', 'Años construyendo Talentoría'],
  ['+3,000', 'Empresas atendidas'],
  ['20,000+', 'Personas alcanzadas'],
];

export default function Inicio() {
  return (
    <>
      <Hero />

      <Reconocimientos modo="franja" />

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
                Durante años me daba vergüenza hablar de mi vida interior porque pensaba que
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
              href="/conciencia-y-negocios"
              className="group inline-flex items-baseline gap-3 border-b border-senal/40 pb-1 font-mono text-[12px] uppercase tracking-[0.16em] text-claro no-underline transition-colors hover:border-luz hover:text-luz"
            >
              Leer el ensayo completo
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </Link>
          </Aparece>
        </div>
      </section>

      {/* ================= TRES FRASES ================= */}
      <section className="relative py-[clamp(90px,13vh,160px)]">
        <div className="mx-auto max-w-[1180px] px-[clamp(20px,5vw,64px)]">
          <ul className="grid gap-px border border-senal/15 bg-senal/15 md:grid-cols-3">
            {FRASES.map((f, i) => (
              <Aparece as="li" key={f} delay={i * 60} className="bg-marino p-[clamp(28px,4vw,48px)]">
                <p className="mb-6 font-mono text-[11px] tracking-[0.18em] text-senal">
                  {String(i + 1).padStart(2, '0')}
                </p>
                <p className="font-serif text-[clamp(23px,2.6vw,31px)] leading-[1.18] text-luz">
                  {f}
                </p>
              </Aparece>
            ))}
          </ul>

          <Aparece className="mt-12">
            <Link
              href="/conciencia-y-negocios"
              className="group inline-flex items-baseline gap-3 border-b border-senal/40 pb-1 font-mono text-[12px] uppercase tracking-[0.16em] text-claro no-underline transition-colors hover:border-luz hover:text-luz"
            >
              Los tres, desarrollados en el ensayo
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </Link>
          </Aparece>
        </div>
      </section>

      {/* ================= SEMBLANZA ================= */}
      <section className="relative py-[clamp(90px,13vh,160px)]">
        <div className="mx-auto max-w-[1180px] px-[clamp(20px,5vw,64px)]">
          <div className="grid items-center gap-[clamp(24px,4vw,64px)] md:grid-cols-[0.85fr_1.15fr]">
            <div className="relative aspect-square overflow-hidden rounded-sm border border-hielo/10 bg-marino">
              <Image
                src="/imagenes/perla-retrato.jpg"
                alt="Perla Torres, cofundadora de Talentoría"
                fill
                sizes="(min-width: 768px) 40vw, 90vw"
                className="object-cover"
              />
            </div>
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

          <Aparece className="mt-16">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-tenue">
              En acción
            </p>
            <Galeria
              fotos={[
                {
                  src: '/imagenes/perla-facilitando-grupo.jpg',
                  ancho: 1600,
                  alto: 1200,
                  alt: 'Perla Torres facilitando una capacitación frente a un grupo',
                  etiqueta: 'Impartiendo una capacitación',
                },
                {
                  src: '/imagenes/perla-conferencia.jpg',
                  ancho: 1600,
                  alto: 1066,
                  alt: 'Perla Torres hablando en un escenario, con micrófono de diadema',
                  etiqueta: 'Como conferencista invitada',
                },
                {
                  src: '/imagenes/perla-evento-efecto-talentoria.jpg',
                  ancho: 828,
                  alto: 554,
                  alt: 'Perla Torres sonriendo en un evento de Talentoría',
                  etiqueta: 'En un evento de Talentoría',
                },
              ]}
            />
          </Aparece>

          <Aparece className="mt-16">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-tenue">
              Reconocimientos recientes
            </p>
            <Galeria
              fotos={[
                {
                  src: '/imagenes/perla-premio-recursos-humanos.jpg',
                  ancho: 754,
                  alto: 1600,
                  alt: 'Perla Torres recibiendo el reconocimiento Top 50 mejores consultorías de RH para Talentoría',
                  etiqueta: 'Top 50 consultorías de RH en México',
                },
                {
                  src: '/imagenes/santander-women50.jpg',
                  ancho: 1280,
                  alto: 960,
                  alt: 'Perla Torres en la foto grupal del programa Santander Women SW50',
                  etiqueta: 'Santander Women 50 · SW50',
                },
                {
                  src: '/imagenes/foro-e100-grupo.jpg',
                  ancho: 1448,
                  alto: 1086,
                  alt: 'Perla Torres entre las 100 mejores emprendedoras de México, ASEM',
                  etiqueta: '100 mejores emprendedoras · ASEM',
                },
                {
                  src: '/imagenes/foro-e100-reconocimiento.jpg',
                  ancho: 1086,
                  alto: 1448,
                  alt: 'Perla Torres con el reconocimiento de ASEM a las 100 mejores emprendedoras',
                  etiqueta: 'Con el reconocimiento ASEM E100',
                },
              ]}
            />
          </Aparece>
        </div>
      </section>

      {/* ================= LA MÉTRICA ================= */}
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
                  {CIFRAS.map(([n, t]) => (
                    <div key={t} className="bg-marino px-6 py-7">
                      <dt className="font-serif text-[clamp(28px,3.6vw,40px)] leading-none text-claro">
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

            <Invitacion
              titulo="¿Nos escribimos?"
              texto="Si algo de lo que leíste aquí se parece a lo que estás viviendo —en tu empresa o en tu propia carrera— cuéntamelo en tus palabras. Contesto personalmente en menos de 48 horas."
            />
          </div>
        </div>
      </section>
    </>
  );
}
