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

  async editPostById(id: number, post: Partial<IPost>) {
    if (!this._db) throw new Error('No active DB connection available');

    const postExists = !!(await this._db('posts').where({ id }).select('*').first());
    console.log(id, post);
    if (!postExists) throw new Error(`post with id ${id} does not exist`);

    const updated = await this._db('posts')
      .where({ id })
      .update({ ...post });

    console.log({ updated });

    return updated;
  }
}

export default PostsService;
