const Atendimento = require('../models/atendimento');
const atendimento = require('../models/atendimento');

module.exports = app => {
    app.get('/atendimentos', (req, res) => {
        atendimento.lista(res);
    });

    app.get('/atendimentos/:id', (req, res) => {
        const id = parseInt(req.params.id);
        atendimento.buscaId(id, res);
    });

    app.post('/atendimentos', (req, res) => {

        console.log(req.body);
        const atendimento = req.body;
        Atendimento.adiciona(atendimento, res);
    });

    app.patch('/atendimentos/:id', (req, res) => {
        const id = parseInt(req.params.id);
        const valores = req.body;
        atendimento.altera(id, valores, res);
    });

    app.delete('/atendimentos/:id', (req, res) => {
        const id = parseInt(req.params.id);
        atendimento.deleta(id, res);
    });

}