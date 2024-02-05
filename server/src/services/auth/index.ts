import { Knex } from 'knex';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import DatabaseService from '../database';

class AuthService {
  private _db: Knex;

  constructor() {
    this._db = DatabaseService.getInstance();
  }

  async signUp(login: string, password: string) {
    if (!(login && password)) throw new Error('invalid parameters');

    // if user exists -> return
    const user = await this._db('users').where({ login }).select('*').first();
    if (user) throw new Error('user already exists');

    // create user in DB
    try {
      const hash = await bcrypt.hash(password, 1);
      await this._db('users').insert({ login, password: hash, permissions: ['read:posts'] });
    } catch (err) {
      console.log('error creating user:', err);
      throw new Error('error creating user');
    }

    return { success: true };
  }

  async login(login: string, password: string) {
    if (!(login && password)) throw new Error('invalid parameters');

    // check if user is in DB w/ login
    let user;
    try {
      user = await this._db('users').where({ login }).first();
    } catch (err) {
      console.log('error retrieving user', err);
      throw new Error('error retrieving user');
    }

    // if not -> throw
    if (!user) throw new Error('user does not exist');

    const match = await bcrypt.compare(password, user.password);
    if (!match) throw new Error('wrong password');

    /* sign a JWT token w/ payload:
      { userId, permissions }
    */
    const accessToken = jwt.sign({ userId: user.id, permissions: user.permissions }, process.env.TOKEN_SECRET!);

    return { success: true, accessToken };
  }
}

export default AuthService;
