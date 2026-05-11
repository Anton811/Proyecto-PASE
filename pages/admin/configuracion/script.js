const backend = import.meta.env.VITE_BACKEND;
var tablaCliente = document.getElementById("tablaTipoCliente");
var tablaEntidad = document.getElementById("tablaEstado");
var tablaMunicipio = document.getElementById("tablaMunicipio");
const registroTipoUsuario = document.getElementById("formAgregarTipoUsuario");
var municipiosCargados;

document.addEventListener("DOMContentLoaded", async () => {
  await cargarTablaCliente();
  await cargarEstado();
  await cargarMunicipio();
  await cargarSucursales();
  await cargarMarcas();
  await cargarModelos();
});

registroTipoUsuario.addEventListener("submit", async (e) => {
  e.preventDefault();

  const tipoUsuario = {
    nombre: document.getElementById("formAgregarTipoUsuarioNombre").value,
  };

  const response = await fetch(`${backend}/api/tipoUsuario/agregarTipoUsuario`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(tipoUsuario),
  });
  const data = await response.json();
  alert(data.message);
  await cargarTablacliente();
});

// Agregar Estado
document.getElementById("formAgregarEstado").addEventListener("submit", async (e) => {
  e.preventDefault();

  const estado = {
    nombre: document.getElementById("formAgregarEstadoNombre").value,
  };

  const result = await fetch(`${backend}/api/sucursal/agregarEstado`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(estado),
  });
  const data = await result.json();
  alert(data.message);
  await cargarEstado();
});

// Agregar Municipio
document.getElementById("formAgregarMunicipio").addEventListener("submit", async (e) => {
  e.preventDefault();
  const municipio = {
    nombre: document.getElementById("formAgregarMunicipioNombre").value,
    idEstado: document.getElementById("formAgregarMunicipioEstado").value,
  };

  const result = await fetch(`${backend}/api/sucursal/agregarMunicipio`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(municipio),
  });
  const data = await result.json();
  alert(data.message);

  await cargarMunicipio();
});

// Agregar Sucursal
document.getElementById("formAgregarSucursal").addEventListener("submit", async (e) => {
  e.preventDefault();

  const sucursal = {
    nombre: document.getElementById("formAgregarSucursalNombre").value,
    direccion: document.getElementById("formAgregarSucursalDireccion").value,
    municipio: document.getElementById("formAgregarSucursalMunicipio").value,
    piso: document.getElementById("formAgregarSucursalPiso").value,
    numZona: document.getElementById("formAgregarSucursalZona").value,
  };

  const data = await fetch(`${backend}/api/sucursal/agregarSucursal`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(sucursal),
  });
  const result = await data.json();

  alert(result.message);
});

// Agregar Marca
document.getElementById("formAgregarMarca").addEventListener("submit", async (e) => {
  e.preventDefault();

  const marca = {
    nombre: document.getElementById("formAgregarMarcaNombre").value,
  };
  const data = await fetch(`${backend}/api/auto/marca/agregarMarca`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(marca),
  });

  const result = await data.json();

  alert(result.message);

  await cargarMarcas();
});

// Agregar Modelo
document.getElementById("formAgregarModelo").addEventListener("submit", async (e) => {
  e.preventDefault();

  const modelo = {
    nombre: document.getElementById("formAgregarModeloNombre").value,
    marca: document.getElementById("formAgregarModeloMarca").value,
  };

  const data = await fetch(`${backend}/api/auto/modelo/agregarModelo`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(modelo),
  });

  const result = await data.json();

  alert(result.message);

  await cargarModelos();
});
// Esta accion permite que, dependiendo de que estado se aplique en formAgregarSucursal,solo muestre
// municipios acordes a el.
document.getElementById("formAgregarSucursalEstado").addEventListener("change", (e) => {
  const idEstado = document.getElementById("formAgregarSucursalEstado").value;
  let municipioSelect = document.getElementById("formAgregarSucursalMunicipio");

  let municipioSeleccionado = municipiosCargados.filter(
    (estado) => estado.idEstado == idEstado,
  );

  let op = "";
  municipioSelect.innerHTML = "";

  municipioSeleccionado.forEach((municipio) => {
    op += `<option value="${municipio.idMunicipio}">${municipio.nombreMunicipio}</option>`;
  });
  municipioSelect.innerHTML = op;
});
//Agregar Estatus de Reserva
document.getElementById("formAgregarEstatus").addEventListener("submit", async (e) => {
  e.preventDefault();

  const reserva = {
    nombre: document.getElementById("formAgregarEstatusNombre").value,
    color: document.getElementById("formAgregarEstatusColor").value,
  };
  console.log(reserva.nombre);
  console.log(reserva.color);
  const result = await fetch(`${backend}/api/reserva/estatus/agregarEstatusReserva`, {
    method: "POST",
    headers: { "Content-Type": "Application/json" },
    body: JSON.stringify(reserva),
  }).then((res) => res.json());

  alert(result.message);
});

async function cargarTablaCliente() {
  tablaCliente.innerHTML = "";
  const data = await fetch(`${backend}/api/tipoUsuario/buscarTipoUsuario`);
  const result = await data.json();

  let tabla = "";
  result.content.forEach((tipo) => {
    tabla += `<tr>
                <td><h6>${tipo.nombreTipoUsuario}</h6></td>
                <td><div><input type="button" class="p-1 btn btn-primary" value = "Modificar" /></div></td>
              </tr>`;
  });

  tablaCliente.innerHTML = tabla;
}

async function cargarEstado() {
  tablaEntidad.innerHTML = "";
  const data = await fetch(`${backend}/api/sucursal/cargarEstados`);
  const result = await data.json();
  let tabla = "";
  let op = "";
  result.content.forEach((estado) => {
    tabla += `<tr>
                <td><h6>${estado.nombreEstado}</h6></td>
              </tr>`;
    op += `<option value="${estado.idEstado}">${estado.nombreEstado}</option>`;
  });
  tablaEntidad.innerHTML = tabla;
  document.getElementById("formAgregarMunicipioEstado").innerHTML = op;
  document.getElementById("formAgregarSucursalEstado").innerHTML = op;
}

async function cargarMunicipio() {
  tablaMunicipio.innerHTML = "";
  const data = await fetch(`${backend}/api/sucursal/cargarMunicipio`);
  const result = await data.json();
  let tabla = "";
  result.content.forEach((municipio) => {
    tabla += `<tr>
                <td><h6>${municipio.nombreMunicipio}</h6></td>
                <td><h6>${municipio.nombreEstado}</h6></td>
              </tr>`;
  });
  municipiosCargados = result.content;
  tablaMunicipio.innerHTML = tabla;
}

async function cargarSucursales() {
  const data = await fetch(`${backend}/api/sucursal/cargarSucursales`);
  const result = await data.json();
  let tabla = "";
  result.content.forEach((s) => {
    tabla += `<tr>
                <td>${s.nombreSucursal}</td>
                <td>${s.direccionSucursal}</td>
                <td>${s.nombreMunicipio}</td>
                <td>${s.nombreEstado}</td>
                <td>
                  <button class="btn btn-primary btn-sm">Modificar</button>
                  <button class="btn btn-danger btn-sm">Eliminar</button>
                </td>
              </tr>`;
  });

  document.getElementById("tablaSucursal").innerHTML = tabla;
}

async function cargarMarcas() {
  const data = await fetch(`${backend}/api/auto/marca/cargarMarcas`);
  const result = await data.json();
  let tabla = "";
  let op = '<option class="text-secondary">Seleccione una opcion...</option>';
  result.content.forEach((e) => {
    tabla += `<tr><td>${e.nombreMarca}</td></tr>`;
    op += `<option value="${e.idMarca}">${e.nombreMarca}</option>`;
  });
  document.getElementById("tablaMarcaAuto").innerHTML = tabla;
  document.getElementById("formAgregarModeloMarca").innerHTML = op;
}

async function cargarModelos() {
  const data = await fetch(`${backend}/api/auto/modelo/cargarModelos`);
  const result = await data.json();
  let tabla = "";
  result.content.forEach((e) => {
    tabla += `<tr><td>${e.nombreModelo}</td><td>${e.nombreMarca}</td></tr>`;
  });
  document.getElementById("tablaModeloAuto").innerHTML = tabla;
}
