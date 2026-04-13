const db = require("../config/db.config");

const usuario = {
  buscarRegistro: async (data) => {
    const { email, telefono } = data;
    const [result] = await db.query(
      "SELECT * from usuario WHERE correo = ? OR telefono = ?",
      [email, telefono],
    );

    return result.length > 0;
  },
  buscarLogin: async (data) => {
    const [result] = await db.query("SELECT * FROM usuario WHERE correo = ?", [
      data,
    ]);

    return result[0];
  },
  registro: async (data) => {
    const {
      nombre,
      app,
      apm,
      telefono,
      email,
      idTypeUsuario,
      fecha,
      password,
    } = data;

    const [result] = await db.query(
      "INSERT INTO usuario (nombreUsuario, appUsuario, apmUsuario, telefono, correo, idTipoUsuario, fechaDeRegistro, password) VALUES (?, ?, ?, ?, ?, ?, NOW(), ?)",
      [nombre, app, apm || null, telefono, email, idTypeUsuario, password],
    );
    return result;
  },
};

module.exports = usuario;
