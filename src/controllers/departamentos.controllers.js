import {PrismaConnector} from '../prisma.js'
import {departamentoRequestDTO} from "../dtos/departamentos.dtos.js"

export const getDepartamentos = async(req,res)=>{
    try{
        const departamentos = await PrismaConnector.departamento.findMany();
        return res.json({
            result:departamentos,
            message:null
        })

    }catch(error){
        return res.status(400).json({
            message:"Error al devolver departamentos",
            result: error
        })
    }
}


//crear departamento

export const postDepartamentos =async ( req,res) =>{
  
    try{
        const data = departamentoRequestDTO(req.body)
        const result = await PrismaConnector.departamento.create({data})
        return res.status(201).json({
            message:"Departamento creado exitosamente",
            result,
        })
    }catch(error){
        return res.status(400).json({
            message:"Error al crear el departamento",
            result: error.message
        })
    }
}
//Editarq
export const updateDepartamento = async (req,res) =>{ 
    try{
        const {
            id
        } = req.params;
        const data= departamentoRequestDTO(req.body)
        const result=await PrismaConnector.departamento.update({data, where:{id: +id}})
        return res.json({
            message:"Departamento actualizado exitosamente",
            result
        })

    
    }catch(error){
        return res.status(400).json({
            message:"Error al actualizar el departamento",
            result:error.message
        })
    }
}

//eliminar
export const deleteDepartamento = async (req,res)=>{
    try{
        const {id}=req.params;
        const result = await PrismaConnector.departamento.delete({
            where:{
                id:+id
            }
        })
        return res.json({
            message:"Departamento Eliminado exitosamente",
            result
        })

    }catch(error){
        return res.status(400).json({
            message:"Error al eliminar el departamento",
            result: error.message
        })
    }
}

//devolver un departamento
export const devolverDepartamento = async(req,res)=>{
    try{
        const {id}= req.params
        const result = await PrismaConnector.departamento.findFirst({
            where:{id:+id}
        })
        return res.json({
            message:null,
            result
        })
    }catch(error){
        return res.status(400).json({
            message:"Error al eliminar el departamento",
            result: error.message
        })
    }
}