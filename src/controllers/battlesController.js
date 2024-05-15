const pool = require('../config/dbConfig');
const battleFunc = require('../models/battleFunc');
const generateMessageBattle = require('../models/messageWinnerFunc');

async function getAllBattles(req, res) {
  try {
    const battles = await pool.query('SELECT battles.id AS id_batalha, hero1.name AS nome_heroi1, hero1.level AS level_heroi1, hero1.power AS poder_heroi1, hero1.hp AS hp_heroi1, hero1.attack AS attack_heroi1, hero2.name AS nome_heroi2, hero2.level AS level_heroi2, hero2.power AS poder_heroi2, hero2.hp AS hp_heroi2, hero2.attack AS attack_heroi2,winner.name AS heroi_vencedor, battles.message AS mensagem FROM battles INNER JOIN heroes AS hero1 ON hero1.id = battles.hero1_id INNER JOIN heroes AS hero2 ON hero2.id = battles.hero2_id INNER JOIN heroes AS winner ON winner.id = battles.winner_id;');
    res.json({
      total: battles.rowCount,
      battles: battles.rows,
    });
  } catch (error) {
    console.error('Erro ao buscar batalhas', error);
    res.status(500).send('Erro ao buscar batalhas');
  }
};

async function getBattleByHeroName(req, res) {
  try {
    const { name } = req.params;
    const battles = await pool.query('SELECT battles.id AS id_batalha, hero1.name AS nome_heroi1, hero1.level AS level_heroi1, hero1.power AS poder_heroi1, hero1.hp AS hp_heroi1, hero1.attack AS attack_heroi1, hero2.name AS nome_heroi2, hero2.level AS level_heroi2, hero2.power AS poder_heroi2, hero2.hp AS hp_heroi2, hero2.attack AS attack_heroi2,winner.name AS heroi_vencedor, battles.message AS mensagem FROM battles INNER JOIN heroes AS hero1 ON hero1.id = battles.hero1_id INNER JOIN heroes AS hero2 ON hero2.id = battles.hero2_id INNER JOIN heroes AS winner ON winner.id = battles.winner_id WHERE hero1.name = $1 OR hero2.name = $1;', [name]);
    if (battles.rowCount === 0) {
      return res.status(404).json({ message: 'Heroi ainda não batalhou!' });
    }
    res.json({
      total: battles.rowCount,
      battles: battles.rows,
    });
  } catch (error) {
    console.error('Erro ao buscar batalhas', error);
    res.status(500).send('Erro ao buscar batalhas');
  }
};

async function battle(req, res) {
  try {
    const { heroi1, heroi2 } = req.params;
    const hero1 = await pool.query('SELECT * FROM heroes WHERE id = $1', [heroi1]);
    const hero2 = await pool.query('SELECT * FROM heroes WHERE id = $1', [heroi2]);
    if (hero1.rowCount === 0 || hero2.rowCount === 0) {
      return res.status(404).json({ message: 'Heroi não encontrado' });
    } else {
      console.log(hero1.rows[0], hero2.rows[0]);
      const winner = battleFunc(hero1.rows[0], hero2.rows[0]);
      pool.query('INSERT INTO battles (hero1_id, hero2_id, winner_id, message) VALUES ($1, $2, $3, $4)', [hero1.rows[0].id, hero2.rows[0].id, winner.heroW.id, generateMessageBattle(winner.heroW, winner.countAtacks, winner.heroD)]);
      return res.json({
        winner: winner.heroW,
        golpes: winner.countAtacks,
        message: 'Batalha finalizada',
      });
    }
  } catch (error) {
    console.error('Erro ao batalhar', error);
    res.status(500).send('Erro ao batalhar');
  }
};

module.exports = { getAllBattles, getBattleByHeroName, battle };