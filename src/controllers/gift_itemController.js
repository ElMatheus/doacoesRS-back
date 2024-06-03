const pool = require('../config/dbConfig');

async function getAllGiftItems(req, res) {
  try {
    const result = await pool.query('SELECT gift_item.id, gift_item.gift_id, gift_item.donation_id, gift.name as gift_name, donations.donation_date, users.name as user_name FROM gift_item INNER JOIN gift ON gift_item.gift_id = gift.id INNER JOIN donations ON gift_item.donation_id = donations.id INNER JOIN users ON donations.user_id = users.id');
    res.json({
      status: 'success',
      message: 'Itens de presentes encontrados',
      total: result.rowCount,
      data: result.rows
    });
  }
  catch (error) {
    return res.status(500).send('Erro ao buscar itens de presentes');
  }
}

async function createGiftItem(req, res) {
  try {
    const { gift_id, donation_id } = req.body;
    const gift = await pool.query('SELECT * FROM gift WHERE id = $1', [gift_id]);
    const donation = await pool.query('SELECT * FROM donations WHERE id = $1', [donation_id]);

    if (!gift.rows[0]) {
      return res.status(404).send('Presente não encontrado');
    }
    if (!donation.rows[0]) {
      return res.status(404).send('Doação não encontrada');
    }

    const result = await pool.query('INSERT INTO gift_item (gift_id, donation_id) VALUES ($1, $2) RETURNING *', [gift_id, donation_id]);
    res.json({
      message: "Item de presente cadastrado com sucesso",
      gift_item: result.rows[0],
    });
  } catch (error) {
    return res.status(500).send('Erro ao criar item de presente');
  }
}

async function getGiftItemById(req, res) {
  try {
    const { id } = req.params;
    const result = await pool.query('SELECT * FROM gift_item WHERE id = $1', [id]);

    if (result.rowCount == 0) {
      return res.status(404).send('Item de presente não encontrado');
    }

    res.json({
      message: "Item de presente encontrado",
      gift_item: result.rows[0],
    });

  } catch (error) {
    return res.status(500).send('Erro ao buscar item de presente');
  }
}

async function updateGiftItem(req, res) {
  try {
    const { id } = req.params;
    const { gift_id, donation_id } = req.body;
    const result = await pool.query('UPDATE gift_item SET gift_id = $1, donation_id = $2 WHERE id = $3 RETURNING *', [gift_id, donation_id, id]);

    if (result.rowCount == 0) {
      return res.status(404).send('Item de presente não encontrado');
    }

    res.json({
      message: "Item de presente atualizado",
      gift_item: result.rows[0],
    });

  } catch (error) {
    return res.status(500).send('Erro ao atualizar item de presente');
  }
}

async function deleteGiftItem(req, res) {
  try {
    const { id } = req.params;
    const result = await pool.query('DELETE FROM gift_item WHERE id = $1', [id]);

    if (result.rowCount == 0) {
      return res.status(404).send('Item de presente não encontrado');
    }

    res.json({
      message: "Item de presente deletado",
    });

  } catch (error) {
    return res.status(500).send('Erro ao deletar item de presente');
  }
}



module.exports = {
  getAllGiftItems,
  createGiftItem,
  getGiftItemById,
  updateGiftItem,
  deleteGiftItem
};