import { autenticador } from "../../../src/auth";

const token = localStorage.getItem("PASE-Token");
const data = JSON.parse(atob(token.split(".")[1]));
const backend = "https://proyecto-pase-backend-production.up.railway.app";

document.addEventListener("DOMContentLoaded", async () => {
  autenticador;
  const usuario = await DatosdeUsuario();
  CargaDeDatos(usuario);
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
