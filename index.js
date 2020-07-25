const customExpress = require('./config/customExpress');
const conexao = require('./infraestrutura/conexao');
const Tabelas = require('./infraestrutura/tabelas');

/**
 * conexão do banco.
 * importa a conecção e inicia a conexao do banco
 * caso corra erro loga no console
 * caso não exista erro retorna que o servidor esta sendo executado
 */
conexao.connect((error) => {
    if(error) {
        console.log(error);
    } else {
        console.log('conectado com sucesso');
        Tabelas.init(conexao);

        const app = customExpress();
        app.listen(3000, () => console.log('servidor rodando na porta 3000'));
    }
});


