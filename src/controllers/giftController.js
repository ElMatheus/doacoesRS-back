const pool = require('../config/dbConfig');

async function getAllGifts(req, res) {
  try {
    const result = await pool.query('SELECT gifts.id as gift_id, users.id as user_id, * FROM gifts INNER JOIN users ON gifts.user_id = users.id');
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
    const { user_id, produto_id, quantidade, local } = req.body;
    const result = await pool.query('INSERT INTO gifts (user_id, produto_id, quantidade, local) VALUES ($1, $2, $3, $4) RETURNING *', [user_id, produto_id, quantidade, local]);
    res.json({
      message: "Presente criado",
      gift: result.rows[0],
    });

  } catch (error) {
    return res.status(500).send('Erro ao criar presente');
  }
}

async function getGiftById(req, res) {
  try {
    const { id } = req.params;
    const result = await pool.query('SELECT * FROM gifts WHERE id = $1', [id]);

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
    const { status } = req.body;
    const result = await pool.query('UPDATE gifts SET status = $1 WHERE id = $2 RETURNING *', [status, id]);

    if (result.rowCount == 0) {
      return res.status(404).send('Presente não encontrado');
    }

    res.json({
      message: "Presente atualizado",
      gift: result.rows[0],
    });

  } catch (error) {
    return res.status(500).send('Erro ao atualizar presente');
  }
}

async function deleteGift(req, res) {
  try {
    const { id } = req.params;
    const result = await pool.query('DELETE FROM gifts WHERE id = $1', [id]);

    if (result.rowCount == 0) {
      return res.status(404).send('Presente não encontrado');
    }

    res.json({
      message: "Presente deletado",
    });

  } catch (error) {
    return res.status(500).send('Erro ao deletar presente');
  }
}


module.exports = {
  getAllGifts,
  createGift,
  getGiftById,
  updateGift,
  deleteGift

};
