require('dotenv').config();

const knex = require('knex')({
    client: 'pg',
    debug: (process.env.DEBUG === 'true') || false,
    connection: {
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
    },
    pool: { min: 0, max: 7 }
  }),
  Bookshelf = require('bookshelf')(knex);

Bookshelf.plugin('registry');
Bookshelf.plugin('registry');

module.exports = Bookshelf;