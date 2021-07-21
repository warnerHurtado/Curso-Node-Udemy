
const Tarea = require('./tarea');

class Tareas {

    _listado = {};

    get listadoArr(){
        const listado = [];

        Object.keys(this._listado).forEach( key => {
            const tarea = this._listado[key];
            listado.push( tarea );

        })

        return listado;
    }

    constructor(){
        this._listado = {};
    }

    borrarTarea( id = '' ){
        if( this._listado[id]){
            delete this._listado[id];
        }
    }

    cargarTareasFromArr( tareas = [] ){

        tareas.forEach( tarea => {
            this._listado[tarea.id] = tarea;
        } )
    }

    crearTarea( desc = ''){

        const tarea = new Tarea(desc);
        this._listado[tarea.id] = tarea;
    }

    listadoCompleto(){

        console.log();
        this.listadoArr.forEach( (tarea, i) => {

            const indx = `${i+1}`.green;
            if( !tarea.completadaEn ){
                console.log(`${indx}. ${tarea.desc.desc} :: ${'Pendiente'.red}`);
            }else{
                console.log(`${indx}. ${tarea.desc.desc} :: ${'Completa'.green}`);
            }
        })
        console.log();

    }

    listarPendientesCompletadas( completadas = true) {

        console.log();
        let indx = 0;
        this.listadoArr.forEach( (tarea, i) => {

            if(completadas){
                if( tarea.completadaEn ){
                    indx += 1;
                    console.log(`${indx.toString().green}. ${tarea.desc.desc} :: ${tarea.completadaEn.green}`);
                }
            }else{
                if( !tarea.completadaEn ){
                    indx += 1;
                    console.log(`${indx.toString().green}. ${tarea.desc.desc} :: ${'Pendiente'.red}`);
                }
            }
        })
        console.log();
    }

    toggleCompletadas( ids = [] ){
        ids.forEach( id => {
            const tarea = this._listado[id];
            if( !tarea.completadaEn){
                tarea.completadaEn = new Date().toISOString();
            }
        })

        this.listadoArr.forEach( tarea => {
            if( !ids.includes(tarea.id )){
                this._listado[tarea.id].completadaEn = null;
            }
        })
    }
    


}

module.exports = Tareas;

