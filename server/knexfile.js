import env from 'dotenv';

env.config();

export default {
  development: {
    client: 'postgresql',
    connection: {
      connectionString: process.env.DATABASE_URL,
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: 'knex_migrations',
    },
  },
};
