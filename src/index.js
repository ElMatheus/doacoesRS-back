require('dotenv').config();
const express = require('express');
const usersRoutes = require('./routes/usersRoutes');
const productsRoutes = require('./routes/productsRoutes');
const donationsRoutes = require('./routes/donationsRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use('/', usersRoutes);
app.use('/', productsRoutes);
app.use('/', donationsRoutes);

app.listen(PORT, () => {
  console.log(`O servidor esta rodando na porta ${PORT}`);
}); 