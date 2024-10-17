const express = require('express');
const OsController = require('../controllers/OsController'); // Corrigido para 'controllers'

const router = express.Router();

// Rota para criar uma nova ordem de serviço
router.post('/', OsController.criarOrdem);

// Rota para listar todas as ordens de serviço
router.get('/', OsController.listarOrdens);

// Atualizar ordem de serviço (status)
router.put('/:id', OsController.atualizarOrdem);

// Deletar ordem de serviço
router.delete('/:id', OsController.deletarOrdem);

module.exports = router;
