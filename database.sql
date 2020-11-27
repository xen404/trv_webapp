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

CREATE TABLE appointments(
    id SERIAL PRIMARY KEY,
    date DATE UNIQUE NOT NULL,
    name VARCHAR(100) NOT NULL,
    info VARCHAR(500),
    time VARCHAR(100)
);

CREATE TABLE rowingdays(
    id SERIAL PRIMARY KEY,
    days smallint[],
    time VARCHAR(100),
    amount smallint
);

insert into rowingdays (days, time, amount) values(array[1, 3, 5], '18:00', '20');

