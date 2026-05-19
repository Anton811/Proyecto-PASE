const token = localStorage.getItem("PASE-Token");
const user = JSON.parse(atob(token.split(".")[1]));
console.log(user);
const backend = import.meta.env.VITE_BACKEND;
const meses = [
  "Enero",
  "Febrero",
  "Marzo",
  "Abril",
  "Mayo",
  "Junio",
  "Julio",
  "Agosto",
  "Septiembre",
  "Octubre",
  "Noviembre",
  "Diciembre",
];

document.addEventListener("DOMContentLoaded", () => {
  cargarReservas();
});

async function cargarReservas() {
  const data = await fetch(`${backend}/api/reserva/usuario/cargarReservas/${user.id}`).then(
    (e) => e.json(),
  );
  const reservas = data.body;
  let fecha;
  let container = "";
  reservas.forEach((reserva) => {
    const fecha = new Date(reserva.fechaReserva);
    const dia = fecha.getDate();
    const mes = meses[fecha.getMonth()]; // getMonth() va de 0-11
    const anio = fecha.getFullYear();
    const duracion = calcularDuracion(reserva.horaInicio, reserva.horaFinal);

    container += `<div class="bg-white border rounded p-2 m-2 shadow-sm">
            <div class="row">
              <div class="col">
                <h5 class="m-0">${reserva.sucursal}</h5>
                <p class="text-secondary mb-1">ID: ${reserva.idReserva}</p>
              </div>
              <div class="col d-flex align-items-center">
                <h2 class="fw-bold ms-auto me-1">$${reserva.costo}</h2>
              </div>
            </div>
            <div class="row my-3">
              <div class="col">
                <p class="text-secondary m-0 fw-bold">Fecha</p>
                <p class="fw-bold">${dia}/${mes}/${anio}</p>
              </div>
              <div class="col">
                <p class="text-secondary m-0 fw-bold">Horario/Duracion</p>
                <p class="fw-bold">${reserva.horaInicio.slice(0, 5)} - ${reserva.horaFinal.slice(0, 5)} (${duracion})</p>
              </div>
            </div>
            <div class="row my-3">
              <div class="col-8">
                <p class="text-secondary m-0 fw-bold">Vehiculo</p>
                <p class="fw-bold">${reserva.marca} ${reserva.modelo} ${reserva.color} (${reserva.matricula})</p>
              </div>
              <div class="col"></div>
            </div>
          </div>`;
  });

  document.getElementById("reservas").innerHTML = container;
}

function calcularDuracion(horaInicio, horaFinal) {
  const [h1, m1] = horaInicio.split(":").map(Number);
  const [h2, m2] = horaFinal.split(":").map(Number);

  const totalMinutos = h2 * 60 + m2 - (h1 * 60 + m1);
  const horas = Math.floor(totalMinutos / 60);
  const minutos = totalMinutos % 60;

  if (minutos === 0) return `${horas}h`;
  if (horas === 0) return `${minutos}m`;
  return `${horas}h ${minutos}m`;
}
