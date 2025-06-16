import express from "express";
import {engine} from 'express-handlebars';
import session from "express-session";
import createFileStore from 'session-file-store';
import path from "path";
import os  from 'os';

import toughtRouter from './routes/toughtRouter.js'; // Routes
import authRoutes from './routes/authRoutes.js'; //Routes
import conn from './db/conn.js'; //Banco
import Tought from "./models/Tought.js"; // models
import User from './models/User.js'; // models
import ToughtController from "./controllers/ToughtController.js"; //controllers

const FileStore = createFileStore(session);
const app = express();


//template engine
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');

//resceber resposta do body
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//public path
app.use(express.static('public'));


//session middleware
const sessionPath = path.join(os.tmpdir(), 'sessions')//Define o caminho onde os dados de sessão vão ser salvos

//Adiciona um middleware ao Express.
app.use(
    session({
        name: 'session',
        secret: 'nosso_secret',
        resave: false,
        saveUninitialized: false,
        store: new FileStore({
            logFn: function(){},
            path: sessionPath,
        }),
        cookie: {
            secure: false,
            maxAge: 360000,
            expires: new Date(Date.now() + 360000),
            httpOnly: true
        }
    })
)



//set session 
app.use((req, res, next)=> {
    res.locals.session = req.session;

    if(req.session.message) {
        res.locals.message = req.session.message;
        delete req.session.message;  // para variáveis de sessão
    };
    next();
})

//Routes
app.post('/register', authRoutes);
app.use('/toughts', toughtRouter);
app.use('/', authRoutes);

// exibi todos os pesamentos na pagina de inicair sem acessar o route
app.get('/', ToughtController.showTought);


conn.sync(
    // {force: true}
).then(()=> {
    app.listen(3000);
}).catch((err)=> console.error(`Erro FOI AQUI ${err}`));

