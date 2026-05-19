import { autenticador } from "../../../src/auth";
import QRCode from "qrcode";
var reservaHoy;
const hoy = Temporal.Now.plainDateISO().toString();
const token = localStorage.getItem("PASE-Token");
const data = JSON.parse(atob(token.split(".")[1]));
const backend = import.meta.env.VITE_BACKEND;

document.addEventListener("DOMContentLoaded", async () => {
  autenticador;
  const usuario = await DatosdeUsuario();
  CargaDeDatos(usuario);
  await cargarReservaActiva();
});

document.getElementById("btnNuevaReserva").addEventListener("click", async (e) => {
  e.preventDefault();

  if (reservaHoy) {
    alert(
      "Ya tienes una reserva activa. Debes completarla o cancelarla antes de hacer una nueva.",
    );
    return;
  }

  // Si no hay reserva activa, redirige
  window.location.href = "/pages/client/reserva/";
});

async function DatosdeUsuario() {
  const res = await fetch(backend + `/api/usuario/${data.id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const user = await res.json();

  return user;
}

function CargaDeDatos(user) {
  console.log(user);
  document.getElementById("presentacion").innerHTML =
    "Hola " + user.nombreUsuario.split(" ")[0] + "!";
}

async function cargarReservaActiva() {
  const result = await fetch(
    `${backend}/api/reserva/reservaActiva/${data.id}?fecha=${hoy}`,
  ).then((r) => r.json());
  reservaHoy = result.content;
  const contenedor = document.getElementById("reservaActiva");

  if (!result.content) {
    contenedor.innerHTML = `<p class="text-muted">No tienes una reserva activa</p>`;
    return;
  }

  const r = result.content;
  window.reservaActivaData = r;

  contenedor.innerHTML = `
    <div class="card shadow">
      <div class="card-body">
        <p class="mb-1"><strong>Sucursal:</strong> ${r.nombreSucursal}</p>
        <p class="mb-1"><strong>Zona:</strong> ${r.sectorZona}${r.numZona}</p>
        <p class="mb-1"><strong>Hora:</strong> ${r.horaInicio.slice(0, 5)} - ${r.horaFinal.slice(0, 5)}</p>
        <p class="mb-3"><strong>Fecha:</strong> ${new Date(r.fechaReserva).toLocaleDateString()}</p>
        <div class="d-flex flex-column align-items-center gap-3">
          <button class="btn btn-danger fw-bold shadow w-100" id="btnQR">Generar QR</button>
          <img id="qrReserva" class="d-none rounded shadow" />
        </div>
      </div>
    </div>`;

  document.getElementById("btnQR").addEventListener("click", generarQR);
}

async function generarQR() {
  const r = window.reservaActivaData;

  const info = JSON.stringify({
    idReserva: r.idReserva,
    sucursal: r.nombreSucursal,
    zona: `${r.sectorZona}${r.numZona}`,
    horaInicio: r.horaInicio.slice(0, 5),
    horaFinal: r.horaFinal.slice(0, 5),
    fecha: new Date(r.fechaReserva).toLocaleDateString(),
    estatus: r.nombreEstatus,
  });

  const urlQR = await QRCode.toDataURL(info, { width: 250 });
  const img = document.getElementById("qrReserva");
  img.src = urlQR;
  img.classList.remove("d-none");
}
