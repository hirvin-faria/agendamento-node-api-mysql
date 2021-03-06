const conexao = require('../infraestrutura/conexao');
const moment = require('moment');

class Atendimento {
    adiciona(atendimento, res) {
        const dataCriacao = moment().format('YYYY-MM-DD HH:MM:SS');
        const data = moment(atendimento.data, 'DD/MM/YYYY').format('YYYY-MM-DD HH:MM:SS');
        
        const dataValida = moment(data).isSameOrAfter(dataCriacao);
        const clientValido = atendimento.cliente.length >= 5;

        const validacoes = [
            {
                nome: 'data',
                valido: dataValida,
                mensagem: 'Data deve ser maior ou igual que a data atual'
            },
            {
                nome: 'cliente',
                valido: clientValido,
                mensagem: 'O Cliente deve ter pelo menos 5 caracteres'
            }
        ];

        const erros = validacoes.filter(campo => !campo.valido);
        const existemErros = erros.length;

        if(existemErros) {
            res.status(400).json(erros);
        } else {

            const atendimentoDatado = { ...atendimento, dataCriacao, data };
    
            const sql = 'INSERT INTO ATENDIMENTOS SET ?'
    
            conexao.query(sql, atendimentoDatado, (error, resultados) => {
                
                if(error) {
                    console.log(error);
                    res.status(400).json(error);
                } else {
                    console.log(resultados);
                    res.status(201).json(atendimento);
                }
            });

        }
    }

    lista(res) {
        const sql = 'SELECT * FROM ATENDIMENTOs';

        conexao.query(sql, (erro, resultados) => {
            if(erro) {
                res.status(400).json(erro);
            } else {
                res.status(200).json(resultados);
            }
        });
    }

    buscaId(id, res) {
        const sql = `SELECT * FROM ATENDIMENTOS WHERE ID=${id}`;

        conexao.query(sql, (erro, resultados) => {
            const atendimento = resultados[0];
            if(erro) {
                res.status(400).json(erro);
            } else {
                res.status(200).json(atendimento);
            }
        });
    }

    altera(id, valores, res) {
        if(valores.data) {
            valores.data = moment(valores.data, 'DD/MM/YYYY').format('YYYY-MM-DD HH:MM:SS');
        }
        const sql = 'UPDATE ATENDIMENTOS SET ? WHERE ID=?';

        conexao.query(sql, [valores, id], (erro, resultados) => {
            if(erro) {
                res.status(400).json(erro);
            } else {
                res.status(200).json({...valores, id});
            }
        })
    }

    deleta(id, res) {
        const sql = 'DELETE FROM ATENDIMENTOS WHERE ID=?';

        conexao.query(sql, id, (erro, resultados) => {
            if(erro) {
                res.status(400).json(erro);
            } else {
                res.status(200).json({id});
            }
        })
    }
}

module.exports = new Atendimento;