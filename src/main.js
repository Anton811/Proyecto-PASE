import "./style.css";

document.querySelector("#main").innerHTML = `
      <div
        class="container d-flex justify-content-center align-items-center vh-100"
      >
        <div class="container bg-light m-5">
          <div class="d-flex justify-content-center m-3">
            <h2>Inicio de Sesión</h2>
          </div>
          <form>
            <div class="form-floating m-3">
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Ingresar Correo"
                class="form-control"
              />
              <label for="email" class="text-danger">Correo</label>
            </div>
            <div class="form-floating m-3">
              <input
                type="password"
                name="password"
                id="password"
                placeholder="Ingresar Contraseña"
                class="form-control"
              />
              <label for="email" class="text-danger">Contraseña</label>
            </div>

            <div class="d-flex justify-content-center my-5">
              <input
                type="submit"
                value="Iniciar Sesion"
                class="btn btn-danger fw-bold"
              />
            </div>
          </form>

          <div class="d-flex justify-content-between m-3">
            <a
              href="/pages/client/dashboard/"
              class="text-secondary text-decoration-none fw-bold"
              >¿Olvidaste la Contraseña?</a
            >
            <a href="" class="text-danger text-decoration-none fw-bold"
              >Registrarse</a
            >
          </div>
        </div>
      </div>
`;
