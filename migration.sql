DROP DATABASE IF EXISTS recipe_db;

CREATE DATABASE recipe_db;

DROP TABLE IF EXISTS recipe;

CREATE TABLE recipe(
   id SERIAL PRIMARY KEY NOT NULL,
   recipe_name TEXT NOT NULL,
   recipe_ingredients TEXT NOT NULL,
   recipe_instructions TEXT NOT NULL,
);