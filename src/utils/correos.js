import nodemailer from "nodemailer"

const cliente  = nodemailer.createTransport({
    //                   SERVIDOR        | PUERTO
    // outlook >   outlook.office365.com | 587
    // hotmail >   smtp.live.com         | 587
    // gmail   >   smtp.gmail.com        | 587
    // icloud >    smtp.mail.me.com      | 587
    // yahoo >     smtp.mail.yahoo.com   | 587

    host: 'smtp.gmail.com',
    port: 587,
    auth:{
        user:process.env.EMAIL,
        pass:process.env.EMAIL_PASSWORD
    }
})

export const validarCorreo= async({detinatario,nombre,token}) =>{
   try {
    const resultado = await  cliente.sendMail({
        from: process.env.EMAIL,
        to:detinatario,
        subject:"Valida tu correo para la APP de backend",
        text:"Hola" + (nombre)+" por favor valida tu correo haciendo click en el siguiente enlace: http://mifront.com?token="+(token) 
     })
   } catch (error) {
        console.log(error.message)
   }
}



export const cambioPassword = async({destinatario,nombre})=>{
 try {
    await cliente.sendMail({
        from: process.env.EMAIL,
        to:destinatario,
        subject:"cambio de contraseña",
        html:`
        <h1>Cambia tu contraseña</h1>
        <p>Hola ${nombre} solicitaron cambio de contraseña </p>
        <h3>Atentamente</h3>
        <h5>Grupo de sistemas</h5>
        `
    })
 } catch (error) {
    console.log(error.message)
 }
}