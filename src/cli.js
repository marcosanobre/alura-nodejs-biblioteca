
// carregando a lib de FS
//const fs = require('fs');
import fs from 'fs'; 

//const trataErros = require( './erros/funcaoErros.js');
import trataErros from './erros/funcaoErros.js';

import { contaPalavras } from './index-refatorado.js';

// Com REQUIRE não vai dar certo
// const caminhoArquivo = require('../arquivos/texto-web.txt');
// console.log( caminhoArquivo );

const caminhoArquivo = process.argv; // vetor com parametros da linha-de-comando
const link = caminhoArquivo[2];
const endereco = caminhoArquivo[3];

fs.readFile( link, 'utf-8', (erro, texto) => {
    try {
        if (erro) throw erro;
        const resultado = contaPalavras( texto );
        criaESalvaArquivo(resultado, endereco);
    } catch (erro) {
        // tratar o erro
        trataErros( erro );
    }
} );

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



