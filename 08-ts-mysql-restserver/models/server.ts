
import express/*, { Application} de esta manera tambien le podria decir que es aplication*/ from 'express';
import dotenv from 'dotenv';
import usersRouter from '../routes/user';
import cors from 'cors';
import db from '../db/connection';
dotenv.config();

class Server {

    private app : express.Application; //Le digo que es de tipo express. aplication
    private port: string;
    private apiPaths = {
        users: '/api/users'
    };

    constructor() {
        this.app = express();
        this.port = process.env.PORT || '8080';

        // Métodos iniciales
        this.dbConnection();
        this.middlewares();
        this.routes();
    }

    async dbConnection() {
        try {
            await db.authenticate(); 
            console.log('DB online');
            
        } catch (error) {
            console.log(error);
            throw new Error( 'Failure in connection with DB' );
        }
    }

    middlewares () {

        // CORS
        this.app.use( cors() );

        // Lectura del body
        this.app.use( express.json() );

        //Carpeta pública   
        this.app.use( express.static('public') );
    }

    //TODO: Conectar base de datos

    routes() {
        this.app.use( this.apiPaths.users, usersRouter);
    }

    listen() {
        this.app.listen( this.port, () => {
            console.log('Servidor corriendo en el puerto: ' + this.port );
        })
    }
}

export default Server;