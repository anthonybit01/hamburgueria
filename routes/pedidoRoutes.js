const express = require('express');
const router = express.Router();
const PedidoController = require('../controllers/PedidoController');

router.get('/', PedidoController.listar);
router.get('/:id', PedidoController.buscarPorId);
router.post('/', PedidoController.criar);
router.put('/:id', PedidoController.atualizar);
router.delete('/:id', PedidoController.deletar);

module.exports = router;