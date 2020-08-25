CREATE DATABASE trv;

CREATE TABLE news(
    id SERIAL PRIMARY KEY,
    title VARCHAR(255),
    preview_text TEXT,
    body TEXT,
    created_at DATE,
    image_url VARCHAR(200)
);

CREATE TYPE role AS ENUM ('ADMIN', 'EDITOR', 'BASIC');

CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(100) NOT NULL,
    role role NOT NULL,
    created_at TIMESTAMP
);