
require('colors');

const { guardarDB, leerDB } = require('./helpers/guardarArchivo');
const { inquirerMenu, 
        pausa,
        leerInput,
        listadoTareasBorrar,
        confirmar,
        mostrarListadoCheckList
     } = require('./helpers/inquirer');
const Tareas = require('./models/tareas')

console.clear();

const main = async() => {

    let opt = '';
    const tareas = new Tareas();

    const tareaDB = leerDB();

    if( tareaDB ){
        tareas.cargarTareasFromArr( tareaDB );
    }


    do{
        opt = await inquirerMenu();
        
        switch (opt) {
            case '1':
                //Crear opción
                const desc = await leerInput('Descripción: ');
                tareas.crearTarea(desc);
                break;
            case '2':
                tareas.listadoCompleto();
                //console.log(tareas.listadoArr)
                break;
            case '3':
                tareas.listarPendientesCompletadas();
                break;
            case '4':
                tareas.listarPendientesCompletadas(false);
                break;
            case '5': //Completar tareas
                const ids = await mostrarListadoCheckList( tareas.listadoArr );
                tareas.toggleCompletadas( ids );
                break;
            case '6'://Borrar
                const id = await listadoTareasBorrar( tareas.listadoArr );
                if(id != '0'){
                    const ok = await confirmar('¿Eliminar tarea? ')
                    if( ok ){
                        tareas.borrarTarea( id );
                        console.log('Tarea borrada con éxito!'.yellow);
                    }
                }
                break;

        }


        guardarDB( tareas.listadoArr );
        
        await pausa();
        
    }while(opt !== '0')

}


main();
