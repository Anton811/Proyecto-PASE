const token = localStorage.getItem("PASE-Token");
const data = JSON.parse(atob(token.split(".")[1]));
const backend = import.meta.env.VITE_BACKEND;
var modeloAutos;

document.addEventListener("DOMContentLoaded", async () => {
  cargarDatosUsuario();
  cargarAutos();
  cargarInfoAutos();
  cargarTarjetas();
});

document.getElementById("formAgregarAutoMarca").addEventListener("change", async (e) => {
  let marca = e.target.value;

  let modeloSelect = modeloAutos.filter((modelo) => modelo.idMarcaAuto == marca);
  let op = "<option>Seleccione una opcion...</option>";
  modeloSelect.forEach(
    (modelo) => (op += `<option value="${modelo.idModelo}">${modelo.nombreModelo}</option>`),
  );
  document.getElementById("formAgregarAutoModelo").innerHTML = op;
});

//Agregar Autos
document.getElementById("formAgregarAuto").addEventListener("submit", async (e) => {
  e.preventDefault();

  const auto = {
    modelo: document.getElementById("formAgregarAutoModelo").value,
    usuario: data.id,
    color: document.getElementById("formAgregarAutoColor").value,
    matricula: document.getElementById("formAgregarAutoMatricula").value,
  };

  const result = await fetch(`${backend}/api/auto/agregarAuto`, {
    method: "POST",
    headers: { "Content-Type": "Application/json" },
    body: JSON.stringify(auto),
  }).then((e) => e.json());

  alert(result);
  cargarAutos();
});

//Agregar Tarjetas
document.getElementById("formAgregarTarjeta").addEventListener("submit", async (e) => {
  e.preventDefault();

  const tarjeta = {
    id: data.id,
    nombre: document.getElementById("formAgregarTarjetaNombre").value,
    mes: document.getElementById("formAgregarTarjetaMes").value,
    anio: document.getElementById("formAgregarTarjetaAnio").value,
    numero: document.getElementById("formAgregarTarjetaNumero").value,
  };

  const result = await fetch(`${backend}/api/pago/agregarTarjeta`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(tarjeta),
  }).then((e) => e.json());

  alert(result);
  cargarTarjetas();
});

document.getElementById("formModificarUsuario").addEventListener("submit", async (e) => {
  e.preventDefault();

  const usuario = {
    nombre: document.getElementById("formModificarUsuarioNombre").value,
    app: document.getElementById("formModificarUsuarioApp").value,
    apm: document.getElementById("formModificarUsuarioApm").value || "",
    correo: document.getElementById("formModificarUsuarioCorreo").value,
    telefono: document.getElementById("formModificarUsuarioTelefono").value,
  };

  const result = await fetch(`${backend}/api/usuario/modificarUsuario/${data.id}`, {
    method: "PUT",
    headers: { "Content-Type": "Application/json" },
    body: JSON.stringify(usuario),
  }).then((e) => e.json());

  alert(result);
  cargarDatosUsuario();
});

async function cargarDatosUsuario() {
  const datos = await fetch(`${backend}/api/usuario/${data.id}`).then((res) => res.json());
  console.log(datos);
  document.getElementById("formModificarUsuarioNombre").value = datos.nombreUsuario;
  document.getElementById("formModificarUsuarioApp").value = datos.appUsuario;
  document.getElementById("formModificarUsuarioApm").value = datos.apmUsuario;
  document.getElementById("formModificarUsuarioCorreo").value = datos.correoUsuario;
  document.getElementById("formModificarUsuarioTelefono").value = datos.telUsuario;
}
async function cargarAutos() {
  const autos = (
    await fetch(`${backend}/api/auto/usuario/${data.id}`).then((res) => res.json())
  ).body;

  console.log(autos);

  if (autos.length == 0) {
    console.log("no hay autos");
    return;
  }
  let m = "";

  autos.forEach((auto) => {
    m += `<div class="border shadow-sm border rounded-3 p-2 my-2">
          <div class="row">
            <div class="col-10">
              <h5>${auto.nombreMarca} ${auto.nombreModelo}</h5>
              <div class="d-flex">
                <div class="text-secondary">${auto.matricula}</div>
              </div>
              <div class="text-secondary">${auto.color}</div>
            </div>
            <div class="col-2 d-flex align-items-center justify-content-center">
              <button class="btn btn-eliminar-auto" data-id="${auto.idAuto}">
                <img src="/Delete.svg" style="width: 30px; height: 30px" />
              </button>
            </div>
          </div>
        </div>`;
  });

  document.getElementById("vehiculo").innerHTML = m;

  // 👈 Agrega eventos después de insertar el HTML
  document.querySelectorAll(".btn-eliminar-auto").forEach((btn) => {
    btn.addEventListener("click", async () => {
      if (!confirm("¿Seguro que deseas eliminar este vehículo?")) return;
      const result = await fetch(`${backend}/api/auto/eliminarAuto/${btn.dataset.id}`, {
        method: "DELETE",
      }).then((e) => e.json());
      alert(result.message);
      cargarAutos();
    });
  });
}
async function cargarInfoAutos() {
  const marcas = (await fetch(`${backend}/api/auto/marca/cargarMarcas`).then((e) => e.json()))
    .content;
  modeloAutos = (await fetch(`${backend}/api/auto/modelo/cargarModelos`).then((e) => e.json()))
    .content;

  let op = "<option>Seleccione una opcion...</option>";

  marcas.forEach((marca) => {
    op += `<option value="${marca.idMarca}">${marca.nombreMarca}</option>`;
  });
  document.getElementById("formAgregarAutoMarca").innerHTML = op;
}
async function cargarTarjetas() {
  const a = await fetch(`${backend}/api/pago/usuario/cargarTarjetas/${data.id}`).then((e) =>
    e.json(),
  );
  const tarjetas = a.body;
  if (tarjetas.length == 0) {
    document.getElementById("tarjeta").innerHTML =
      '<p class="text-secondary">No se encontraron tarjetas</p>';
    return;
  }

  let m = "";

  tarjetas.forEach((tarjeta) => {
    m += `<div class="border shadow-sm border rounded-3 my-2 p-3">
          <div class="row">
            <div class="col-2 d-flex align-items-center justify-content-center">
              <h5 class="bg-primary p-2 border rounded text-light fw-bold">VISA</h5>
            </div>
            <div class="col-8">
              <h5>•••• •••• •••• ${tarjeta.numeroTarjeta.slice(12)}</h5>
              <div class="text-secondary">Expira ${tarjeta.pagoMes}/${tarjeta.pagoAnio}</div>
            </div>
            <div class="col-2 d-flex align-items-center justify-content-center">
              <button class="btn btn-eliminar-tarjeta" data-id="${tarjeta.idPago}">
                <img src="/Delete.svg" style="width: 30px; height: 30px" />
              </button>
            </div>
          </div>
        </div>`;
  });

  document.getElementById("tarjeta").innerHTML = m;

  // 👈 Agrega eventos después de insertar el HTML
  document.querySelectorAll(".btn-eliminar-tarjeta").forEach((btn) => {
    btn.addEventListener("click", async () => {
      if (!confirm("¿Seguro que deseas eliminar esta tarjeta?")) return;
      const result = await fetch(`${backend}/api/pago/eliminarTarjeta/${btn.dataset.id}`, {
        method: "DELETE",
      }).then((e) => e.json());
      alert(result.message);
      cargarTarjetas();
    });
  });
}
