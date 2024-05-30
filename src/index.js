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

    // dessa forma o array com os paragrafos ira ser 
    // percorrido 2 vezes: uma pelo Filter e outra pelo Map
    /* const contagem = paragrafos
        .filter( paragrafo => paragrafo )
        .map( (paragrafo) => {
        return verificaPalavrasDuplicadas( paragrafo );
    });*/
    // Usando FLATMAP para passar só 1 vez
    const contagem = paragrafos.flatMap( (paragrafo) => {
        if( !paragrafo ) return [];
        return verificaPalavrasDuplicadas( paragrafo );
    });
    console.log( contagem );
    //console.log( paragrafos );
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



