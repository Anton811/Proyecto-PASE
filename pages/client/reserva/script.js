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

const estacionamiento = document.getElementById("estacionamiento");
const zona = ["A", "B", "C", "D"];
document.addEventListener("DOMContentLoaded", function () {
  let cajon = "";
  let contador = 0;
  for (i = 0; i < 3; i++) {
    cajon += `<div class="row my-4 flex-nowrap justify-content-center g-1">`;
    for (j = 0; j < 6; j++) {
      contador++;
      cajon += `<div class="col d-flex justify-content-center py-4 bg-primary mx-1 rounded lote shadow-lg"><p class="d-flex align-items-center m-0 fw-bold">${zona[i]}${j}</p></div>`;
    }
    cajon += `</div>`;
  }

  estacionamiento.innerHTML = cajon;

  lotes = document.querySelectorAll(".lote");

  lotes.forEach((lote) => {
    lote.addEventListener("click", function () {
      this.classList.toggle("bg-warning"); //Cambia el color de divs seleccionados
    });
  });
});
