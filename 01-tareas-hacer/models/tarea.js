
const { v4: uudiv4 } = require('uuid');

class Tarea {

    id = '';
    desc = '';
    completadaEn = null;

    constructor(desc){

        this.id = uudiv4();
        this.desc = desc;
        this.completadaEn = null;
        
    }

}

module.exports = Tarea;