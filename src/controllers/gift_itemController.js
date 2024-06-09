const e = require('cors');
const pool = require('../config/dbConfig');


async function getAllGiftItems(req, res) {
  try {
    const result = await pool.query('SELECT * FROM gift_item');
    res.json({
      message: "Todos os itens de presente",
      gift_items: result.rows,
    });

  } catch (error) {
    return res.status(500).send('Erro ao buscar itens de presente');
  }
}

async function createGiftItem(req, res) {
  try {
    const { gift_id, donation_id, quantity } = req.body;
    const result = await pool.query('INSERT INTO gift_item (gift_id, donation_id, quantity) VALUES ($1, $2, $3) RETURNING *', [gift_id, donation_id, quantity]);

    res.json({
      message: "Item de presente criado",
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

// async function getGiftItemByUser(req, res) {
//   try {
//     const { id } = req.params;
//     const result = await pool.query('SELECT gift_item.id, gift_item.gift_id, gift_item.donation_id, donations.donation_date, users.name as user_name FROM gift_item INNER JOIN gift ON gift_item.gift_id = gift.id INNER JOIN donations ON gift_item.donation_id = donations.id INNER JOIN users ON donations.user_id = users.id WHERE users.id = $1', [id]);

//     if (result.rowCount == 0) {
//       return res.status(404).send('Item de presente não encontrado');
//     }

//     res.json({
//       message: "Item de presente encontrado",
//       gift_item: result.rows[0],
//     });

//   } catch (error) {
//     return res.status(500).send('Erro ao buscar item de presente');
//   }
// }



module.exports = {
  getAllGiftItems,
  createGiftItem,
  getGiftItemById,
  updateGiftItem,
  deleteGiftItem
};