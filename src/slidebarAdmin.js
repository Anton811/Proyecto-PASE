document.getElementById("navAdmin").innerHTML =
  `<div class="collapse navbar-collapse">
        <ul class="navbar-nav w-100 justify-content-around">
          <li class="nav-item">
            <a class="nav-link" href="/pages/admin/dashboard/"
              ><h5 class="text-light">Dashboard</h5></a
            >
          </li>
          <li class="nav-item">
            <a class="nav-link" href="/pages/admin/reservas/"><h5 class="text-light">Reservas</h5></a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="/pages/admin/cliente/"><h5 class="text-light">Clientes</h5></a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href=""
              ><input
                type="button"
                value="Cerrar Sesion"
                class="btn-danger btn fw-bold"
            /></a>
          </li>
        </ul>
      </div>`;
