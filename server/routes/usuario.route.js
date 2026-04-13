const express = require("express");
const router = express.Router();
const usuarioControl = require("../controllers/usuario.controller");
const auth = require("../middleware/auth.middleware");

router.post("/registro", usuarioControl.registro);
router.post("/login", usuarioControl.login);
router.get("/verificar-sesion", auth, (req, res) => {
  res.json({ mensaje: "Token válido", usuario: req.user });
});

module.exports = router;
