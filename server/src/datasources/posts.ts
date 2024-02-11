import DataLoader from 'dataloader';
import PostsService from '../services/posts';
import IPost from '../types/post';

class PostsDataSource {
  private _PS: PostsService;

  constructor() {
    this._PS = new PostsService();
  }

  private batchPosts = new DataLoader<number, IPost>(async (ids) => {
    const posts = await this._PS.getPostsByIds(ids);

    const mapIdToPost = posts.reduce((mapping, post) => {
      mapping[post.id] = post;
      return mapping;
    }, {});

    return ids.map((id) => mapIdToPost[id]);
  });

  async getAllPosts() {
    const posts = await this._PS.getAllPosts();
    posts.forEach((post) => this.batchPosts.prime(post.id, post));

    return posts;
  }

  async getPostById(id: number) {
    const post = await this.batchPosts.load(id);

    return post;
  }
}

export default PostsDataSource;
