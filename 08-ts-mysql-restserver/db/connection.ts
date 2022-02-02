import { Sequelize } from "sequelize";


const db = new Sequelize('Node', 'warner', '12345', {
    dialect: 'mssql',
    //logging: false,
    port: 1433
});

export default db;
