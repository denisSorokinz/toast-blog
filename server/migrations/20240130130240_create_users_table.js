export async function up(knex) {
  await knex.schema.createTable('users', (table) => {
    table.specificType('id', 'INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY');
    table.string('login', 100).unique().notNullable();
    table.string('password').notNullable();
    table.specificType('permissions', 'TEXT[]');
    table.timestamp('created_at').defaultTo(knex.fn.now());
  });
}

export async function down(knex) {
  await knex.schema.dropTable('users');
}
