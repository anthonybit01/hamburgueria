const { Entrega, Pedido } = require('../models');

module.exports = {
  async listar(req, res) {
    try {
      const entregas = await Entrega.findAll({
        include: [
          {
            model: Pedido,
            as: 'pedido'
          }
        ]
      });

      res.json(entregas);
    } catch (error) {
      res.status(500).json({ erro: 'Erro ao listar entregas', detalhes: error.message });
    }
  },

  async buscarPorId(req, res) {
    try {
      const { id } = req.params;

      const entrega = await Entrega.findByPk(id, {
        include: [
          {
            model: Pedido,
            as: 'pedido'
          }
        ]
      });

      if (!entrega) {
        return res.status(404).json({ erro: 'Entrega não encontrada' });
      }

      res.json(entrega);
    } catch (error) {
      res.status(500).json({ erro: 'Erro ao buscar entrega', detalhes: error.message });
    }
  },

  async criar(req, res) {
    try {
      const { endereco, status, pedido_id } = req.body;

      const entrega = await Entrega.create({ endereco, status, pedido_id });

      res.status(201).json(entrega);
    } catch (error) {
      res.status(500).json({ erro: 'Erro ao criar entrega', detalhes: error.message });
    }
  },

  async atualizar(req, res) {
    try {
      const { id } = req.params;
      const { endereco, status, pedido_id } = req.body;

      const entrega = await Entrega.findByPk(id);

      if (!entrega) {
        return res.status(404).json({ erro: 'Entrega não encontrada' });
      }

      await entrega.update({ endereco, status, pedido_id });

      res.json(entrega);
    } catch (error) {
      res.status(500).json({ erro: 'Erro ao atualizar entrega', detalhes: error.message });
    }
  },

  async deletar(req, res) {
    try {
      const { id } = req.params;

      const entrega = await Entrega.findByPk(id);

      if (!entrega) {
        return res.status(404).json({ erro: 'Entrega não encontrada' });
      }

      await entrega.destroy();

      res.json({ mensagem: 'Entrega removida com sucesso' });
    } catch (error) {
      res.status(500).json({ erro: 'Erro ao deletar entrega', detalhes: error.message });
    }
  }
};