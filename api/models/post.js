const db = require('../database/connect');

class Post {
  constructor({ post_id, user_id, title, content }) {
    this.id = post_id;
    this.user_id = user_id;
    this.title = title;
    this.content = content;
  }

  static async getAll() {
    const response = await db.query('SELECT * FROM post');
    return response.rows.map((p) => new Post(p));
  }

  static async getOneById(id) {
    const response = await db.query('SELECT * FROM post WHERE post_id = $1', [id]);
    if (response.rows.length != 1) {
      throw new Error('Unable to locate post.');
    }
    return new Post(response.rows[0]);
  }

  static async create(data) {
    ///////////////////////////////////////
    const today = new Date()
    const t = new Intl.DateTimeFormat("en-GB", {
      dateStyle: "full",
      timeStyle: "long"})
    const timePosted = t.format(today);
    ///////////////////////////////////////////

    const { title, content, user_id } = data;
    let response = await db.query('INSERT INTO post (title, content, user_id, timeDate) VALUES ($1, $2, $3, $4) RETURNING post_id;', [title, content, user_id, timePosted]);
    const newId = response.rows[0].post_id;

    const newPost = await Post.getOneById(newId);
    return newPost;
  }

  async destroy() {
    let response = await db.query(
      'DELETE FROM post WHERE post_id = $1 RETURNING *;', [this.id] );
    return new Post(response.rows[0]);
  }
}

module.exports = Post;
