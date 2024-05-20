const pool = require('../config/dbConfig');
const bcrypt = require('bcrypt');

const { hash, compare } = bcrypt;



async function getAllUsers(req, res) {
  try {
    const result = await pool.query('SELECT * FROM users');
    return res.json({
      total: result.rowCount,
      users: result.rows,
    });
  } catch (error) {
    console.error('Erro ao buscar usuarios', error);
    res.status(500).send('Erro ao buscar usuarios');
  }
}

async function getUserById(req, res) {
  try {
    const { id } = req.params;
    const result = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
    if (result.rowCount === 0) {
      return res.status(404).json({ message: 'Usuario não encontrado' });
    }
    return res.json(result.rows[0]);
  } catch (error) {
    console.error('Erro ao buscar usuario', error);
    res.status(500).send('Erro ao buscar usuario');
  }
}

async function getUserByName(req, res) {
  try {
    const { name } = req.params;
    const result = await pool.query('SELECT * FROM users WHERE name = $1', [name]);
    if (result.rowCount === 0) {
      return res.status(404).json({ message: 'Usuario não encontrado' });
    }
    return res.json(result.rows[0]);
  } catch (error) {
    console.error('Erro ao buscar usuario', error);
    res.status(500).send('Erro ao buscar usuario');
  }
}

async function createUser(req, res) {
  try {
    const { name, email, password } = req.body;
    const userAlreadyExists = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    if (userAlreadyExists.rowCount !== 0) {
      return res.status(400).json({ message: 'Email já cadastrado' });
    }
    const passwordHash = await hash(password, 8);
    const result = await pool.query('INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *', [name, email, passwordHash]);
    return res.json({
      message: "Usuario cadastrado com sucesso",
      users: result.rows[0],
    });
  } catch (error) {
    console.error('Erro ao criar usuario', error);
    res.status(500).send('Erro ao criar usuarios');
  }
}

async function updateUser(req, res) {
  try {
    const { id } = req.params;
    const { name, email, password } = req.body;
    const userAlreadyExistsId = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
    const userAlreadyExistsEmail = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    if (userAlreadyExistsId.rowCount === 0) {
      return res.status(404).json({ message: 'Usuario não encontrado' });
    }
    if (userAlreadyExistsEmail.rowCount !== 0) {
      return res.status(400).json({ message: 'Email já cadastrado' });
    }
    const passwordHash = await hash(password, 8);
    const result = await pool.query('UPDATE users SET name = $1, email = $2, password = $3 WHERE id = $4 RETURNING *', [name, email, passwordHash, id]);
    return res.json({
      message: "Usuario atualizado com sucesso",
      users: result.rows[0],
    });
  } catch (error) {
    console.error('Erro ao atualizar usuario', error);
    res.status(500).send('Erro ao atualizar usuario');
  }
}

async function deleteUser(req, res) {
  try {
    const { id } = req.params;
    const result = await pool.query('DELETE FROM users WHERE id = $1', [id]);
    if (result.rowCount === 0) {
      return res.status(404).json({ message: 'Usuario não encontrado' });
    }
    return res.json({ message: 'Usuario deletado com sucesso' });
  } catch (error) {
    console.error('Erro ao deletar usuario', error);
    res.status(500).send('Erro ao deletar usuario');
  }
}

async function loginUser(req, res) {
  try {
    const { name, password } = req.body;

    const user = await pool.query('SELECT * FROM users WHERE name = $1', [name]);

    if (!user.rows[0]) {
      return res.status(404).send({ message: "Usuário não encontrado" });
    }
    const passwordMatch = await compare(password, user.rows[0].password);

    if (!passwordMatch) {
      return res.status(401).send({ message: "Nome ou senha inválidos" });
    }
    
    // const token = sign({}, 'ca94e53c-e4e7-422a-9558-f32670cce6a5', {
    //   subject: user.rows[0].id,
    //   expiresIn: '15m'
    // });
    
    // const generateRefreshToken = new Refresh(user.id);
    // const refreshToken = await refreshRepository.createRefreshToken(generateRefreshToken);
    
    return res.status(200).send({ user: user.rows[0], token: "token" });
  } catch (error) {
    return res.status(500).send({ message: "Erro ao realizar login", error: error.message });
  }
};
    

module.exports = { getAllUsers, getUserById, getUserByName, createUser, updateUser, deleteUser, loginUser };