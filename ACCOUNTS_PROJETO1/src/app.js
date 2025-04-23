// modulo externo
import inquirer from 'inquirer';
import chalk from 'chalk';

// modulo internos
import fs from 'fs';
import {imgTerminal, obg, loginAsii} from './ascii.js';

import { deposit , getAccountBalance, withdraw } from './module/operetion.js';


// menu login 
function login() {
    loginAsii();
    inquirer.prompt([
        {
            type: 'list',
            name: 'actionLogin',
            message: 'O que deseja fazer ? ',
            choices: [
                'Fazer Login',
                'Criar Conta',
            ]
        }
    ]).then((answer)=> {
        const action = answer['actionLogin'];
        console.clear();
        loginAsii();
        if(action === 'Fazer Login') {
            buildAccount();
        } else if(action === 'Criar Conta') {
            console.clear();
            createAccountMsg();
        }
    }).catch((err)=> {
        console.error(err)
    })
};

//criar um conta
function createAccountMsg() {
    console.log(chalk.bgGreen.black(' Parabéns por Escolher nosso BancoCt  '));
    console.log(chalk.green.bold(' Defina as Opções da sua Conta a Seguir '));
    console.log(chalk.gray.bold('------------------------------------------------'));
    
    setTimeout(()=> {
        console.clear()
        createAccountUser();
    }, 3000);
    
};


//criadno conta user
function createAccountUser() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'userCreate',
            message: 'Digite o Nome da Sua Conta : '
        }
    ]).then((answer)=> {
        const accountNameUser = answer['userCreate'];
        
        if(!accountNameUser.trim()) {
            console.log('campo vazil');
            return createAccountUser();
        }

        if(!fs.existsSync('accounts')) {
            fs.mkdirSync('accounts')
        };

        if(fs.existsSync(`./accounts/${accountNameUser}.json`)) {
            console.log(chalk.bgRed.black(' Esta com Já foi Cadastrada '));
            createAccountUser();
            
            return;
        };

        fs.writeFileSync(`accounts/${accountNameUser}.json`, '{"balance": 0}', function(err){
            console.error(err)
        });
        
        
        console.log(chalk.green.bold(' Conta Criada com Sucesso ! '));
        console.log(chalk.gray.bold('------------------------------------------------'));
        console.log(chalk.bgGray.black(" 🔄 Processando os dados... "));

        setTimeout(()=> {
            console.clear() 
            login();
            return
        }, 4000);

    }).catch(err => console.error(err));
}

// cria conta e salva  no JSON
function buildAccount() {
    inquirer.prompt([
        {   
            type: 'input',
            name: 'accountName',
            message: 'Para Acessar Digite sua Conta : '
        }
    ]).then((answer)=> {
        const accountName = answer['accountName'];

       // 📂 Verifica se o arquivo já existe e carrega os dados 
        if(!fs.existsSync(`./accounts/${accountName}.json`)) {
            console.clear()
            console.log(chalk.bgYellow.bold(' Conta nâo Catastrada , Necesario Castra-se '));
            login();
            return
        }
        

        console.log(chalk.bgGray.black(" 🔄 Processando os dados... "));

            setTimeout(()=> {
                console.clear();
                operation();
                return
            }, 3000);
        
    }).catch(err => console.error(err))
};

// opções da conta 
export function operation() {
    inquirer.prompt([
        {
            type: 'list',
            name: 'action',
            message: 'O que deseja fazer ? ',
            choices:[
                'Consultar Saldo',
                'Despositar',
                'Sacar',
                'Sair'
            ]
        }
    ]).then((answer)=> {
        const action = answer['action'];
        if(action === 'Despositar') {
            deposit();
        }else if(action === 'Consultar Saldo') {
            getAccountBalance()
        }else if(action === 'Sacar') {
            withdraw()
        }else if(action === 'Sair') {
            console.log(chalk.bgBlue.black(' Obrigado por Usar nosso BancoCt '));
            obg();
            // fianliza a acção do banco  
            setTimeout(()=> {
                process.exit()
            }, 2)
        }

    }).catch((err)=> {
        console.log(chalk.bgRed(' Erro na Operação ❌..! '))
    })
};


//----------------------------------------------------------------------------Função de Inicalizar

 // função de inicialização
function iniBanco() {
    imgTerminal();
    console.log(chalk.gray.bold('------------------------------------------------'));
    console.log(chalk.bgGray.black(" 🔄 Processando os dados... "));
    setTimeout(()=> {
        console.clear()
        login()
    }, 5000)
};

iniBanco()