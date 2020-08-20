CREATE DATABASE trv;

CREATE TABLE news(
    id SERIAL PRIMARY KEY,
    title VARCHAR(255),
    preview_text TEXT,
    body TEXT,
    created_at DATE,
    image_url VARCHAR(200)
);