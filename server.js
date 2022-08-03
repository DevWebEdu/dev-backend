import express from 'express';
import  dotenv from 'dotenv';
// la mejor forma de usar las importaciones

// const express = require('express')
dotenv.config();

const categories= [{
    name:'Zapatos',
    description:'Zapatos para hombres, mujeres, niños y nuñas'
}]


const servidor = express();
const PORT = process.env.PORT;
console.log(PORT)
// indicamos que nuestro servodor podra entender y aceptar la informacion en formato JSON
servidor.use(express.json())

servidor.get('/',(req,res)=>{
    res.status(200).json({
        message:"Bienvenido a mi primera  API",
    })
})

servidor
    .route("/categories")
    .get((req,res)=>{
        
        return res.status(200).json({
        categories
        })
})
    .post((req,res)=>{
    // console.log(req.body);
    categories.push(req.body)
    const category = req.body
        return res.status(201).json({
            message:"Category created succesfully",
            content: category
        })
})


servidor.route("/categories/:id").get((req,res)=>{
    console.log(req.params);
    const {id}  = req.params;
    if(categories[id]!== undefined){
        return res.json({
            message:"la categoria es",
            content:categories[id]
        })
    }else{
        return  res.status(400).json({
            message:"La categoria no existe",
            content:null
        })
    }
    
})

servidor.listen(PORT, ()=>{
    console.log("servidor corriendo  en el puerto "+ {PORT});
})