const express = require("express");
const cors = require("cors");
require("dotenv").config(); // Para leer el archivo .env

const app = express();
const PORT = process.env.PORT;

// Middlewares globales
app.use(cors());
app.use(express.json());

app.use("/api/usuario", require("./routes/usuario.route"));

// Importar Rutas (Las crearemos en el siguiente paso)
// app.use('/api/auth', require('./routes/auth'));
// app.use('/api/estacionamiento', require('./routes/estacionamiento'));

app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
