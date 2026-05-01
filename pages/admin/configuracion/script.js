const backend = import.meta.env.VITE_BACKEND;
console.log("Backend URL:", backend);
var tablaCliente = document.getElementById("tablaTipoCliente");
var tablaEntidad = document.getElementById("tablaEstado");
const registroTipoUsuario = document.getElementById("formAgregarTipoUsuario");
const registroEstado = document.getElementById("formAgregarEstado");

document.addEventListener("DOMContentLoaded", async () => {
  await cargarTablacliente();
  await cargarTablaEstado();
});

registroTipoUsuario.addEventListener("submit", async (e) => {
  e.preventDefault();

  const tipoUsuario = {
    nombre: document.getElementById("formAgregarTipoUsuarioNombre").value,
  };

  const response = await fetch(
    `${backend}/api/tipoUsuario/agregarTipoUsuario`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(tipoUsuario),
    },
  );
  const data = await response.json();
  alert(data.message);
  await cargarTablacliente();
});

registroEstado.addEventListener("submit", async (e) => {
  e.preventDefault();

  const estado = {
    nombre: document.getElementById("formAgregarEstadoNombre"),
  };

  const result = await fetch(`${backend}/api/tipoUsuario/buscarTipoUsuario`);
});

async function cargarTablacliente() {
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

async function cargarTablaEstado() {
  tablaEntidad.innerHTML = "";
  const data = await fetch(`${backend}/api/sucursal/cargarEstados`);
  const result = await data.json();
  let tabla = "";
  result.content.forEach((estado) => {
    tabla += `<tr>
                <td><h6>${estado.nombreEstado}</h6></td>
              </tr>`;
  });
}
