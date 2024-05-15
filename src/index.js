require('dotenv').config();
const express = require('express');
const usersRoutes = require('./routes/usersRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use('/', usersRoutes);

app.listen(PORT, () => {
  console.log(`O servidor esta rodando na porta ${PORT}`);
});