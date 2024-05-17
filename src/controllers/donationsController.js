const pool = require('../config/dbConfig');



async function getAllDonations(req, res) {
    try {
        const result = await pool.query('SELECT donations.id as donation_id, users.id as user_id, * FROM donations INNER JOIN users ON donations.user_id = users.id');
        res.json({
            status: 'success',
            message: 'Doações encontradas',
            total: result.rowCount,
            data: result.rows
        });
    }
    catch (error) {
        console.error('Erro ao buscar doações', error);
        res.status(500).send('Erro ao buscar doações');
    }
}



async function createDonation(req, res) {
    try {
        const { user_id, status } = req.body;
        const donation_date = new Date();
        const user = await pool.query('SELECT * FROM users WHERE id = $1', [user_id]);

        if (user.rowCount === 0) {
            console.error('Usuário não encontrado');
            res.status(404).send('Usuário não encontrado');
        }

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
    // getDonationById,
    createDonation
};