
const fs = require('fs');
const axios = require('axios');

class Busquedas {

   historial = [];
   dbPath = './db/database.json';

   constructor() {
        this.leerDB();
   }

   get paramsMapbox() {
        return {
            'access_token': process.env.MAPBOX_KEY,
            'limit': 5,
            'language': 'es'
        }
    }

    get paramsWeather(){
        return{
            appid: process.env.OPENWEATHER_KEY,
            units: 'metric',
            lang: 'es'
        }
    }

   async ciudad( lugar ){
        const baseURL = `https://api.mapbox.com/geocoding/v5/mapbox.places/${lugar.desc}.json`;
        try{

            const instance = await axios.create({
                baseURL,
                params: this.paramsMapbox
            });
            const resp = await instance.get();
     
            return resp.data.features.map( lugar => ({
                id: lugar.id,
                nombre: lugar.place_name,
                lng: lugar.center[0],
                lat: lugar.center[1],
            }));
            
        }catch(err){
            return[]; //Retorno de lugare que coincidan
        }
       
       

   }

   async climaLugar( lat, lon ){
        try {
            //instance axios.create()
            const instance = await axios.create({
                baseURL: 'https://api.openweathermap.org/data/2.5/weather',
                params:{
                    ...this.paramsWeather,
                    lat,
                    lon,
                }
            });
            //resp.data
            const resp = await instance.get();            
            return {
                desc: resp.data.weather[0].description,
                min: resp.data.main.temp_min,
                max: resp.data.main.temp_max,
                tem: resp.data.main.temp, 
            }
        } catch (error) {
            console.log(error);
        }
   }

   agregarHistorial( lugar = '' ){
        if(this.historial.includes( lugar.toLocaleLowerCase )) return;    

        this.historial.unshift( lugar.toLocaleLowerCase() ); 

        //Grabar en DB 
        this.guardarDB();

   }

   guardarDB(){
         const payload = {
             historial: this.historial
         };

         fs.writeFileSync( this.dbPath, JSON.stringify( payload ) );  
   }

   leerDB() {
       //debe existir 
       if( !fs.existsSync( this.dbPath )) return null;

        const info = fs.readFileSync( this.dbPath, { encoding: 'utf-8'} )

        const data = JSON.parse( info );

        this.historial = data.historial;
   }

} 

module.exports = Busquedas;
