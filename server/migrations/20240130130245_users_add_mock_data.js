import bcrypt from 'bcrypt';

export async function up(knex) {
  await knex('users').insert({ login: 'user', password: bcrypt.hashSync('qwerty', 1), permissions: ['read:posts'] });
  await knex('users').insert({ login: 'admin', password: bcrypt.hashSync('sudo', 1), permissions: ['read:posts', 'write:posts', 'goto:dashboard'] });
}

export async function down(knex) {
  await knex('users').del();
}
