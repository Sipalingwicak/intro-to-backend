import { Post } from "../models/post.model.js";

//create a post
const createPost = async (req, res) => {
  try {
    const { name, description, age } = req.body;

    if (!name || !description || !age) {
      return res.status(400).json({
        message: "All field required!",
      });
    }
    const post = await Post.create({ name, description, age });

    res.status(201).json({
      message: "Post created sucessfully",
      post,
    });
  } catch (error) {
    res.status(400).json({
      message: "Internal Server Error",
      error,
    });
  }
};

const getPosts = async (req, res) => {
  try {
    const posts = await Post.find();
    res.status(200).json(posts);
  } catch (error) {
    res.status(400).json({
      message: "Internal Server Error",
      error,
    });
  }
};

const updatePost = async (req, res) => {
  try {
    // basic validasi

    //
    if (Object.keys(req.body).length === 0) {
      return res.status(400).json({
        message: "No data provided for update",
      });
    }

    const post = await Post.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!post)
      return res.status(404).json({
        message: "Post not found",
      });

    res.status(202).json({
      message: "Post successfully updated!!",
      post,
    });
  } catch (error) {
    res.status(400).json({
      message: "Internal Server Error",
      error,
    });
  }
};

export { createPost, getPosts, updatePost };
