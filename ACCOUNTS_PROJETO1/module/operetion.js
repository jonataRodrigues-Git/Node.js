import inquirer from 'inquirer';
import chalk from 'chalk';
import fs from 'fs';

import {operation} from '../app.js';

//------------------------------------------------------- Funções de depisitos-----------------------------------------------------------------------
export function deposit() {
    inquirer.prompt([
        {   
            name: 'accountName',
            message: 'Por Seguranção Digite a Conta Para Deposito: ',
        }
    ]).then((answer)=> {
        const accountName = answer.accountName;

        if(!checkAccount(accountName)) {
            return deposit()
        }

        valorDepodi(accountName);

    })
    .catch(err => console.error(err));
};

//função de verifca conta 

export function checkAccount(accountName){

    if(!fs.existsSync(`./accounts/${accountName}.json`)){
        console.log(chalk.bgRed.bold(' Esta Conta  Não Existe ...'));
        return false
    };

    return true
}

//função valor de deposiot

function valorDepodi(accountName) {
    inquirer.prompt([
        {
            name: 'amount',
            message: 'Qual Valor de Deposito R$: ',
            validate: (value) => {
                return !isNaN(value) && Number(value) > 0 ? true : 'Digite um valor válido';
            },
        }
    ]).then((answer)=> {
        const amount = answer['amount'];

        addAmount(accountName, amount)
        console.log(chalk.bgGray.black(" 🔄 Processando os dados... "));

        setTimeout(() => {
            console.clear();
            operation();
        }, 3000);
    })
    .catch(err => console.log(err))
}

function addAmount(accountName, amount) {
    const numericAmount = Number(amount);

    const accountData = getAccount(accountName);
    if(typeof accountData.balance !== 'number'){
        accountData.balance = 0;
    }

    accountData.balance +=  numericAmount

    fs.writeFileSync(`./accounts/${accountName}.json`,
        JSON.stringify(accountData),
        function(err){
            console.log(err)
        }
    );

    console.log(chalk.bgGreen.bold(` Valor ${numericAmount.toFixed(2).replace(".",",")} Depositado Com Sucesso 💰 `));
}

function getAccount(accountName) {
    const accountJSON = fs.readFileSync(`./accounts/${accountName}.json`,{
        encoding: 'utf8',
        flag: 'r'
    });

    return JSON.parse(accountJSON)
}


//-------------------------------- Conasulta Saldo-------------------------------------

export function getAccountBalance(accountName) {
    inquirer.prompt([
        {
            name: 'accountName',
            message: 'Para Confirma Digite o Nome da Conta: '
        }
    ]).then((answer)=> {
        const accountName = answer['accountName'];

        if(!checkAccount(accountName)) {
            return getAccountBalance(accountName)
        };

        const accountData = getAccount(accountName);
        console.log(chalk.bgGreen.bold(` Olá. O Saldo da Sua Conta é de R$ ${accountData.balance.toFixed(2).replace(".",",")} 💰 `));
        
        setTimeout(()=>{
            console.clear()
            operation()
        },3000)
    })
    .catch(err => console.error(err));
};

//------------------ funllçao saca ----------------------------- 

export function withdraw() {
    inquirer.prompt([
        {
            name: 'accountName',
            message: 'Para Confirma Digite o Nome da Conta: '
        }
    ]).then((answer)=>{
        const accountName = answer.accountName;

        if(!checkAccount(accountName)){
            return withdraw();
        };

        valorSaque(accountName);
    })
    .catch(err => console.log(err))
    
};
function valorSaque(accountName) {
    inquirer.prompt([
        {
            name: 'amount',
            message: 'Qual Seria o valor de Saque: R$ ',
            validate: value => {
                const num = Number(value);
                return !isNaN(num) && num > 0 ? true : 'Digite um valor válido';
            },
        }
    ]).then((answer)=>{
        const amount = answer.amount;
        removerAmount(accountName, amount);
    })
    .catch(err => console.log(err));
}

function removerAmount(accountName, amount) {
    const accountData = getAccount(accountName);
    const numericAmount = Number(amount);

    if(isNaN(numericAmount) || numericAmount <= 0) {
        console.log(chalk.red('Valor inválido!'));
        return valorSaque(accountName);
    };

    if(accountData.balance < numericAmount) {
        console.log(chalk.red(' Valor Desejado Indisponivel '));
        return valorSaque(accountName);
    }

    

    accountData.balance -= numericAmount

    fs.writeFileSync(`./accounts/${accountName}.json`,
        JSON.stringify(accountData),
        {encoding: 'utf8'},
        function(err){
            console.log(err);
        },
    );
    console.log(chalk.bgGreen.bold(` Saque Realizado R$ ${numericAmount.toFixed(2).replace(".",",")} 💰 `));

    setTimeout(()=>{
        console.clear();
        operation()
    }, 3000);
}   