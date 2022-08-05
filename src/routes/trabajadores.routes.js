import {Router} from "express";
import {cambiarPassword, login, postTrabajador, validarTrabajador, perfil} from "../controllers/trabajadores.controllers.js"
import {verificarToken,isGerente} from "../utils/validador.js"

export const trabajadoresRouter  = Router()
trabajadoresRouter.post("/registro",verificarToken,isGerente, postTrabajador)
trabajadoresRouter.post("/validar-trabajador",validarTrabajador)
trabajadoresRouter.post("/cambiar-password", cambiarPassword)
trabajadoresRouter.post("/login", login)
trabajadoresRouter.get("/me",verificarToken, perfil)