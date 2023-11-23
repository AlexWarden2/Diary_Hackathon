const Post = require('../models/post');
const Token = require('../models/token');
const User = require('../models/user');

const index = async (req, res) => {
  try {
    const posts = await Post.getAll();
    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const create = async (req, res) => {
  try {
    const data = req.body;
    const userToken = req.headers['authorization'];
    const token = await Token.getOneByToken(userToken);

    const result = await Post.create({ ...data, user_id: token.user_id });
    res.status(201).send(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const show = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const post = await Post.getOneById(id);
    res.json(post);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};

const destroy = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const userToken = req.headers['authorization'];
    const token = await Token.getOneByToken(userToken);
    const user = await User.getOneById(token.user_id);

    const post = await Post.getOneById(id);

    if (post.user_id === user.id || user.isAdmin) {
      const result = await post.destroy();
      res.status(204).end();
    } else {
      res.status(403).json({
        error: 'You must be an admin/author to delete this!'});
    }
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};

module.exports = { index, create, show, destroy };
