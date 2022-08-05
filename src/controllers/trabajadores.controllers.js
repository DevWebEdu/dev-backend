import {trabajadoresRequestDTO,cambiarPasswordRequestDTO, loginRequestDTO} from "../dtos/trabajadores.dtos.js"
import {PrismaConnector} from "../prisma.js"
import { cambioPassword, validarCorreo } from "../utils/correos.js"
import cryptoJs from "crypto-js"
import bcryptjs from "bcryptjs"
import jwt from 'jsonwebtoken'


export const postTrabajador = async(req,res)=>{
    try{
        const {password, ...data} = trabajadoresRequestDTO(req.body);
        const password_encriptada = bcryptjs.hashSync(password,10)
        console.log(password_encriptada)
        const result = await PrismaConnector.trabajador.create({data:{password: password_encriptada,...data}})

        const horaActual = new Date()
        const token =cryptoJs.AES.encrypt(JSON.stringify({
            id:result.id,
            caducidad : new Date(
                horaActual.getFullYear(),
                horaActual.getMonth(),
                horaActual.getDate(),
                horaActual.getHours()+2
            )
    }),process.env.LLAVE_ENCRIPTACION
    ).toString()
        
        await validarCorreo({
            detinatario:result.email, nombre:result.nombre,token
        })
        return res.json({
            message: "Usuario registrado exitosamente",
            result
        })
    }catch(error){
        return res.status(400).json({
            message: "Error al crear el usuario",
            result: error.message
        })
    }
}

export const validarTrabajador = async( req,res)=>{
    const {token}= req.body
    try {
        const data = cryptoJs.AES.decrypt(token,process.env.LLAVE_ENCRIPTACION).toString(cryptoJs.enc.Utf8)
        console.log(data)
        if(!data){
            throw new Error("token no valida")
        }
        const infoToken=JSON.parse(data)
        if (infoToken.caducidad < new Date()){
            throw new Error("token ya vencio")
        }
        //busco trabajador
        const trabajador = await PrismaConnector.trabajador.findUniqueOrThrow({
            where:{id:infoToken.id}
        })
        //certifico si esta validado o no
        if(trabajador.validado){
            throw new Error("usuario ya fue validado")
        }
        // lo valido si no esta validado
        await PrismaConnector.trabajador.update({
            data:{validado:true},
            where:{id:infoToken.id}
        })

        return res.json({
            message: "Trabajador validado exitosamente",
            result:null
        })
    } catch (error) {
        return res.status(400).json({
            message: "Token invalida",
            result:error.message
        })
    }
}

export const cambiarPassword = async( req,res)=>{
    try {
        const data= cambiarPasswordRequestDTO(req.body)
        const trabajador = await PrismaConnector.trabajador.findUniqueOrThrow({
            where : {email:data.email}
        })
        if(bcryptjs.compareSync(data.antiguaPassword,trabajador.password)){
            const nuevaPassword = bcryptjs.hashSync(data.nuevaPassword)
            await PrismaConnector.trabajador.update({
                data:{
                    password:nuevaPassword
                },
                where:{
                    email:data.email
                }
            })

            await cambioPassword({
                destinatario:trabajador.email,
                nombre: trabajador.nombre
            })

            return res.json({
                message:"Contraseña actualizada",
                result:null
            })
        }else{
            throw new Error ("la contraseña es incorrecta")
        }
    } catch (error) {
        return res.json({
            message:"Error al ingresar",
            result:error.message
        })
    }
}

export const login = async (req,res) =>{
   const {body} = req
   console.log(body)
   try {
        const data = loginRequestDTO(body)
        const trabajador = await PrismaConnector.trabajador.findUniqueOrThrow({
            where : {email:data.email}
        })
        console.log(data)
        console.log(trabajador)
        if(bcryptjs.compareSync(data.password,trabajador.password)){
            console.log("si es la contraseña")
            const token =jwt.sign({id:trabajador.id, message:"Mensaje oculto"},process.env.JWT_SECRET,{expiresIn:"2h"})
            return res.json({
                message:"Bienvenido",
                result:token,
            })
        }else{
            console.log("contraseña invalida")
            throw new Error("Password invalida")
        }

   } catch (error) {
        return res.status(400).json({
            message:"Error al ingresar",
            result:error.message
        })
   }
}


export const perfil= async(req,res) => {
    const {password, ...result} = req.user
    console.log(req.user)
    return res.json({
        message:null,
        result
    })

}


