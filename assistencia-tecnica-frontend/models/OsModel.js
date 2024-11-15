const db = require('../config/db');

const OsModel = {
    criar: (dados, callback) => {
        const query = 'INSERT INTO ordens_servico (cliente, aparelho, problema, status) VALUES (?, ?, ?, ?)';
        db.query(query, [dados.nome, dados.aparelho, dados.descricao, 'Aberto'], (err, results) => {
            callback(err, results);
        });
    },
    listar: (callback) => {
        db.query('SELECT * FROM ordens_servico', (err, results) => {
            callback(err, results);
        });
    },
    atualizar: (id, status, callback) => {
        const query = 'UPDATE ordens_servico SET status = ? WHERE id = ?';
        db.query(query, [status, id], (err, results) => {
            callback(err, results);
        });
    },
    deletar: (id, callback) => {
        const query = 'DELETE FROM ordens_servico WHERE id = ?';
        db.query(query, [id], (err, results) => {
            callback(err, results);
        });
    }
};

module.exports = OsModel;
