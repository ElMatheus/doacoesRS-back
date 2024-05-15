const pool = require('../config/dbConfig');

const battleFunc = (hero1, hero2) => {
  const hero1Attack = hero1.attack;
  const hero2Attack = hero2.attack;
  const hero1Hp = hero1.hp;
  const hero2Hp = hero2.hp;
  let hero1CountAtacks = 0;
  let hero2CountAtacks = 0;
  let hero1Turn = true;
  let hero1CurrentHp = hero1Hp;
  let hero2CurrentHp = hero2Hp;
  while (hero1CurrentHp > 0 && hero2CurrentHp > 0) {
    if (hero1Turn) {
      hero2CurrentHp -= hero1Attack;
      hero1CountAtacks++;
      console.log(hero1.name + ' atacou e tirou ' + hero1Attack + ' de vida do ' + hero2.name + ' deixando com ' + hero2CurrentHp + ' de vida restante');
    } else {
      hero1CurrentHp -= hero2Attack;
      hero2CountAtacks++;
      console.log(hero2.name + ' atacou e tirou ' + hero2Attack + ' de vida do ' + hero1.name + ' deixando com ' + hero1CurrentHp + ' de vida restante');
    }
    hero1Turn = !hero1Turn;
  }
  if (hero1CurrentHp > 0) {
    pool.query('UPDATE heroes SET level = $1 WHERE id = $2 RETURNING *', [hero1.level + 1, hero1.id]);
    return { heroW: hero1, heroD: hero2, countAtacks: hero1CountAtacks };
  } else {
    pool.query('UPDATE heroes SET level = $1 WHERE id = $2 RETURNING *', [hero2.level + 1, hero2.id]);
    return { heroW: hero2, heroD: hero2, countAtacks: hero2CountAtacks };
  }
};

module.exports = battleFunc;