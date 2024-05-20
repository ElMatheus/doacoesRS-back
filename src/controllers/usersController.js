const pool = require('../config/dbConfig');
const bcrypt = require('bcrypt');
const { sign } = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');
const dayjs = require('dayjs');

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

    const token = sign({}, '0f5c405c-a1a3-4ded-814f-d1e4d8d3b814', {
      subject: user.rows[0].id.toString(),
      expiresIn: '15m'
    });

    const expiresIn = dayjs().add(15, 'day').unix();

    const generateRefreshToken = await pool.query('INSERT INTO refresh_tokens (token, expiresIn, user_id) VALUES ($1, $2, $3) RETURNING *', [uuidv4(), expiresIn, user.rows[0].id]);

    return res.status(200).send({ user: user.rows[0], token, refreshToken: generateRefreshToken.rows[0] });
  } catch (error) {
    return res.status(500).send({ message: "Erro ao realizar login", error: error.message });
  }
};

async function refreshToken(req, res) {
  try {
    const { refreshToken } = req.body;

    const token = await pool.query('SELECT * FROM refresh_tokens WHERE token = $1', [refreshToken]);

    if (!token.rows[0]) {
      return res.status(404).send({ message: "Token inválido ou expirado" });
    }

    const newToken = sign({}, '0f5c405c-a1a3-4ded-814f-d1e4d8d3b814', {
      subject: token.rows[0].token.toString(),
      expiresIn: '15m'
    });

    return res.status(200).send({ token: newToken, refreshToken: token.rows[0]});
  } catch (error) {
    return res.status(500).send({ message: "Erro ao realizar refresh", error: error.message });
  }
};




module.exports = { getAllUsers, getUserById, getUserByName, createUser, updateUser, deleteUser, loginUser, refreshToken };