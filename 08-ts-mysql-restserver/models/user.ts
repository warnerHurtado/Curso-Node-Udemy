import { DataTypes } from "sequelize";
import db from "../db/connection";

const User:any = db.define('User', {
    name:{
        type: DataTypes.STRING
    },
    email:{
        type: DataTypes.STRING
    },
    estado:{
        type: DataTypes.BOOLEAN
    }
});

export default User;