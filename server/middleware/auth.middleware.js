const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const authToken = req.header("Authorization");

  if (!authToken) {
    return res
      .status(401)
      .json({ mensaje: "Acceso denegado. No hay sesión activa." });
  }

  try {
    const token = authToken.split(" ")[1];

    const cifrado = jwt.verify(token, process.env.JWT_SECRET);

    req.user = cifrado;

    next();
  } catch (error) {
    res.status(401).json({ mensaje: "Sesión expirada o inválida." });
  }
};
