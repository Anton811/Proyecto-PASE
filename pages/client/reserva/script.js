const estacionamiento = document.getElementById("estacionamiento");

const zona = ["A", "B", "C", "D"];

document.addEventListener("DOMContentLoaded", function () {
  cargarCajones();

  lotes = document.querySelectorAll(".lote");

  lotes.forEach((lote) => {
    lote.addEventListener("click", function () {
      eliminarSeleccionado();
      this.classList.toggle("bg-warning"); //Cambia el color de divs seleccionados
    });
  });
});

function cargarCajones() {
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
}

//Elimina la eleccion anterior
function eliminarSeleccionado() {
  let seleccionado = document.querySelector(".bg-warning");

  if (!seleccionado) {
    console.log("No se encontro un elemento seleccionado");
    return;
  } else {
    seleccionado.classList.toggle("bg-warning");
    return;
  }
}
