const inquirer = require('inquirer');
require('colors');

const questions = [
    {
        type: 'list',
        name: 'opcion',
        message: '¿Qué desea hacer?',
        choices: [
            {
                value: '1',
                name: `${'    1.'.green} Crear tarea`
            },
            {
                value: '2',
                name: `${'    2.'.green} Listar tareas`
            },
            {
                value: '3',
                name: `${'    3.'.green} Listar tareas completadas`
            },
            {
                value: '4',
                name: `${'    4.'.green} Listar tareas pendientes`
            },
            {
                value: '5',
                name: `${'    5.'.green} Completar tarea(s)`
            },
            {
                value: '6',
                name: `${'    6.'.green} Borrar tarea`
            },
            {
                value: '0',
                name: `${'    0.'.green} Salir\n`
            }
        ]
    }
]

const inquirerMenu = async() => {
    console.clear();

    console.log('   ========================='.green);
    console.log('     Selecciona una opción '.white);
    console.log('   =========================\n'.green);

    const {opcion} = await inquirer.prompt(questions)

    return opcion;

}

const pausa = async() => {

    await inquirer.prompt([{

        type: 'input',
        name: 'enter',
        message: `\nPresione ${'ENTER'.green} para continuar\n`

    }])

}

const leerInput = async(message) => {

    const question = [
        {
            type: 'input',
            name: 'desc',
            message,
            validate( value ){
                if( value.length === 0 ){
                    return 'Por favor ingrese un valor';
                }
                return true;
            }
        }
    ];

        return await inquirer.prompt(question);
}

const listadoTareasBorrar = async(tareas = []) => {

    const choices = tareas.map( (tarea, i) => {

        const idx = `${i + 1 }`.green;
        return {
            value: tarea.id,
            name: `${ idx } ${ tarea.desc.desc }`
        }
    });

    choices.unshift({
        value: '0',
        name: '0.'.green + ' Cancelar'
    })

    const questions = [{
        type: 'list',
        name: 'id',
        message: 'Borrar',
        choices
    }]

    const { id } = await inquirer.prompt(questions);

    return id;

}

const confirmar = async(message) => {
    const question = [{
        type: 'confirm',
        name: 'ok', 
        message
    }];

    const { ok } = await inquirer.prompt(question);
    return ok;
}

const mostrarListadoCheckList = async(tareas = []) => {

    const choices = tareas.map( (tarea, i) => {

        const idx = `${i + 1 }`.green;

        return {
            value: tarea.id,
            name: `${ idx } ${ tarea.desc.desc }`,
            checked: ( tarea.completadaEn ) ? true : false
        }
    });

    const pregunta = 
        [{
            type: 'checkbox',
            name: 'ids',
            message: 'Selecciones',
            choices
        }]

    const { ids } = await inquirer.prompt(pregunta);
    return ids;
}

  module.exports = {
      inquirerMenu,
      pausa, 
      leerInput,
      listadoTareasBorrar,
      confirmar,
      mostrarListadoCheckList
  }