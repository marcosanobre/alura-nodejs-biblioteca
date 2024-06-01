
// carregando a lib de FS
//const fs = require('fs');
import fs from 'fs'; 

import path from 'path';

//const trataErros = require( './erros/funcaoErros.js');
import trataErros from './erros/funcaoErros.js';

import { contaPalavras } from './index-refatorado.js';

import { montaSaidaArquivo } from './helpers.js';

import { Command } from 'commander';

const program = new Command();

program
    .version('0.0.1')
    .option( '-t, --texto, <string>', 'camindo do texto a ser processado' )
    .option( '-d, --destino <string>', 'camindo do arquivo output de resultado')
    .action( (options) => {
        const {texto, destino} = options;
        if ( !texto || !destino) {
            console.error( 'erro: favor inserir caminho de Origem e Destino' );
            program.help();
            return;
        };

        const caminhoTexto = path.resolve(texto);
        const caminhoDestino = path.resolve(destino);

        try {
            processaArquivo(caminhoTexto, caminhoDestino);
            console.log( 'Arquivo Texto processado com sucesso' );
        } catch (erro) {
            console.log( 'Ocorreu um erro no processamento', erro);
        };
    });

program.parse();

// Com REQUIRE não vai dar certo
// const caminhoArquivo = require('../arquivos/texto-web.txt');
// console.log( caminhoArquivo );
/* const caminhoArquivo = process.argv; // vetor com parametros da linha-de-comando
const link = caminhoArquivo[2];
const endereco = caminhoArquivo[3];
 */


function processaArquivo( texto, destino ) {
    fs.readFile( texto, 'utf-8', (erro, texto) => {
        try {
            if (erro) throw erro;
            const resultado = contaPalavras( texto );
            criaESalvaArquivo(resultado, destino);
        } catch (erro) {
            // tratar o erro
            trataErros( erro );
        }
    } );
};

/* 
// Da forma ASSINCRONA explicita
//
async function criaESalvaArquivo( listaPalavras, endereco ) {
    const arquivoNovo = `${endereco}/resultado.txt`;
    const textoPalavras = JSON.stringify(listaPalavras);
    try {
        await fs.promises.writeFile( arquivoNovo, textoPalavras );
        console.log( 'arquivo criado' );
    } catch (erro) {
        throw erro;
    };
};
*/

// Ou com PROMESSAS (promises)
function criaESalvaArquivo( listaPalavras, endereco ) {
    const arquivoNovo = `${endereco}/resultado.txt`;
    //const textoPalavras = JSON.stringify(listaPalavras);
    const textoPalavras = montaSaidaArquivo(listaPalavras);
    fs.promises.writeFile( arquivoNovo, textoPalavras )
        .then( () => { console.log( 'Arquivo criado.' ); } )
        .catch( (erro) => {throw erro;} )
        .finally( () => console.log( 'Operação finalizada.' ) ) 
};


