const OsModel = require('../models/OsModel');

const OsController = {
    criarOrdem: (req, res) => {
        const dados = req.body;
        OsModel.criar(dados, (err, results) => {
            if (err) {
                res.status(500).send('Erro ao criar ordem de serviço');
            } else {
                res.status(201).send('Ordem de serviço criada com sucesso');
            }
        });
    },
    listarOrdens: (req, res) => {
        OsModel.listar((err, results) => {
            if (err) {
                res.status(500).send('Erro ao listar ordens de serviço');
            } else {
                res.json(results);
            }
        });
    },
    atualizarOrdem: (req, res) => {
        const { id } = req.params;
        const { status } = req.body;

        OsModel.atualizar(id, status, (err, results) => {
            if (err) {
                res.status(500).send('Erro ao atualizar ordem de serviço');
            } else {
                res.send('Ordem de serviço atualizada com sucesso');
            }
        });
    },
    deletarOrdem: (req, res) => {
        const { id } = req.params;

        OsModel.deletar(id, (err, results) => {
            if (err) {
                res.status(500).send('Erro ao deletar ordem de serviço');
            } else {
                res.send('Ordem de serviço deletada com sucesso');
            }
        });
    }
};

module.exports = OsController;
