const pool = require('../config/dbConfig');

async function getAllHeroes(req, res) {
  try {
    const result = await pool.query('SELECT * FROM heroes');
    res.json({
      total: result.rowCount,
      heroes: result.rows,
    });
  } catch (error) {
    console.error('Erro ao buscar herois', error);
    res.status(500).send('Erro ao buscar herois');
  }
}

async function getHeroById(req, res) {
  try {
    const { id } = req.params;
    const result = await pool.query('SELECT * FROM heroes WHERE id = $1', [id]);
    if (result.rowCount === 0) {
      res.status(404).json({ message: 'Heroi não encontrado' });
    }
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Erro ao buscar heroi', error);
    res.status(500).send('Erro ao buscar heroi');
  }
}

async function getHeroByName(req, res) {
  try {
    const { name } = req.params;
    const result = await pool.query('SELECT * FROM heroes WHERE name = $1', [name]);
    if (result.rowCount === 0) {
      res.status(404).json({ message: 'Heroi não encontrado' });
    }
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Erro ao buscar heroi', error);
    res.status(500).send('Erro ao buscar heroi');
  }
}

async function createHero(req, res) {
  try {
    const { name, power, hp, attack } = req.body;
    const result = await pool.query('INSERT INTO heroes (name, level, power, hp, attack) VALUES ($1, $2, $3, $4, $5) RETURNING *', [name, 1, power, hp, attack]);
    res.json({
      message: "Heroi cadastrado com sucesso",
      users: result.rows[0],
    });
  } catch (error) {
    console.error('Erro ao criar herois', error);
    res.status(500).send('Erro ao criar herois');
  }
}

async function updateHero(req, res) {
  try {
    const { id } = req.params;
    const { name, power, hp, attack } = req.body;
    const result = await pool.query('UPDATE heroes SET name = $1, power = $2, hp = $3, attack = $4 WHERE id = $5 RETURNING *', [name, power, hp, attack, id]);
    if (result.rowCount === 0) {
      res.status(404).json({ message: 'Heroi não encontrado' });
    }
    res.json({
      message: "Heroi atualizado com sucesso",
      users: result.rows[0],
    });
  } catch (error) {
    console.error('Erro ao atualizar heroi', error);
    res.status(500).send('Erro ao atualizar heroi');
  }
}

async function deleteHero(req, res) {
  try {
    const { id } = req.params;
    const result = await pool.query('DELETE FROM heroes WHERE id = $1', [id]);
    if (result.rowCount === 0) {
      return res.status(404).json({ message: 'Heroi não encontrado' });
    }
    res.json({ message: 'Heroi deletado com sucesso' });
  } catch (error) {
    console.error('Erro ao deletar heroi', error);
    res.status(500).send('Erro ao deletar heroi');
  }
}

module.exports = { getAllHeroes, getHeroById, getHeroByName, createHero, updateHero, deleteHero };