const child_process = require('child_process');
const {resolve} = require('path');

child_process.exec(`node index.js cotizacion_cliente txt dolar 250000`,(error,resolve) => {
    if(error) {
        console.log(`exec error: ${error}`);
        return;
    }
    console.log(`Resultado: ${resolve}`);
});