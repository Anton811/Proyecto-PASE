const backend = import.meta.env.VITE_BACKEND;
const token = localStorage.getItem("PASE-Token");
const data = JSON.parse(atob(token.split(".")[1]));
var municipiosCargados, sucursalesCargadas, horaEntrada, horaSalida;
const colores = document.addEventListener("DOMContentLoaded", async () => {
  await cargarEstados();
  await cargarMunicipios();
  await cargarSucursales();
  await cargarAutos();
  await cargarTarjetas();
  cargarHoras();
});

// carga Municipios dependiendo del Estado
document.getElementById("formReservaEstado").addEventListener("change", async (e) => {
  const idEstado = e.target.value;
  let municipioSelect = document.getElementById("formReservaMunicipio");

  let municipioSeleccionado = municipiosCargados.filter(
    (estado) => estado.idEstado == idEstado,
  );

  let op = "<option>Seleccione una opcion</option>";
  municipioSelect.innerHTML = "";

  municipioSeleccionado.forEach((municipio) => {
    op += `<option value="${municipio.idMunicipio}">${municipio.nombreMunicipio}</option>`;
  });
  municipioSelect.innerHTML = op;
});

// Carga Sucursales dependiendo del municipio
document.getElementById("formReservaMunicipio").addEventListener("change", async (e) => {
  const idMunicipio = e.target.value;

  let sucursalesSeleccionadas = sucursalesCargadas.filter(
    (sucursal) => sucursal.idMunicipio == idMunicipio,
  );

  let op = "<option>Seleccione una opcion</option>";

  sucursalesSeleccionadas.forEach((sucursal) => {
    op += `<option value="${sucursal.idSucursal}">${sucursal.nombreSucursal}</option>`;
  });
  document.getElementById("formReservaSucursal").innerHTML = op;
});

//Carga cajones de estacionamiento
document.getElementById("formReserva").addEventListener("submit", async (e) => {
  e.preventDefault();

  const sucursal = document.getElementById("formReservaSucursal").value;
  horaEntrada = document.getElementById("formReservaEntrada").value;
  horaSalida = document.getElementById("formReservaSalida").value;

  if (horaEntrada >= horaSalida) {
    alert("Seleccione un rango de hora correcto");
    document.getElementById("zona").innerHTML = "";
    return;
  }
  const result = await fetch(`${backend}/api/sucursal/cargarSucursal/${sucursal}`);
  const zonas = await result.json();

  console.log(zonas.message);
  cargarZonas(zonas.content[0]);
});

//Crea nueva Reserva
document.getElementById("formConfirmarReserva").addEventListener("submit", async (e) => {
  e.preventDefault();

  const reserva = {
    usuario: data.id,
    auto: document.getElementById("formConfirmarReservaAuto").value,
    pago: document.getElementById("formConfirmarReservaPago").value,
    zona: document.querySelector(".seleccionado").dataset.id,
    horaInicio: document.getElementById("formReservaEntrada").value,
    horaSalida: document.getElementById("formReservaSalida").value,
  };

  const result = await fetch(`${backend}/api/reserva/agregarReserva`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(reserva),
  }).then((e) => e.json());

  alert(result);
  window.location.href = "/pages/client/dashboard/";
});

async function cargarEstados() {
  const results = await fetch(`${backend}/api/sucursal/cargarEstados`);
  const estados = await results.json();

  let op = "<option>Seleccione una opcion</option>";
  estados.content.forEach((estado) => {
    op += `<option value=${estado.idEstado}>${estado.nombreEstado}</option>`;
  });
  document.getElementById("formReservaEstado").innerHTML = op;
}
async function cargarMunicipios() {
  const data = await fetch(`${backend}/api/sucursal/cargarMunicipio`);
  const result = await data.json();
  municipiosCargados = result.content;
}
async function cargarSucursales() {
  const data = await fetch(`${backend}/api/sucursal/cargarSucursales`);
  const result = await data.json();
  sucursalesCargadas = result.content;
}
async function cargarZonas(sucursal) {
  const zonas = (
    await fetch(`${backend}/api/sucursal/zonas/${sucursal.idSucursal}`).then((res) =>
      res.json(),
    )
  ).content;
  const reservas = (
    await fetch(
      `${backend}/api/reserva/sucursal/cargarReservas?id=${sucursal.idSucursal}&horaEntrada=${horaEntrada}&horaSalida=${horaSalida}`,
    ).then((res) => res.json())
  ).content;
  let container = "";
  let contador = 0;

  const reservasMap = new Map();
  reservas.forEach((r) => {
    reservasMap.set(r.idZona, r.colorEstatus);
  });

  for (let i = 0; i < sucursal.pisoSucursal; i++) {
    container += '<div class="piso">';
    for (let j = 0; j < sucursal.sectorSucursal; j++) {
      container += `<div class="sector row my-3" style="height:100px">`;
      for (let k = 0; k < sucursal.numZonaSucursal; k++) {
        const zona = zonas[contador];
        const color = reservasMap.get(zona.idZona) || "bg-primary";
        container += `<div class=" ${color} d-flex h-100 col p-2 m-1 text-center rounded align-items-center justify-content-center zonas" data-id="${zona.idZona}">
                        <p>${zona.sectorZona}${zona.numZona}</p>
                      </div>`;
        contador++;
      }
      container += "</div>";
    }
    container += "</div>";
  }

  document.getElementById("zona").innerHTML = container;

  document.querySelectorAll(".zonas").forEach((div) => {
    div.addEventListener("click", () => {
      // Solo si es disponible (bg-primary)
      if (!div.classList.contains("bg-primary")) return;

      // Quita selección anterior
      document.querySelectorAll(".zonas.seleccionado").forEach((d) => {
        d.classList.remove(
          "seleccionado",
          "bg-white",
          "text-primary",
          "border",
          "border-primary",
        );
        d.classList.add("bg-primary");
      });

      // Aplica selección al clickeado
      div.classList.remove("bg-primary");
      div.classList.add(
        "seleccionado",
        "bg-white",
        "text-primary",
        "border",
        "border-primary",
        "border-2",
      );

      document.getElementById("containerBtnContinuar").innerHTML =
        '<button class="btn btn-danger fw-bold shadow" id="btnContinuar" data-bs-toggle="modal" data-bs-target="#modalConfirmar">Continuar</button>';
    });
  });
}
async function cargarAutos() {
  const autos = (
    await fetch(`${backend}/api/auto/usuario/${data.id}`).then((res) => res.json())
  ).body;

  let op = "";

  autos.forEach((auto) => {
    op += `<option value="${auto.idAuto}">${auto.nombreMarca} ${auto.nombreModelo}</option>`;
  });

  document.getElementById("formConfirmarReservaAuto").innerHTML = op;
}
async function cargarTarjetas() {
  const tarjetas = (
    await fetch(`${backend}/api/pago/usuario/cargarTarjetas/${data.id}`).then((e) => e.json())
  ).body;
  let op = "";

  tarjetas.forEach((tarjeta) => {
    op += `<option value="${tarjeta.idPago}">•••• ${tarjeta.numeroTarjeta.slice(12)}</option>`;
  });
  document.getElementById("formConfirmarReservaPago").innerHTML = op;
}

function cargarHoras() {
  const fecha = Temporal.Now.plainDateTimeISO();
  console.log(fecha.hour);
  if (fecha.hour >= 20) {
    alert("hora de reservas cerrada (8 p.m.), favor de realizar reserva el dia de mañana");
    window.location.href = "/pages/client/dashboard/";
    return;
  }

  if (fecha.hour < 10) {
    alert("hora de reservas cerrada (10 a.m.), favor de realizar reserva el dia de mañana");
    window.location.href = "/pages/client/dashboard/";
    return;
  }
  let inicio = '<option value="">Selecciona una hora</option>',
    fin = '<option value="">Selecciona una hora</option>';
  for (let i = fecha.hour + 1; i < 21; i++) {
    inicio += `<option value="${i}:00">${i}:00</option>`;
    fin += `<option value="${i + 1}:00">${i + 1}:00</option>`;
  }
  document.getElementById("formReservaEntrada").innerHTML = inicio;
  document.getElementById("formReservaSalida").innerHTML = fin;
}
