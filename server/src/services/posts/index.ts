import { Knex } from 'knex';
import DatabaseService from '../database';

class PostsService {
  private _db: Knex;

  constructor() {
    this._db = DatabaseService.getInstance();
  }

  async getAllPosts() {
    if (!this._db) throw new Error('No active DB connection available');

    const posts = await this._db('posts').select('*');
    return posts;
  }

  async getPostById(id: number) {
    if (!this._db) throw new Error('No active DB connection available');

    const post = await this._db('posts').where({ id }).select('*').first();
    return post;
  }

  async getPostsByIds(ids: readonly number[]) {
    if (!this._db) throw new Error('No active DB connection available');

    // todo: refactor
    const post = await this._db('posts').whereIn('id', ids).select('*');
    return post;
  }
}

export default PostsService;
