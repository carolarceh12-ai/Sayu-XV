"use client";

import { useState } from "react";

export default function Home() {
  const [invitacionAbierta, setInvitacionAbierta] = useState(false);

  return (
    <main className="pagina">
      <div className="destellos" aria-hidden="true">
        <span>✦</span>
        <span>✧</span>
        <span>✦</span>
        <span>✧</span>
        <span>✦</span>
      </div>

      {!invitacionAbierta ? (
        <section className="portada">
          <p className="texto-superior">Estás invitado a un sueño</p>

          <h1>
            Mis XV años
            <strong>Sayumi</strong>
          </h1>

          <p className="frase">
            Toda gran historia comienza con un pequeño sueño...
          </p>

          <button
            className="sobre"
            onClick={() => setInvitacionAbierta(true)}
            aria-label="Abrir invitación"
          >
            <span className="solapa"></span>

            <span className="contenido-sobre">
              <span className="sello">S</span>
              <span className="indicacion">Toca para abrir</span>
            </span>
          </button>
        </section>
      ) : (
        <section className="bienvenida">
          <p className="texto-superior">Hace quince años comenzó esta historia</p>

          <h2>
            Sayumi
            <span>Mis XV años</span>
          </h2>

          <p>
            Hoy queremos compartir contigo uno de sus capítulos más especiales.
          </p>

          <button
            className="boton-continuar"
            onClick={() =>
              document
                .getElementById("informacion")
                ?.scrollIntoView({ behavior: "smooth" })
            }
          >
            Descubrir la invitación
          </button>
        </section>
      )}

      <section id="informacion" className="informacion">
        <p className="etiqueta">Reserva la fecha</p>
        <h3>21 de agosto de 2026</h3>
        <p>19:00 horas</p>
        <p>Munaysenca 134, San Miguel</p>
      </section>
    </main>
  );
}