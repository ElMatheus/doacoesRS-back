const pool = require('../config/dbConfig');

async function getAllDonations(req, res) {
    try {
        const result = await pool.query('SELECT * FROM donations');
        res.json({
            status: 'success',
            message: 'Doações encontradas',
            total: result.rowCount,
            data: result.rows
        });
    } catch (error) {
        console.error('Erro ao buscar doações', error);
        res.status(500).send('Erro ao buscar doações');
    }
}

async function getDonationById(req, res) {
    try {
        const { id } = req.params;
        const result = await pool.query('SELECT * FROM donations WHERE id = $1', [id]);
        if (result.rowCount == 0) {
            res.status(404).json({ message: 'Doação não encontrada' });
        }
        res.json({
            status: 'success',
            message: 'Doação encontrada',
            data: result.rows[0]
        });
        
    } catch (error) {
        console.error('Erro ao buscar doação', error);
        res.status(500).send('Erro ao buscar doação');
    }
}

async function createDonation(req, res) {
    try {
        const {user_id, donation_date, status } = req.body;
        const result = await pool.query('INSERT INTO donations (user_id, donation_date, status) VALUES ($1, $2, $3) RETURNING *', [user_id, donation_date, status]);
        res.json({
            message: "Doação cadastrada com sucesso",
            donations: result.rows[0],
        });
    } catch (error) {
        console.error('Erro ao criar doação', error);
        res.status(500).send('Erro ao criar doação');
    }
}

module.exports = {
    getAllDonations,
    getDonationById,
    createDonation
};