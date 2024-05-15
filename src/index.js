require('dotenv').config();
const express = require('express');
const heroesRoutes = require('./routes/heroesRoutes');
const battlesRoutes = require('./routes/battlesRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use('/', heroesRoutes);
app.use('/', battlesRoutes);

app.listen(PORT, () => {
  console.log(`O servidor esta rodando na porta ${PORT}`);
});