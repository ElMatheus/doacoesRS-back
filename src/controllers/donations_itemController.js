const pool = require('../config/dbConfig');

async function getAllDonationsItems(req, res) {
    try {
        // alem disso faça retornar o nome do produto e o nome do usuario e o status da doação
        const result = await pool.query('SELECT donations_items.id as donation_item_id, donations_items.donation_id, donations_items.product_id, donations_items.quantity, donations.donation_date, products.name as product_name, users.name as user_name FROM donations_items INNER JOIN donations ON donations_items.donation_id = donations.id INNER JOIN products ON donations_items.product_id = products.id INNER JOIN users ON donations.user_id = users.id');
        res.json({
            status: 'success',
            message: 'Itens de doações encontrados',
            total: result.rowCount,
            data: result.rows
        });
    }
    catch (error) {
        console.error('Erro ao buscar itens de doações', error);
        res.status(500).send('Erro ao buscar itens de doações');
    }
}

async function createDonationItem(req, res) {
    try {
        const { donation_id, product_id, quantity } = req.body;
        const donation = await pool.query('SELECT * FROM donations WHERE id = $1', [donation_id]);
        const product = await pool.query('SELECT * FROM products WHERE id = $1', [product_id]);

        if (!donation.rows[0]) {
            return res.status(404).send('Doação não encontrada');
        }
        if (!product.rows[0]) {
            return res.status(404).send('Produto não encontrado');
        }

        const result = await pool.query('INSERT INTO donations_items (donation_id, product_id, quantity) VALUES ($1, $2, $3) RETURNING *', [donation_id, product_id, quantity]);
        res.json({
            message: "Item de doação cadastrado com sucesso",
            donations_items: result.rows[0],
        });
    } catch (error) {
        console.error('Erro ao criar item de doação', error);
        res.status(500).send('Erro ao criar item de doação');
    }
}

module.exports = {
    getAllDonationsItems,
    createDonationItem
};