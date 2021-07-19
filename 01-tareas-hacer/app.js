const { inquirerMenu, pausa } = require('./helpers/inquirer');

require('colors');

console.clear();

const main = async() => {

    console.log('Hello world');

    let opt = '';

    do{
        opt = await inquirerMenu();
        console.log({opt});
        
        await pausa();
        //if (opt !== '0') await pausa();
        
    }while(opt !== '0')

}


main();
