import "./style.css";

const registro = document.getElementById("formRegistro");
const login = document.getElementById("formLogin");

registro.addEventListener("submit", async (e) => {
  e.preventDefault();
  const password = document.getElementById("passwordRegistro").value;
  const confirmPassword = document.getElementById(
    "confirmarPasswordRegistro",
  ).value;
  if (password != confirmPassword) {
    return alert("contraseña no coincide");
  }

  const nuevoUsuario = {
    nombre: document.getElementById("nombreRegistro").value,
    app: document.getElementById("appRegistro").value,
    apm: document.getElementById("apmRegistro").value || "",
    email: document.getElementById("emailRegistro").value,
    telefono: document.getElementById("telefonoRegistro").value,
    password: document.getElementById("passwordRegistro").value,
    idTypeUsuario: "1",
  };

  const response = await fetch(
    "proyecto-pase-backend-production.up.railway.app/api/usuario/registro",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(nuevoUsuario),
    },
  );
  const data = await response.json();
  alert(data.mensaje);
});

login.addEventListener("submit", async (e) => {
  e.preventDefault();

  const VerificarUsuario = {
    correo: document.getElementById("emailLogin").value,
    password: document.getElementById("passwordLogin").value,
  };

  const result = await fetch("http://localhost:3000/api/usuario/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(VerificarUsuario),
  });
  const data = await result.json();

  console.log(data.mensaje);

  if (data.token) {
    localStorage.setItem("PASE-Token", data.token);
    window.location.href = "/pages/client/dashboard/";
  }
});
