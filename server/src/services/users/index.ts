import { Knex } from 'knex';
import DatabaseService from '../database';

class PostsService {
  private _db: Knex;

  constructor() {
    this._db = DatabaseService.getInstance();
  }

  async getPostById(id: number) {
    if (!this._db) throw new Error('No active DB connection available');

    const post = await this._db('posts').where({ id }).select('*').first();
    return post;
  }
}

export default PostsService;
