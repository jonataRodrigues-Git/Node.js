import { DataTypes } from "sequelize";

import db from '../db/conn.js';
import User from "./User.js";


const Tought = db.define('Tought', {
    title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: 'Campo não pode ser Vazio',
            }
        }
    },
});


// interligando User com Tought
Tought.belongsTo(User);
User.hasMany(Tought);



export default Tought;


/*
 Tought — Define os pensamentos
 Representa o que o usuário escreveu ou publicou.
    - Exemplo: "Hoje foi um bom dia", "Estou aprendendo Node.js"...
    - Campos comuns: title, data de criação, etc.
Está ligado a um usuário que criou esse pensamento.
*/