# Proyecto-PASE

Hola, Esta es una explicacion detallada del todos los apartados de este proyecto, asi como una breve descripcion de cada una

- frontend: apartado visual e interactuable del usuario, basicamente todo lo que el usuario puede "ver y tocar", esta dividido en los siguientes puntos

* pages: lista de carpetas de dividen las paginas y funciones de todo el proyecto, se divide por usuario y por pagina.
* public: carpeta que aloja imagenes del proyecto
* src: carpeta en donde se alojan funciones que se reutilizan en otras paginas.
* index: pagina inicial donde inicia el proyecto, esta designada para el inicio de sesion/registro
* package-lock/package.json: archivos con instruccione sobre como ejecutar el proyecto (no tocar a menos de que sea necesario cambios sobre como levantar el proyecto)
* vite.config: archivo que configura las redirecciones entre paginas, si crean pagina nueva modificar este archivo para que vite los redirija a la pagina correcta.

- backend: pagina que realiza la conexion del frontend a la base de datos y a diversos servicios, para los requerimientos del proyecto actualmente solo realizamos conexion a base de datos, se divide en diversos modulos:

* config: carpeta donde realizamos conexion a diversos servicios / API's.
* controllers: carpeta donde se ejecutan todas las acciones solicitadas dentro del backend.
* middleware: carpeta de verificacion sobre diversas acciones antes de ejecutarse.
* models: carpeta donde se ejecutan acciones e interacciones en la base de datos.
* routes: carpeta que guarda todas las "direcciones" de los archivos y los redirige dependiendo de la solicitud.
* index.js: archivo que ejecuta todas las carpetas anteriores directa e indirectamente a peticion del frontend.
* package-lock/package.json: archivos con instruccione sobre como ejecutar el proyecto (no tocar a menos de que sea necesario cambios sobre como levantar el proyecto).

-gitignore: archivo que le ordea a git/github que archivo no guarde en el repositorio por cuestiones de espacio y seguridad.

- package-lock/package.json: archivos con instruccione sobre como ejecutar el proyecto (no tocar a menos de que sea necesario cambios sobre como levantar el proyecto)
