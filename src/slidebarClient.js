document.addEventListener("DOMContentLoaded", () => {
  document.querySelector("#nav").innerHTML = `
    <div class="offcanvas-header mt-3">
        <img
          src="/PaseLogo.svg"
          style="width: 60px; height: 60px"
          viewBox="0 0 16 16"
          alt=""
        />
        <h1 class="offcanvas-title">Menu</h1>
        <button
          class="btn-close text-reset"
          data-bs-dismiss="offcanvas"
        ></button>
      </div>
      <div class="offcanvas-body px-0">
        <div class="container-fluid my-5">
          <div class="d-flex justify-content-center">
            <a href="/pages/client/dashboard/" class="text-decoration-none d-flex"
              ><img
                src="/Dashboard.svg"
                style="width: 30px; height: 30px"
                viewBox="0 0 16 16"
              />
              <h2 class="text-danger">Dashboard</h2></a
            >
          </div>
        </div>
        <div class="container-fluid my-5">
          <div class="d-flex justify-content-center">
            <a href="/pages/client/historial/" class="text-decoration-none d-flex"
              ><img
                src="/History.svg"
                style="width: 30px; height: 30px"
                viewBox="0 0 16 16"
              />
              <h2 class="text-danger">Mis Reservas</h2></a
            >
          </div>
        </div>
        <div class="container-fluid my-5">
          <div class="d-flex justify-content-center">
            <a href="" class="text-decoration-none d-flex"
              ><img
                src="/Settings.svg"
                style="width: 30px; height: 30px"
                viewBox="0 0 16 16"
              />
              <h2 class="text-danger">Configuracion</h2></a
            >
          </div>
        </div>
        <div class="container-fluid my-5">
          <div class="d-flex justify-content-center">
            <a href="/" class="text-decoration-none d-flex">
            <button type="button" class="btn-danger btn fw-bold">
              Cerrar Sesion
            </button>
            </a>
          </div>
        </div>
      </div>
`;
});
