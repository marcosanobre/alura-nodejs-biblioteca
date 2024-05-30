/*
Objetivo deste projeto :
    Identificar palavras repetidas
*/

// carregando a lib de FS
const fs = require('fs');

// Com REQUIRE não vai dar certo
// const caminhoArquivo = require('../arquivos/texto-web.txt');
// console.log( caminhoArquivo );

const caminhoArquivo = process.argv; // vetor com parametros da linha-de-comando
const link = caminhoArquivo[2];

fs.readFile( link, 'utf-8', (erro, texto) => {
    try {
        if (erro) throw erro;
        contaPalavras( texto );
    } catch (erro) {
        // tratar o erro
        if ( erro.code === 'ENOENT' ) console.log('Arquivo passado na chamada, é inexistente.');
    }
});

function contaPalavras( texto ) {
    const paragrafos = extraiParagrafos(texto);
    const contagem = paragrafos.flatMap( (paragrafo) => {
        if( !paragrafo ) return [];
        return verificaPalavrasDuplicadas( paragrafo );
    });
    console.log( contagem );    
};

function extraiParagrafos( texto ) {
    return texto.toLowerCase().split('\n');
};

function limpaPalavras( palavra ) {
    return palavra.replace( /[,.\/#!$%\^&\*;:{}=\-_`~()]/g, '' );
};

function verificaPalavrasDuplicadas( texto ) {
    const listaPalavras = texto.split( ' ' ); // Separador
    const resultado = {};
    listaPalavras.forEach( palavra  => {
        if ( palavra.length >= 3 ) {
            const palavraLimpa = limpaPalavras(palavra);
            resultado[palavraLimpa] = (resultado[palavraLimpa] || 0) + 1;
        }
    });
    return resultado;
};

