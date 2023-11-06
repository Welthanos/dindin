CREATE DATABASE dindin;

CREATE TABLE usuarios (
    id SERIAL PRIMARY KEY,
    nome TEXT NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    senha VARCHAR(255) NOT NULL
);

CREATE TABLE categorias (
    id SERIAL PRIMARY KEY,
    descricao TEXT NOT NULL
);

CREATE TABLE transacoes (
    id SERIAL PRIMARY KEY,
    tipo VARCHAR(7),
    descricao TEXT NOT NULL,
    valor INT NOT NULL,
    data DATE DEFAULT NOW(),
    usuario_id INT NOT NULL REFERENCES usuarios(id),
    categoria_id INT NOT NULL REFERENCES categorias(id)
);