import express from 'express'
import {departamentosRouter} from "./routes/departamento.routes.js"
import {trabajadoresRouter} from "./routes/trabajadores.routes.js"

const app = express()

const PORT = process.env.PORT

app.use(express.json())
app.use(departamentosRouter)
app.use(trabajadoresRouter)

app.listen(PORT, ()=>{
    console.log("servidor corriendo")
})

// app.get("/departamentos", async (req,res)=>{
//     try{
//         const resultado = await PrismaConnector.departamento.findMany();
//         console.log(resultado)
//         return res.json({
//             message:"hola",
//             content : resultado
//         })
//     }catch(razon){
//         return res.json({
//             message:"Algo ocurrio en la base de datos"
//         })
//     }


//     //forma con Then
//     // PrismaConnector.departamento
//     // .findMany()
//     // .then((resultado)=>{
//     //     console.log(resultado)
//     //     return res.json({
//     //         message :"Hola",
            
//     //     })
//     // })
//     // .catch((razon)=>{
//     //     console.error(razon)
//     //     return res.json({
//     //         message :"Algo ocurrio en la Base de datos",
            
//     //     })
//     // })

// })


