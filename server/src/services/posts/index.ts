import { Knex } from 'knex';
import DatabaseService from '../database';
import IPost from '../../types/post';

class PostsService {
  private static _instance: PostsService;
  private _db: Knex;

  constructor() {
    this._db = DatabaseService.getInstance();
  }

  static getInstance() {
    if (!PostsService._instance) PostsService._instance = new PostsService();

    return PostsService._instance;
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

  async editPostById(id: number, post: Pick<IPost, 'id'> & Partial<IPost>) {
    if (!this._db) throw new Error('No active DB connection available');

    const old = await this._db('posts').where({ id }).select('*').first();
    if (!old) throw new Error(`post with id ${id} does not exist`);

    const updated = { ...old, ...post };
    delete updated['id'];

    await this._db('posts')
      .where({ id })
      .update({ ...updated });

    return { ...updated, id };
  }
}

export default PostsService;
