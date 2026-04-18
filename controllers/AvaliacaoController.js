const { Avaliacao, Pedido } = require('../models');

module.exports = {
  async listar(req, res) {
    try {
      const avaliacoes = await Avaliacao.findAll({
        include: [
          {
            model: Pedido,
            as: 'pedido'
          }
        ]
      });

      res.json(avaliacoes);
    } catch (error) {
      res.status(500).json({ erro: 'Erro ao listar avaliações', detalhes: error.message });
    }
  },

  async buscarPorId(req, res) {
    try {
      const { id } = req.params;

      const avaliacao = await Avaliacao.findByPk(id, {
        include: [
          {
            model: Pedido,
            as: 'pedido'
          }
        ]
      });

      if (!avaliacao) {
        return res.status(404).json({ erro: 'Avaliação não encontrada' });
      }

      res.json(avaliacao);
    } catch (error) {
      res.status(500).json({ erro: 'Erro ao buscar avaliação', detalhes: error.message });
    }
  },

  async criar(req, res) {
    try {
      const { nota, pedido_id } = req.body;

      if (nota < 1 || nota > 5) {
        return res.status(400).json({ erro: 'A nota deve estar entre 1 e 5' });
      }

      const avaliacao = await Avaliacao.create({ nota, pedido_id });

      res.status(201).json(avaliacao);
    } catch (error) {
      res.status(500).json({ erro: 'Erro ao criar avaliação', detalhes: error.message });
    }
  },

  async atualizar(req, res) {
    try {
      const { id } = req.params;
      const { nota, pedido_id } = req.body;

      if (nota < 1 || nota > 5) {
        return res.status(400).json({ erro: 'A nota deve estar entre 1 e 5' });
      }

      const avaliacao = await Avaliacao.findByPk(id);

      if (!avaliacao) {
        return res.status(404).json({ erro: 'Avaliação não encontrada' });
      }

      await avaliacao.update({ nota, pedido_id });

      res.json(avaliacao);
    } catch (error) {
      res.status(500).json({ erro: 'Erro ao atualizar avaliação', detalhes: error.message });
    }
  },

  async deletar(req, res) {
    try {
      const { id } = req.params;

      const avaliacao = await Avaliacao.findByPk(id);

      if (!avaliacao) {
        return res.status(404).json({ erro: 'Avaliação não encontrada' });
      }

      await avaliacao.destroy();

      res.json({ mensagem: 'Avaliação removida com sucesso' });
    } catch (error) {
      res.status(500).json({ erro: 'Erro ao deletar avaliação', detalhes: error.message });
    }
  }
};