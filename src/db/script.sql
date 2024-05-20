CREATE DATABASE donates;

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
    current_quantity INT NOT NULL
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

