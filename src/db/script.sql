CREATE DATABASE donates;

\c donates;

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL
);

CREATE TABLE refresh_tokens (
    token VARCHAR(36) PRIMARY KEY,
    expiresIn INT NOT NULL,
    user_id INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    type VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    value DECIMAL(10, 2) NOT NULL,
    description TEXT NOT NULL,
    target_quantity INT NOT NULL,
    current_quantity INT NOT NULL,
    image VARCHAR(255)
);

CREATE TABLE donations(
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    donation_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    status VARCHAR(255) NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE donations_items(
  id SERIAL PRIMARY KEY,
  donation_id INT NOT NULL,
  product_id INT NOT NULL,
  quantity INT NOT NULL,
  FOREIGN KEY (donation_id) REFERENCES donations(id),
  FOREIGN KEY (product_id) REFERENCES products(id)
);

CREATE TABLE gift(
id SERIAL PRIMARY KEY,
product_choiceID INT,
type VARCHAR(255) NOT NULL,
name VARCHAR(255) NOT NULL,
description TEXT,
image VARCHAR(255)
);

// faça um insert na tabela gift no insominia 

{
    "type": "clothes",
    "name": "Camiseta",
    "description": "Camiseta para doação",
    "image": "https://i.imgur.com/OXN41lb.png"

}


CREATE TABLE gift_item(
id SERIAL PRIMARY KEY,
gift_id INT NOT NULL,
donation_id INT NOT NULL,
quantity INT NOT NULL,
delivery_place VARCHAR(255) NOT NULL,
FOREIGN KEY (donation_id) REFERENCES donations(id),
FOREIGN KEY (gift_id) REFERENCES gift(id)
);



DROP TABLE donations_items;
DROP TABLE donations;
DROP TABLE products;
DROP TABLE refresh_tokens;
DROP TABLE users;
DROP TABLE gift_item;
DROP TABLE gift;

INSERT INTO users (name, email, password) VALUES ('Teste', 'Teste@gmail.com', 123456789);
INSERT INTO users (name, email, password) VALUES ('Teste2', 'Teste2@gmail.com' , 123456789);

// agora vamos fazer o insert no banco de dados

INSERT INTO products (type, name, value, description, image, target_quantity, current_quantity) VALUES ('pet', 'Ração Adulto', 80.00, 'Ração para cachorro','https://i.imgur.com/5QOvDoQ.png',400, 150);
INSERT INTO products (type, name, value, description, image, target_quantity, current_quantity) VALUES ('pet', 'Ração Filhote', 80.00, 'Ração para cachorro filhote','https://i.imgur.com/WrM6oqo.png',400, 150);
INSERT INTO products (type, name, value, description, image, target_quantity, current_quantity) VALUES ('food', 'Feijao 2kg', 24.00, 'Feijao para doação','https://i.imgur.com/i8fg3kF.png',400, 150);
INSERT INTO products (type, name, value, description, image, target_quantity, current_quantity) VALUES ('food', 'Arroz 2kg', 10.00, 'Arroz para doação','https://i.imgur.com/NKZXMJX.png',400, 150);
INSERT INTO products (type, name, value, description, image, target_quantity, current_quantity) VALUES ('clothes', 'Tênis/Calçado', 140.00, 'Tênis para doação','https://i.imgur.com/VidyIzQ.png',400, 150);
INSERT INTO products (type, name, value, description, image, target_quantity, current_quantity) VALUES ('clothes', 'Camiseta', 40.00, 'Camiseta para doação','https://i.imgur.com/OXN41lb.png',400, 150);
INSERT INTO products (type, name, value, description, image, target_quantity, current_quantity) VALUES ('hygiene', 'Sabonete', 5.00, 'Sabonete para doação', 'https://i.imgur.com/9hrqWQn.jpeg', 400, 150);
INSERT INTO products (type, name, value, description, image, target_quantity, current_quantity) VALUES ('hygiene', 'Shampoo', 10.00, 'Shampoo para doação', 'https://i.imgur.com/944WOut.png',400, 150);







-- Para a tabela users
INSERT INTO users (name, email, password) VALUES ('Teste', 'Teste@gmail.com', '123456789');
INSERT INTO users (name, email, password) VALUES ('Teste2', 'Teste2@gmail.com' , '123456789');

-- Para a tabela products
INSERT INTO products (type, name, value, description, image, target_quantity, current_quantity) VALUES ('pet', 'Ração Adulto', 80.00, 'Ração para cachorro', 'https://i.imgur.com/5QOvDoQ.png', 400, 150);
INSERT INTO products (type, name, value, description, image, target_quantity, current_quantity) VALUES ('pet', 'Ração Filhote', 80.00, 'Ração para cachorro filhote', 'https://i.imgur.com/WrM6oqo.png', 400, 150);
INSERT INTO products (type, name, value, description, image, target_quantity, current_quantity) VALUES ('food', 'Feijao 2kg', 24.00, 'Feijao para doação', 'https://i.imgur.com/i8fg3kF.png', 400, 150);
INSERT INTO products (type, name, value, description, image, target_quantity, current_quantity) VALUES ('food', 'Arroz 2kg', 10.00, 'Arroz para doação', 'https://i.imgur.com/NKZXMJX.png', 400, 150);
INSERT INTO products (type, name, value, description, image, target_quantity, current_quantity) VALUES ('clothes', 'Tênis/Calçado', 140.00, 'Tênis para doação', 'https://i.imgur.com/VidyIzQ.png', 400, 150);
INSERT INTO products (type, name, value, description, image, target_quantity, current_quantity) VALUES ('clothes', 'Camiseta', 40.00, 'Camiseta para doação', 'https://i.imgur.com/OXN41lb.png', 400, 150);
INSERT INTO products (type, name, value, description, image, target_quantity, current_quantity) VALUES ('hygiene', 'Sabonete', 5.00, 'Sabonete para doação', 'https://i.imgur.com/9hrqWQn.jpeg', 400, 150);
INSERT INTO products (type, name, value, description, image, target_quantity, current_quantity) VALUES ('hygiene', 'Shampoo', 10.00, 'Shampoo para doação', 'https://i.imgur.com/944WOut.png', 400, 150);

-- Para a tabela donations
INSERT INTO donations (user_id, donation_date, status) VALUES (1, '2024-06-05', 'Pendente');
INSERT INTO donations (user_id, donation_date, status) VALUES (2, '2024-06-05', 'Pendente');

-- Para a tabela donations_items
INSERT INTO donations_items (donation_id, product_id, quantity) VALUES (1, 1, 2);
INSERT INTO donations_items (donation_id, product_id, quantity) VALUES (1, 3, 1);
INSERT INTO donations_items (donation_id, product_id, quantity) VALUES (2, 2, 3);
