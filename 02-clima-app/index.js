require('dotenv').config();

const { inquirerMenu, pausa, leerInput, listarLugares } = require("./helpers/inquirer");
const Busquedas = require("./models/busquedas");

const main = async() => {

    const busquedas = new Busquedas();

    let opt = 0;
    do {
        opt = await inquirerMenu()

        switch ( opt ) {

            case 1:
            //Mostrar mensaje
            const lugar = await leerInput('Ingrese el nombre de la ciudad: ');

            //Buscar los lugares
            const lugares = await busquedas.ciudad( lugar );

            //Seleccionar el lugar
            const id = await listarLugares( lugares );

            if( id !== '0'){
                
                const lugarSeleccionado = lugares.find( l => l.id === id);
                // Guardar en DB 
                busquedas.agregarHistorial( lugarSeleccionado.nombre );
                
                //Clima
                const clima = await busquedas.climaLugar( lugarSeleccionado.lat, lugarSeleccionado.lng);
    
                //Mostrar resultados
                    console.clear();
                    console.log('\nInformación de la ciudad\n'.blue);
                    console.log('Ciudad', lugarSeleccionado.nombre);
                    console.log('Lat', lugarSeleccionado.lat);
                    console.log('Lng', lugarSeleccionado.lng);
                    console.log('Temperatura', clima.tem);
                    console.log('Mínima', clima.min);
                    console.log('Máxima', clima.max);
                    console.log('Como está el clima:', clima.desc);
                
            }
                break;

            case 2:
                //await busquedas.leerDB();

                busquedas.historial.forEach( (lugar, i) => {
                    const idx = `${ i + 1 }.`.green;
                    console.log(`${ idx } ${ lugar}`);
                    
                })
                break;
        
            default:
                break;
        }
        
        console.log({ opt });
        await pausa();
        
        
    } while ( opt != 0 );
    
}

main();