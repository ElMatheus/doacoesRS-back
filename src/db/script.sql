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
    donation_date DATE NOT NULL,
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

DROP TABLE donations_items;
DROP TABLE donations;
DROP TABLE products;
DROP TABLE refresh_tokens;
DROP TABLE users;

\\users insomina : 

{
  "name": "Teste",
  "email": "teste@gmail.com",
  "password": ""
}

\\ products insomina :

{
  "type": "food",
  "name": "Arroz",
  "value": 10.00,
  "description": "Arroz para doação",
  "target_quantity": 100,
  "current_quantity": 0
}

\\ donations insomina :

{
  "user_id": 1,
  "status": "pendente"
}

{
  "user_id": 2,
  "status": "pendente"
}

\\ users insert SQL :

INSERT INTO users (name, email, password) VALUES ('Teste', 'Teste@gmail.com', 123456789);
INSERT INTO users (name, email, password) VALUES ('Teste2', 'Teste2@gmail.com' , 123456789);

\\ donations_items insomina :

{
  "donation_id": 1,
  "product_id": 1,
  "quantity": 10
}

{
  "donation_id": 2,
  "product_id": 1,
  "quantity": 10
}

\\ produtos do figma para o insomina :

pet 

{
  type: "pet",
  name: "Ração Adulto",
  value: 80.00,
  description: "Ração para cachorro",
  target_quantity: 400,
  current_quantity: 150
}

{
  type: "pet",
  name: "Ração Filhote",
  value: 80.00,
  description: "Ração para cachorro filhote",
  target_quantity: 400,
  current_quantity: 150
}

alimentos

{
  type: "food",
  name: "Feijao 2kg",
  value: 24.00,
  description: "Feijao para doação",
  target_quantity: 400,
  current_quantity: 150
}

{
  type: "food",
  name: "Arroz 2kg",
  value: 10.00,
  description: "Arroz para doação",
  target_quantity: 400,
  current_quantity: 150
}

roupas

{
  type: "clothes",
  name: "Tênis/Calçado",
  value: 140.00,
  description: "Tênis para doação",
  target_quantity: 400,
  current_quantity: 150
}

{
  type: "clothes",
  name: "Camiseta",
  value: 40.00,
  description: "Camiseta para doação",
  target_quantity: 400,
  current_quantity: 150
}

higiene

{
  type: "hygiene",
  name: "Sabonete",
  value: 5.00,
  description: "Sabonete para doação",
  target_quantity: 400,
  current_quantity: 150
}

{
  type: "hygiene",
  name: "Shampoo",
  value: 10.00,
  description: "Shampoo para doação",
  target_quantity: 400,
  current_quantity: 150
}

// agora vamos fazer o insert no banco de dados

INSERT INTO products (type, name, value, description, target_quantity, current_quantity) VALUES ('pet', 'Ração Adulto', 80.00, 'Ração para cachorro', 400, 150);
INSERT INTO products (type, name, value, description, target_quantity, current_quantity) VALUES ('pet', 'Ração Filhote', 80.00, 'Ração para cachorro filhote', 400, 150);
INSERT INTO products (type, name, value, description, target_quantity, current_quantity) VALUES ('food', 'Feijao 2kg', 24.00, 'Feijao para doação', 400, 150);
INSERT INTO products (type, name, value, description, target_quantity, current_quantity) VALUES ('food', 'Arroz 2kg', 10.00, 'Arroz para doação', 400, 150);
INSERT INTO products (type, name, value, description, target_quantity, current_quantity) VALUES ('clothes', 'Tênis/Calçado', 140.00, 'Tênis para doação', 400, 150);
INSERT INTO products (type, name, value, description, target_quantity, current_quantity) VALUES ('clothes', 'Camiseta', 40.00, 'Camiseta para doação', 400, 150);
INSERT INTO products (type, name, value, description, target_quantity, current_quantity) VALUES ('hygiene', 'Sabonete', 5.00, 'Sabonete para doação', 400, 150);
INSERT INTO products (type, name, value, description, target_quantity, current_quantity) VALUES ('hygiene', 'Shampoo', 10.00, 'Shampoo para doação', 400, 150);

