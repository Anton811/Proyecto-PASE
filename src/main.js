import "./style.css";

document.querySelector("#main").innerHTML = `
      <div class="container w-75 bg-light p-5 border rounded-3">
        <h2 class="d-flex justify-content-center">Inicio de Sesión</h2>

        <!-- Form Inicio de Sesion -->
        <form class="form">
          <label for="email" class="text-danger fw-bold my-1">Email</label>
          <input
            type="email"
            name="email_usuario"
            id="email_usuario"
            class="form-control mb-2"
          />
          <label for="password" class="text-danger fw-bold my-1"
            >Contraseña</label
          >
          <input
            type="password"
            name="password_usuario"
            id="password_usuario"
            class="form-control"
          />

          <div class="container div justify-content-center d-flex my-4">
            <input
              type="submit"
              value="Iniciar Sesion "
              class="d-flex btn btn-danger justify-content-center fw-bold"
            />
          </div>
        </form>

        <!-- boton olvidaste la contraseña y link a registro-->
        <div class="d-flex justify-content-between">
          <a href="/pages/client/dashboard/" class="text-secondary text-decoration-none"
            >¿Olvidaste tu contraseña?</a
          >
          <a href="" class="text-danger text-decoration-none fw-bold"
            >Registrarse</a
          >
        </div>
      </div>
`;
