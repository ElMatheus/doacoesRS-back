CREATE DATABASE donates;

\c donates;

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL
);

CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    type VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    value DECIMAL(10, 2) NOT NULL,
    description TEXT NOT NULL,
    target_quantity INT NOT NULL,
    current_quantity INT NOT NULL
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