import { Post } from "../models/post.model";

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

    res.status(200).json({
      message: "Post created sucessfully",
    });
  } catch (error) {
    res.status(400).json({
      message: "Internal Server Error",
    });
  }
};

export { createPost };
