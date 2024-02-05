export async function up(knex) {
  await knex('posts').insert({ title: 'Some Post #1', content: 'Placeholder text...' });
  await knex('posts').insert({ title: 'post #2' });
}

export async function down(knex) {
  await knex('posts').del();
}
