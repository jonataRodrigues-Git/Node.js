import { Sequelize } from "sequelize";

const sequelizeDB = new Sequelize('toughtis', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
});

(async ()=> {
    try {
        await sequelizeDB.authenticate();
        console.log('LOGADO NO MYSQ');
    } catch (err){
        console.error(err);
    }
})();

export default sequelizeDB;