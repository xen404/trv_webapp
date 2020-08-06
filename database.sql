CREATE DATABASE trv;

CREATE TABLE news(
    id SERIAL PRIMARY KEY,
    title VARCHAR(100),
    preview_text TEXT,
    body TEXT,
    created_at DATE,
    image BYTEA
);