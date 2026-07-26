"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

type TiempoRestante = {
  dias: number;
  horas: number;
  minutos: number;
  segundos: number;
};

type ColorProps = {
  nombre: string;
  codigo: string;
};

const recuerdos = [
  {
    edad: "0 años",
    titulo: "El comienzo de nuestra historia",
    texto:
      "Una pequeña niña llegó para llenar nuestros días de amor y darle un nuevo rumbo a nuestras vidas.",
    imagen: "/images/sayu-0.jpeg",
    alt: "Sayumi de bebé",
    posicion: "center center",
  },
  {
    edad: "4 años",
    titulo: "Curiosa y aventurera",
    texto:
      "Desde pequeña comenzó a descubrir el mundo con alegría, carácter y una personalidad muy especial.",
    imagen: "/images/sayu-04.jpeg",
    alt: "Sayumi a los cuatro años",
    posicion: "center center",
  },
  {
    edad: "5 años",
    titulo: "La pequeña princesa",
    texto:
      "Entre juegos, vestidos y mucha imaginación, ya empezaba a escribir su propio cuento.",
    imagen: "/images/sayu-princesa.jpeg",
    alt: "Sayumi vestida de princesa",
    posicion: "center top",
  },
  {
    edad: "6 años",
    titulo: "Una sonrisa inolvidable",
    texto:
      "Cada nueva etapa llegó acompañada de aprendizajes, ocurrencias y muchos momentos felices.",
    imagen: "/images/sayu-06.jpeg",
    alt: "Sayumi a los seis años",
    posicion: "center center",
  },
  {
    edad: "7 años",
    titulo: "Nuevos caminos",
    texto:
      "Fue creciendo rodeada de cariño, amistades y recuerdos que siempre serán parte de su historia.",
    imagen: "/images/sayu-07.jpeg",
    alt: "Sayumi a los siete años",
    posicion: "center center",
  },
  {
    edad: "14 años",
    titulo: "Preparándose para un nuevo capítulo",
    texto:
      "Hoy vemos a una joven auténtica, decidida y llena de sueños por cumplir.",
    imagen: "/images/sayu-14.jpeg",
    alt: "Sayumi a los catorce años",
    posicion: "center center",
  },
  {
    edad: "Hoy",
    titulo: "La joven en quien se ha convertido",
    texto:
      "Una persona con valores, carácter y una luz propia que la hace única.",
    imagen: "/images/sayu-actual.jpeg",
    alt: "Sayumi acompañada en la actualidad",
    posicion: "center center",
  },
  {
    edad: "21 de agosto de 2026",
    titulo: "Comienza un nuevo capítulo",
    texto:
      "Después de quince años de aprendizajes, sueños y recuerdos, llega el momento de celebrar una nueva etapa. Nos llenaría de alegría que formes parte de este capítulo tan especial.",
    imagen: "/images/sayu-fiesta.jpeg",
    alt: "Sayumi acompañada en una celebración",
    posicion: "center center",
  },
];

function calcularTiempoRestante(): TiempoRestante {
  const fechaEvento = new Date("2026-08-21T19:00:00-05:00").getTime();
  const ahora = new Date().getTime();
  const diferencia = Math.max(fechaEvento - ahora, 0);

  return {
    dias: Math.floor(diferencia / (1000 * 60 * 60 * 24)),
    horas: Math.floor((diferencia / (1000 * 60 * 60)) % 24),
    minutos: Math.floor((diferencia / (1000 * 60)) % 60),
    segundos: Math.floor((diferencia / 1000) % 60),
  };
}

export default function Home() {
  const [invitacionAbierta, setInvitacionAbierta] = useState(false);
  const [abriendoSobre, setAbriendoSobre] = useState(false);
  const [musicaActiva, setMusicaActiva] = useState(false);
  const [tiempo, setTiempo] = useState<TiempoRestante>({
    dias: 0,
    horas: 0,
    minutos: 0,
    segundos: 0,
  });
  const audioRef = useRef<HTMLAudioElement | null>(null);
  useEffect(() => {
    setTiempo(calcularTiempoRestante());
  
    const intervalo = window.setInterval(() => {
      setTiempo(calcularTiempoRestante());
    }, 1000);
  
    return () => window.clearInterval(intervalo);
  }, []);
  
  useEffect(() => {
    if (!invitacionAbierta) return;
  
    const elementos = document.querySelectorAll<HTMLElement>(".revelar");
  
    const observador = new IntersectionObserver(
      (entradas) => {
        entradas.forEach((entrada) => {
          if (entrada.isIntersecting) {
            entrada.target.classList.add("revelado");
            observador.unobserve(entrada.target);
          }
        });
      },
      {
        threshold: 0.15,
        rootMargin: "0px 0px -60px 0px",
      }
    );
  
    elementos.forEach((elemento) => observador.observe(elemento));
  
    return () => observador.disconnect();

  }, [invitacionAbierta]);
  async function alternarMusica() {
    const audio = audioRef.current;
  
    if (!audio) return;
  
    try {
      if (audio.paused) {
        await audio.play();
        setMusicaActiva(true);
      } else {
        audio.pause();
        setMusicaActiva(false);
      }
    } catch (error) {
      console.error("No se pudo reproducir la música:", error);
    }
  }
  function abrirInvitacion() {
    if (abriendoSobre) return;
  
    setAbriendoSobre(true);
  
    window.setTimeout(() => {
      setInvitacionAbierta(true);
    }, 750);
  }
  
  function irAHistoria() {
    document.getElementById("historia")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }

  return (
    <main className="pagina">
      <audio
  ref={audioRef}
  src="/Musica/cancion.mpeg"
  loop
  preload="metadata"
/>
      <div className="destellos" aria-hidden="true">
        <span>✦</span>
        <span>✧</span>
        <span>✦</span>
        <span>✧</span>
        <span>✦</span>
      </div>
      {invitacionAbierta && (
  <button
    type="button"
    className={`boton-musica ${
      musicaActiva ? "musica-activa" : ""
    }`}
    onClick={alternarMusica}
    aria-label={
      musicaActiva ? "Pausar música" : "Reproducir música"
    }
  >
    <span aria-hidden="true">
      {musicaActiva ? "❚❚" : "♪"}
    </span>

    <span>
      {musicaActiva ? "Pausar" : "Música"}
    </span>
  </button>
)}
      {!invitacionAbierta ? (
        <section
        className={`portada ${abriendoSobre ? "portada-abriendo" : ""}`}
        >
          <p className="texto-superior">
            Estás invitado a ser parte de nuestra historia
          </p>

          <h1>
            Mis XV años
            <strong>Sayumi</strong>
          </h1>

          <p className="frase">
            Cada historia tiene un comienzo...
            <br />
            La nuestra comenzó hace quince años.
          </p>

          <button
          type="button"
          className={`sobre ${abriendoSobre ? "sobre-abriendo" : ""}`}
          onClick={abrirInvitacion}
          aria-label="Abrir invitación"
          disabled={abriendoSobre}
          >
            <span className="solapa" />

            <span className="contenido-sobre">
              <span className="sello">S</span>
              <span className="indicacion">Toca para abrir</span>
            </span>
          </button>
        </section>
      ) : (
        <div className="contenido-invitacion">
          <section className="bienvenida">
            <div className="contenedor-foto">
              <div className="foto-marco">
                <Image
                  src="/images/sayu-0.jpeg"
                  alt="Sayumi de bebé"
                  fill
                  priority
                  sizes="(max-width: 600px) 230px, 280px"
                  style={{
                    objectFit: "cover",
                    objectPosition: "center center",
                  }}
                />
              </div>
            </div>

            <p className="texto-superior">
              Hace quince años comenzó esta historia
            </p>

            <h2>Sayumi</h2>

            <p>
              Hoy queremos invitarte a escribir un nuevo capítulo junto a ella.
            </p>

            <button
              type="button"
              className="boton-continuar"
              onClick={irAHistoria}
            >
              Comenzar el recorrido
            </button>
          </section>

          <section className="historia revelar" id="historia">
            <p className="etiqueta">Nuestra historia</p>

            <h3>Quince años de recuerdos</h3>

            <div className="linea-tiempo">
              {recuerdos.map((recuerdo) => (
                <article className="momento" key={recuerdo.imagen}>
                  <div className="foto-historia">
                    <Image
                      src={recuerdo.imagen}
                      alt={recuerdo.alt}
                      fill
                      sizes="(max-width: 600px) 100vw, 220px"
                      style={{
                        objectFit: "cover",
                        objectPosition: recuerdo.posicion,
                      }}
                    />
                  </div>

                  <div className="texto-momento">
                    <span>{recuerdo.edad}</span>
                    <h4>{recuerdo.titulo}</h4>
                    <p>{recuerdo.texto}</p>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section id="informacion" className="informacion revelar">
            <p className="etiqueta">Reserva la fecha</p>

            <h3>21 de agosto de 2026</h3>

            <p className="hora-evento">19:00 horas</p>

            <div className="cuenta-regresiva">
              <div className="unidad-tiempo">
                <strong>{tiempo.dias}</strong>
                <span>Días</span>
              </div>

              <div className="unidad-tiempo">
                <strong>{String(tiempo.horas).padStart(2, "0")}</strong>
                <span>Horas</span>
              </div>

              <div className="unidad-tiempo">
                <strong>{String(tiempo.minutos).padStart(2, "0")}</strong>
                <span>Minutos</span>
              </div>

              <div className="unidad-tiempo">
                <strong>{String(tiempo.segundos).padStart(2, "0")}</strong>
                <span>Segundos</span>
              </div>
            </div>

            <div className="tarjeta-ubicacion">
              <span className="icono-ubicacion" aria-hidden="true">
                ⌖
              </span>

              <div>
                <h4>Lugar de la celebración</h4>
                <p>Munaysenca 134, San Miguel 15088, Perú</p>
              </div>
            </div>

            <a
              className="boton-maps"
              href="https://maps.app.goo.gl/PGog4FXHTR3T3Lms9"
              target="_blank"
              rel="noopener noreferrer"
            >
              Ver ubicación en Google Maps
            </a>
          </section>

          <section className="dresscode revelar" id="dresscode">
            <p className="etiqueta">Código de vestimenta</p>

            <h3>Elegante</h3>

            <p className="introduccion-dresscode">
              Queremos crear una celebración armoniosa y llena de color. Te
              invitamos a elegir alguno de los siguientes tonos.
            </p>

            <div className="bloques-paleta">
              <article className="grupo-paleta familia">
                <span className="grupo-distintivo">
                  Familia y círculo cercano
                </span>

                <h4>Paleta reservada</h4>

                <p>
                  Estos tonos serán utilizados por la familia principal,
                  chambelán y personas especialmente coordinadas.
                </p>

                <div className="colores">
                  <Color nombre="Azul acero" codigo="#5D6D7E" />
                  <Color nombre="Plata" codigo="#C0C0C0" />
                  <Color nombre="Gris perla" codigo="#D6D9DC" />
                  <Color nombre="Blanco perla" codigo="#F7F7F3" />
                </div>
              </article>

              <article className="grupo-paleta invitados">
                <span className="grupo-distintivo">Invitados</span>

                <h4>Tonos sugeridos</h4>

                <p>
                  Puedes elegir libremente dentro de esta gama para acompañar la
                  estética de la celebración.
                </p>

                <div className="colores">
                  <Color nombre="Azul cielo" codigo="#A9C7E8" />
                  <Color nombre="Azul petróleo" codigo="#517B82" />
                  <Color nombre="Lavanda" codigo="#B9AED0" />
                  <Color nombre="Lila grisáceo" codigo="#9E91A8" />
                  <Color nombre="Rosa empolvado" codigo="#D3AEB2" />
                  <Color nombre="Champagne" codigo="#E4CFB1" />
                  <Color nombre="Verde salvia" codigo="#B6C2B0" />
                  <Color nombre="Taupe" codigo="#A7988B" />
                  <Color nombre="Beige arena" codigo="#D7C7B3" />
                  <Color nombre="Gris humo" codigo="#A9ADB2" />
                </div>
              </article>
            </div>

            <div className="nota-vestimenta">
              <strong>Importante:</strong>{" "}

              <p>
                El azul acero del vestido principal está reservado para Sayumi.
                Evita colores neón, rojo intenso y estampados excesivamente
                llamativos.
              </p>
            </div>
          </section>
          <section className="regalos revelar" id="regalos">
  <p className="etiqueta">✦ Un detalle para Sayumi</p>

  <h3>Tu presencia será el mejor regalo</h3>

  <p className="texto-regalos">
    Lo más importante para nosotros es compartir este momento contigo.
  </p>

  <p className="texto-regalos">
    Si deseas tener un detalle adicional con Sayumi,
    podrás hacerlo mediante una lluvia de sobres o, si lo prefieres,
    utilizando el siguiente código QR.
  </p>

  <div className="tarjeta-regalo">

    <div className="qr-imagen">
    <Image
  src="/images/qr-plin-sayumi.jpeg"
  alt="Código QR de Plin de Sayumi Torres"
  width={420}
  height={560}
  sizes="(max-width: 700px) 290px, 310px"
/>
    </div>

    <h4>Plin</h4>

    <p className="titular-regalo">
      Titular: <strong>Sayumi Torres</strong>
    </p>

  </div>
</section>
          <section className="despedida revelar" id="confirmacion">
            <p className="etiqueta">Celebremos juntos</p>

            <h3>Gracias por formar parte de esta historia</h3>

            <div className="texto-despedida">
              <p>
                Los recuerdos más valiosos no se construyen con grandes
                escenarios.
              </p>

              <p>
                Se construyen con las personas que deciden compartirlos.
              </p>

              <p>
                Gracias por acompañar a Sayumi en uno de los capítulos más
                importantes de su vida.
              </p>
            </div>

            <p className="frase-final">
              Nos vemos donde los recuerdos comienzan.
            </p>

            <div className="acciones-despedida">
              <a
                className="boton-confirmar"
                href="https://wa.me/51946353286?text=Hola%20Carol%2C%20confirmo%20mi%20asistencia%20a%20los%20XV%20de%20Sayumi."
                target="_blank"
                rel="noopener noreferrer"
              >
                Confirmar asistencia
              </a>

              <a
                className="boton-maps boton-maps-secundario"
                href="https://maps.app.goo.gl/PGog4FXHTR3T3Lms9"
                target="_blank"
                rel="noopener noreferrer"
              >
                Abrir Google Maps
              </a>
              <a
  className="boton-maps-secundario"
  href="/Sayumi-XV.ics"
  download
>
  Agregar al calendario
</a>
            </div>

            <div className="firma-despedida">
              <span>Con cariño,</span>
              <strong>Carol &amp; Sayumi</strong>
            </div>
          </section>
        </div>
      )}
    </main>
  );
}

function Color({ nombre, codigo }: ColorProps) {
  return (
    <div className="color-item">
      <span
        className="muestra-color"
        style={{ backgroundColor: codigo }}
        aria-hidden="true"
      />

      <span className="nombre-color">{nombre}</span>
    </div>
  );
}