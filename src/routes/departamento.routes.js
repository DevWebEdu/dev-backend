import {Router} from "express";
import {getDepartamentos,postDepartamentos,updateDepartamento,deleteDepartamento,devolverDepartamento} from '../controllers/departamentos.controllers.js'

export const departamentosRouter = Router()

departamentosRouter
    .route("/departamentos")
    .get(getDepartamentos)
    .post(postDepartamentos)
    
    
departamentosRouter.route("/departamento/:id")   
                                            .put(updateDepartamento)
                                            .delete(deleteDepartamento)
                                            .get(devolverDepartamento)