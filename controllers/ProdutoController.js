const { Produto, Categoria } = require('../models');

module.exports = {
  async listar(req, res) {
    try {
      const produtos = await Produto.findAll({
        include: [
          {
            model: Categoria,
            as: 'categoria'
          }
        ]
      });

      res.json(produtos);
    } catch (error) {
      res.status(500).json({ erro: 'Erro ao listar produtos', detalhes: error.message });
    }
  },

  async buscarPorId(req, res) {
    try {
      const { id } = req.params;

      const produto = await Produto.findByPk(id, {
        include: [
          {
            model: Categoria,
            as: 'categoria'
          }
        ]
      });

      if (!produto) {
        return res.status(404).json({ erro: 'Produto não encontrado' });
      }

      res.json(produto);
    } catch (error) {
      res.status(500).json({ erro: 'Erro ao buscar produto', detalhes: error.message });
    }
  },

  async criar(req, res) {
    try {
      const { nome, preco, categoria_id } = req.body;

      const produto = await Produto.create({ nome, preco, categoria_id });

      res.status(201).json(produto);
    } catch (error) {
      res.status(500).json({ erro: 'Erro ao criar produto', detalhes: error.message });
    }
  },

  async atualizar(req, res) {
    try {
      const { id } = req.params;
      const { nome, preco, categoria_id } = req.body;

      const produto = await Produto.findByPk(id);

      if (!produto) {
        return res.status(404).json({ erro: 'Produto não encontrado' });
      }

      await produto.update({ nome, preco, categoria_id });

      res.json(produto);
    } catch (error) {
      res.status(500).json({ erro: 'Erro ao atualizar produto', detalhes: error.message });
    }
  },

  async deletar(req, res) {
    try {
      const { id } = req.params;

      const produto = await Produto.findByPk(id);

      if (!produto) {
        return res.status(404).json({ erro: 'Produto não encontrado' });
      }

      await produto.destroy();

      res.json({ mensagem: 'Produto removido com sucesso' });
    } catch (error) {
      res.status(500).json({ erro: 'Erro ao deletar produto', detalhes: error.message });
    }
  }
};