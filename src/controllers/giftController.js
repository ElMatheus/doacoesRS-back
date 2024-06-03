const pool = require('../config/dbConfig');

async function getAllGift(req, res) {
  try {
    const result = await pool.query('SELECT gift.id as gift_id, users.id as user_id, * FROM gift INNER JOIN users ON gift.user_id = users.id');
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
    const { donation_id, product_id, quantity, local } = req.body;
    const result = await pool.query('INSERT INTO gift (donation_id, product_id, quantity, local) VALUES ($1, $2, $3, $4) RETURNING *', [donation_id, product_id, quantity, local]);
    res.json({
      message: "Presente criado",
      gift: result.rows[0],
    });

  } catch (error) {
    console.error('Erro ao criar presente', error);
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
    const { status } = req.body;
    const result = await pool.query('UPDATE gift SET status = $1 WHERE id = $2 RETURNING *', [status, id]);

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
    const result = await pool.query('DELETE FROM gift WHERE id = $1', [id]);

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
  getAllGift,
  createGift,
  getGiftById,
  updateGift,
  deleteGift

};
