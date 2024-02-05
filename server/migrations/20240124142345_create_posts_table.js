export async function up(knex) {
  await knex.schema.createTable('posts', (table) => {
    table.specificType('id', 'INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY');
    table.string('title', 100).unique().notNullable();
    table.string('content');
    table.timestamp('created_at').defaultTo(knex.fn.now());
  });
}

export async function down(knex) {
  await knex.schema.dropTable('posts');
}
