require('dotenv').config();
const express = require('express');
const usersRoutes = require('./routes/usersRoutes');
const productsRoutes = require('./routes/productsRoutes');
const donationsRoutes = require('./routes/donationsRoutes');
const donations_itemRoutes = require('./routes/donations_itemRoutes');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors({
  origin: 'http://localhost:8081'
}));

app.use(express.json());

app.use('/', usersRoutes);
app.use('/', productsRoutes);
app.use('/', donationsRoutes);
app.use('/', donations_itemRoutes);

app.listen(PORT, () => {
  console.log(`O servidor esta rodando na porta ${PORT}`);
}); 