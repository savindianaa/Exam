import Sequelize from 'sequelize';
import {DB_USERNAME, DB_PASSWORD} from './Const.js';

const db = new Sequelize({
    dialect:'mysql',
    database:'moviesyst',
    username: DB_USERNAME,
    //host: "127.0.0.1",
    password: DB_PASSWORD,
    logging: false,
    define: {
        timestamps: false,
        freezeTableName: true
    }
});