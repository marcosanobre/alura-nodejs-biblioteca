export default function trataErros( erro ) {
    if ( erro.code === 'ENOENT' ) {
        throw new Error('Arquivo passado na chamada, é inexistente.');
    } else {
        return 'Erro na aplicação';
    };
};

// module.exports = trataErros;


