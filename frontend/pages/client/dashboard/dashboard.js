document.addEventListener("DOMContentLoaded", async () => {
  const token = localStorage.getItem("PASE-Token");
  console.log(token);

  if (!token) {
    alert("Sesion no iniciada, Se redigira a la pagina de inicio");
    window.location.href = "../";
  }

  try {
    const respuesta = await fetch(
      "http://localhost:3000/api/usuario/verificar-sesion",
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`, // Así le enviamos el token al servidor
        },
      },
    );

    if (!respuesta.ok) {
      throw new Error("Token expirado o inválido");
    }

    console.log("Sesión verificada, bienvenido al Dashboard");
  } catch (error) {
    localStorage.removeItem("PASE-Token"); // Borramos el token basura
    window.location.href = "/login.html";
  }
});
