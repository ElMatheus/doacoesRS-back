const pool = require('../config/dbConfig');

async function getAllProducts(req, res) {
    try {
        const result = await pool.query('SELECT * FROM products');
        res.json({
            status: 'success',
            message: 'Produtos encontrados',
            total: result.rowCount,
            data: result.rows
        });
    } catch (error) {
        return res.status(500).send('Erro ao buscar produtos');
    }
}

async function getProductById(req, res) {
    try {
        const { id } = req.params;
        const result = await pool.query('SELECT * FROM products WHERE id = $1', [id]);
        if (result.rowCount === 0) {
            return res.status(404).json({ message: 'Produto não encontrado' });
        }
        res.json({
            status: 'success',
            message: 'Produto encontrado',
            data: result.rows[0]
        });

    } catch (error) {
        return res.status(500).send('Erro ao buscar produto');
    }
}

async function createProduct(req, res) {
    try {
        const { type, name, value, description, target_quantity, current_quantity, image } = req.body;
        const result = await pool.query('INSERT INTO products (type, name, value, description, target_quantity, current_quantity, image) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *', [type, name, value, description, target_quantity, current_quantity, image]);
        res.json({
            message: "Produto cadastrado com sucesso",
            products: result.rows[0],
        });
    } catch (error) {
        console.error('Erro ao criar produto', error);
        res.status(500).send('Erro ao criar produto');
    }
}

async function getProductByName(req, res) {
    try {
        const { name } = req.params;
        const result = await pool.query('SELECT * FROM products WHERE LOWER(name) LIKE $1', [`%${name.toLocaleLowerCase()}%`]);
        if (result.rowCount == 0) {
            return res.status(404).json({ message: 'Produto não encontrado' });
        }
        res.json({
            status: 'success',
            message: 'Produto encontrado',
            data: result.rows
        });
    } catch (error) {
        return res.status(500).send('Erro ao buscar produto');
    }
}

async function getProductByType(req, res) {
    try {
        const { type } = req.params;
        const result = await pool.query('SELECT * FROM products WHERE LOWER(type) LIKE $1', [`%${type.toLocaleLowerCase()}%`]);
        if (result.rowCount == 0) {
            return res.status(404).json({ message: 'Produto não encontrado' });
        }
        res.json({
            status: 'success',
            message: 'Produto encontrado',
            total: result.rowCount,
            data: result.rows
        });
    } catch (error) {
        return res.status(500).send('Erro ao buscar produto');
    }
}

async function updateProduct(req, res) {
    try {
        const { id } = req.params;
        const { type, name, value, description, target_quantity, current_quantity, image } = req.body;
        const result = await pool.query('UPDATE products SET type = $1, name = $2, value = $3, description = $4, target_quantity = $5, current_quantity = $6, image = $7 WHERE id = $8 RETURNING *', [type, name, value, description, target_quantity, current_quantity, image, id]);
        if (result.rowCount == 0) {
            return res.status(404).json({ message: 'Produto não encontrado' });
        }
        res.json({
            message: "Produto atualizado com sucesso",
            products: result.rows[0],
        });
    } catch (error) {
        return res.status(500).send('Erro ao atualizar produto');
    }
}

async function deleteProduct(req, res) {
    try {
        const { id } = req.params;
        const result = await pool.query('DELETE FROM products WHERE id = $1', [id]);
        if (result.rowCount == 0) {
            return res.status(404).json({ message: 'Produto não encontrado' });
        }
        res.json({
            message: "Produto deletado com sucesso",
        });
    } catch (error) {
        return res.status(500).send('Erro ao deletar produto');
    }
}

async function getGoalOfTypesProducts(req, res) {
    try {
        const result = await pool.query('SELECT products.type, SUM(products.current_quantity) AS current_quantity, SUM(products.target_quantity) AS target_quantity FROM products GROUP BY products.type');
        res.json({
            status: 'success',
            message: 'Metas encontradas',
            data: result.rows
        });
    } catch (error) {
        return res.status(500).send('Erro ao buscar metas');
    }
}

module.exports = {
    getAllProducts,
    getProductById,
    createProduct,
    getProductByName,
    getProductByType,
    updateProduct,
    deleteProduct,
    getGoalOfTypesProducts
};