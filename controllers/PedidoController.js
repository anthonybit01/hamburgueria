const { Pedido, Entrega, Avaliacao } = require('../models');

module.exports = {
  async listar(req, res) {
    try {
      const pedidos = await Pedido.findAll({
        include: [
          {
            model: Entrega,
            as: 'entrega'
          },
          {
            model: Avaliacao,
            as: 'avaliacao'
          }
        ]
      });

      res.json(pedidos);
    } catch (error) {
      res.status(500).json({ erro: 'Erro ao listar pedidos', detalhes: error.message });
    }
  },

  async buscarPorId(req, res) {
    try {
      const { id } = req.params;

      const pedido = await Pedido.findByPk(id, {
        include: [
          {
            model: Entrega,
            as: 'entrega'
          },
          {
            model: Avaliacao,
            as: 'avaliacao'
          }
        ]
      });

      if (!pedido) {
        return res.status(404).json({ erro: 'Pedido não encontrado' });
      }

      res.json(pedido);
    } catch (error) {
      res.status(500).json({ erro: 'Erro ao buscar pedido', detalhes: error.message });
    }
  },

  async criar(req, res) {
    try {
      const { cliente, total } = req.body;

      const pedido = await Pedido.create({ cliente, total });

      res.status(201).json(pedido);
    } catch (error) {
      res.status(500).json({ erro: 'Erro ao criar pedido', detalhes: error.message });
    }
  },

  async atualizar(req, res) {
    try {
      const { id } = req.params;
      const { cliente, total } = req.body;

      const pedido = await Pedido.findByPk(id);

      if (!pedido) {
        return res.status(404).json({ erro: 'Pedido não encontrado' });
      }

      await pedido.update({ cliente, total });

      res.json(pedido);
    } catch (error) {
      res.status(500).json({ erro: 'Erro ao atualizar pedido', detalhes: error.message });
    }
  },

  async deletar(req, res) {
    try {
      const { id } = req.params;

      const pedido = await Pedido.findByPk(id);

      if (!pedido) {
        return res.status(404).json({ erro: 'Pedido não encontrado' });
      }

      await pedido.destroy();

      res.json({ mensagem: 'Pedido removido com sucesso' });
    } catch (error) {
      res.status(500).json({ erro: 'Erro ao deletar pedido', detalhes: error.message });
    }
  }
};