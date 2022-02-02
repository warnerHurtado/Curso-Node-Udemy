"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const db = new sequelize_1.Sequelize('Node', 'warner', '12345', {
    dialect: 'mssql',
    //logging: false,
    port: 1433
});
exports.default = db;
//# sourceMappingURL=connection.js.map