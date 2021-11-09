const https = require("https");
const fs = require("fs"); //se agrego la fs


const argumentos = process.argv.slice(2); // cambio de 4 a 2
// el slice (2) te salta los dos primeros argumentos pero aun se consideran

let codigo = argumentos[0];
let nombreCodigo = argumentos[1];
let unidadMedida = argumentos[2];
let conversion = Number(argumentos[3]);

https.get("https://mindicador.cl/api", 
(resp) =>{
    resp.on("data", (data) =>{
        let indicador_economico =  JSON.parse(data);
        console.log(indicador_economico);
        
        let dolar = indicador_economico.dolar.valor; //.dolar.valor proviene de la API
        console.log(dolar);

        let dolar_convertido = (conversion/dolar).toFixed(2); //aproxima a dos decimales
        console.log(dolar_convertido);

        fs.writeFile(`${codigo}.${nombreCodigo}`, //el writeFile te crea un archivo
        //el \n es un salto de linea, continuado del template que pide el desafio
        `Fecha: ${Date()}
        \n Fue realizada cotización con los siguientes datos: 
        \n Cantidad de pesos a convertir: ${conversion}
        \n Convertidor a ${unidadMedida} da un total de: ${dolar_convertido}`,
        "utf-8", () =>{
            console.log(`Conversion exitosa, se creará un archivo \n`);
            fs.readFile(`${codigo}.${nombreCodigo}`, "utf-8", (/*error,*/ data)=>{
                console.log(`${data}`);
            }) 
        }
        ) 
    })
})
.on("error", (error) =>{
    console.log("Error: " + error.message)
})