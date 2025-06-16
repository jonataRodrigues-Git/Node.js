import { DataTypes } from "sequelize";

import db from '../db/conn.js';


const User = db.define('User', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: 'Campo Obrigatorio',
            }
        },
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            notEmpty: {
                msg : 'Campo Obrigatorio',
            },
            isEmail: {
                msg: 'Formato de e-mail inválido'
            }
        },
    },
    password: {
        type:  DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg : 'Campo Obrigatorio',
            },
        },
    },
});

export default User;

/*
User : Define o tipo de usuário
Representa quem está usando o sistema.
  - Exemplo: João, Maria, Ana...
  - Campos comuns: name, email, senha, etc.
Serve para identificar o Usuario  dos pensamentos.
*/