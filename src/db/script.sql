CREATE DATABASE donates;

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
  "donation_date": "2021-10-10",
  "status": "pendente"
}

\\ users insert SQL :

INSERT INTO users (name, email, password) VALUES ('Teste', 'Teste@gmail.com', 123456789);