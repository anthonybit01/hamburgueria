const express = require('express');

const categoriaRoutes = require('../routes/categoriaRoutes');
const produtoRoutes = require('../routes/produtoRoutes');
const pedidoRoutes = require('../routes/pedidoRoutes');
const entregaRoutes = require('../routes/entregaRoutes');
const avaliacaoRoutes = require('../routes/avaliacaoRoutes');

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.send('API Hamburgueria rodando com SQLite!');
});

app.use('/categorias', categoriaRoutes);
app.use('/produtos', produtoRoutes);
app.use('/pedidos', pedidoRoutes);
app.use('/entregas', entregaRoutes);
app.use('/avaliacoes', avaliacaoRoutes);

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});