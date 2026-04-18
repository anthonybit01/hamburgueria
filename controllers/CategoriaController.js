const { Categoria, Produto } = require('../models');

module.exports = {
  async listar(req, res) {
    try {
      const categorias = await Categoria.findAll({
        include: [
          {
            model: Produto,
            as: 'produtos'
          }
        ]
      });

      res.json(categorias);
    } catch (error) {
      res.status(500).json({ erro: 'Erro ao listar categorias', detalhes: error.message });
    }
  },

  async buscarPorId(req, res) {
    try {
      const { id } = req.params;

      const categoria = await Categoria.findByPk(id, {
        include: [
          {
            model: Produto,
            as: 'produtos'
          }
        ]
      });

      if (!categoria) {
        return res.status(404).json({ erro: 'Categoria não encontrada' });
      }

      res.json(categoria);
    } catch (error) {
      res.status(500).json({ erro: 'Erro ao buscar categoria', detalhes: error.message });
    }
  },

  async criar(req, res) {
    try {
      const { nome } = req.body;
      const categoria = await Categoria.create({ nome });
      res.status(201).json(categoria);
    } catch (error) {
      res.status(500).json({ erro: 'Erro ao criar categoria', detalhes: error.message });
    }
  },

  async atualizar(req, res) {
    try {
      const { id } = req.params;
      const { nome } = req.body;

      const categoria = await Categoria.findByPk(id);

      if (!categoria) {
        return res.status(404).json({ erro: 'Categoria não encontrada' });
      }

      await categoria.update({ nome });

      res.json(categoria);
    } catch (error) {
      res.status(500).json({ erro: 'Erro ao atualizar categoria', detalhes: error.message });
    }
  },

  async deletar(req, res) {
    try {
      const { id } = req.params;

      const categoria = await Categoria.findByPk(id);

      if (!categoria) {
        return res.status(404).json({ erro: 'Categoria não encontrada' });
      }

      await categoria.destroy();

      res.json({ mensagem: 'Categoria removida com sucesso' });
    } catch (error) {
      res.status(500).json({ erro: 'Erro ao deletar categoria', detalhes: error.message });
    }
  }
};