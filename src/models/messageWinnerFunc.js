const generateMessageBattle = (winner, countAtacks, loser) => {
  return `${winner.name} venceu a batalha com ${countAtacks} golpes, ${loser.name} foi derrotado`;
};

module.exports = generateMessageBattle;