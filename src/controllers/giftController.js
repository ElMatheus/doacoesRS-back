const pool = require('../config/dbConfig');


async function getAllGift(req, res) {
  try {
    const result = await pool.query('SELECT * FROM gift');
    res.json({
      status: 'success',
      message: 'Presentes encontrados',
      total: result.rowCount,
      data: result.rows
    });
  }
  catch (error) {
    return res.status(500).send('Erro ao buscar presentes');
  }
}

async function createGift(req, res) {
  try {
    const { type, name, description, image } = req.body;
    const result = await pool.query('INSERT INTO gift (type, name, description, image) VALUES ($1, $2, $3, $4) RETURNING *', [type, name, description, image]);
    res.json({
      message: "Presente cadastrado com sucesso",
      gift: result.rows[0],
    });

  } catch (error) {
    return res.status(500).send('Erro ao criar presente');
  }
}

async function getGiftById(req, res) {
  try {
    const { id } = req.params;
    const result = await pool.query('SELECT * FROM gift WHERE id = $1', [id]);

    if (result.rowCount == 0) {
      return res.status(404).send('Presente não encontrado');
    }

    res.json({
      message: "Presente encontrado",
      gift: result.rows[0],
    });

  } catch (error) {
    return res.status(500).send('Erro ao buscar presente');
  }
}

async function updateGift(req, res) {
  try {
    const { id } = req.params;
    const { categoria, nome_produto, quantidade, local_entrega } = req.body;
    const result = await pool.query('UPDATE gift SET categoria = $1, nome_produto = $2, quantidade = $3, local_entrega = $4 WHERE id = $5 RETURNING *', [categoria, nome_produto, quantidade, local_entrega, id]);

    if (result.rowCount == 0) {
      return res.status(404).send('Presente não encontrado');
    }

    res.json({
      message: "Presente atualizado com sucesso",
      gift: result.rows[0],
    });

  } catch (error) {
    return res.status(500).send('Erro ao atualizar presente');
  }
}

async function deleteGift(req, res) {
  try {
    const { id } = req.params;
    const result = await pool.query('DELETE FROM gift WHERE id = $1', [id]);

    if (result.rowCount == 0) {
      return res.status(404).send('Presente não encontrado');
    }

    res.json({
      message: "Presente deletado com sucesso",
    });

  } catch (error) {
    return res.status(500).send('Erro ao deletar presente');
  }
}



module.exports = {
  getAllGift,
  getGiftById,
  createGift,
  updateGift,
  deleteGift

};