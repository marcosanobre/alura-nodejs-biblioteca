// carregando a lib de FS
const fs = require('fs');

// Com REQUIRE não vai dar certo
// const caminhoArquivo = require('../arquivos/texto-web,txt');
// console.log( caminhoArquivo );

const caminhoArquivo = process.argv; // vetor com parametros da linha-de-comando
const link = caminhoArquivo[2];

//console.log( link );

fs.readFile( link, 'utf-8', (erro, texto) => {
    console.log( texto);
});



