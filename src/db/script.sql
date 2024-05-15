CREATE DATABASE heroes;

CREATE TABLE IF NOT EXISTS heroes (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  level INT NOT NULL,
  power VARCHAR(100) NOT NULL,
  hp INT NOT NULL,
  attack INT NOT NULL
);

INSERT INTO heroes (name, level, power, hp, attack) VALUES ('Superman', 1, 'Super Forca', 180, 120);
INSERT INTO heroes (name, level, power, hp, attack) VALUES ('Homelander', 1, 'Raios lazers', 170, 135);
INSERT INTO heroes (name, level, power, hp, attack) VALUES ('Batman', 1, 'Dinheiro', 180, 80);
INSERT INTO heroes (name, level, power, hp, attack) VALUES ('Homem de Ferro', 1, 'Armadura', 170, 90);
INSERT INTO heroes (name, level, power, hp, attack) VALUES ('Mulher Maravilha', 1, 'Laço da verdade', 150, 145);
INSERT INTO heroes (name, level, power, hp, attack) VALUES ('Flash', 1, 'Velocidade', 155, 110);
INSERT INTO heroes (name, level, power, hp, attack) VALUES ('Hulk', 1, 'Super Forca', 150, 150);

CREATE TABLE IF NOT EXISTS battles (
  id SERIAL PRIMARY KEY,
  hero1_id INT NOT NULL,
  hero2_id INT NOT NULL,
  winner_id INT NOT NULL,
  message TEXT NOT NULL,
  FOREIGN KEY (hero1_id) REFERENCES heroes(id),
  FOREIGN KEY (hero2_id) REFERENCES heroes(id),
  FOREIGN KEY (winner_id) REFERENCES heroes(id)
);

