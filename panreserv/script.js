/* HASTA TENER BACKEND

Simula cajón seleccionado
const cajonSeleccionado = localStorage.getItem("cajon") || "C1";

document.getElementById("cajon").innerText = cajonSeleccionado;

// Simulachorarios ocupados
const horariosOcupados = ["14:00", "16:00"];

//Valida horario
document.getElementById("hora").addEventListener("change", function () {
  const hora = this.value;
  const mensaje = document.getElementById("mensaje");

  if (horariosOcupados.includes(hora)) {
    mensaje.innerText = "Horario reservado";
  } else {
    mensaje.innerText = "";
  }
});

//Confirmar reserva
function confirmarReserva() {
  const fecha = document.getElementById("fecha").value;
  const hora = document.getElementById("hora").value;

  if (!fecha || !hora) {
    alert("Selecciona fecha y hora");
    return;
  }

  if (horariosOcupados.includes(hora)) {
    alert("Ese horario ya está reservado");
    return;
  }

  //backend
  console.log("Reservado:", cajonSeleccionado, fecha, hora);

  //Redirigir
  window.location.href = "confirmacion.html";
}

// Regresar
function regresar() {
  window.history.back();
} 

*/