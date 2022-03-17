CREATE TABLE users (
	id SERIAL PRIMARY KEY,
	name TEXT NOT NULL,
	email TEXT NOT NULL UNIQUE,
	password TEXT NOT NULL
);

CREATE TABLE sessions (
   id SERIAL PRIMARY KEY,
   token TEXT NOT NULL UNIQUE,
   "userId" INTEGER NOT NULL REFERENCES users(id)
);

CREATE TABLE urls (
	id SERIAL PRIMARY KEY,
	"userId" INTEGER NOT NULL REFERENCES users(id),
	"url" TEXT NOT NULL,
	"shortUrl" TEXT NOT NULL
);

CREATE TABLE visitsCount (
	id SERIAL PRIMARY KEY,
	"visitCount" INTEGER NOT NULL,
	"urlId" INTEGER NOT NULL REFERENCES urls(id)
);