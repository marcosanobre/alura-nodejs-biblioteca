/*
Objetivo deste projeto :
    Identificar palavras repetidas
Metas:
    . obter o texto de um arquivo
    . criar um array com as palavras do texto
    . contar ocorrencias
    . montar um objeto com o resultado
*/

// carregando a lib de FS
const fs = require('fs');

// Com REQUIRE não vai dar certo
// const caminhoArquivo = require('../arquivos/texto-web,txt');
// console.log( caminhoArquivo );

const caminhoArquivo = process.argv; // vetor com parametros da linha-de-comando
const link = caminhoArquivo[2];

//console.log( link );

fs.readFile( link, 'utf-8', (erro, texto) => {
    quebraEmParagrafos( texto );
});

function quebraEmParagrafos( texto ) {
    const paragrafos = texto.toLowerCase().split('\n');
    const contagem = paragrafos.map( (paragrafo) => {
        return verificaPalavrasDuplicadas( paragrafo );
    });
    console.log( contagem );
    //console.log( paragrafos );
};

function verificaPalavrasDuplicadas( texto ) {
    const listaPalavras = texto.split( ' ' ); // Separador
    const resultado = {};
    listaPalavras.forEach( palavra  => {
        resultado[palavra] = (resultado[palavra] || 0) + 1;
    });
    return resultado;
};



