export default {
  development: {
    client: 'postgresql',
    connection: {
      connectionString: 'postgres://qwerty@localhost/db_blog',
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
