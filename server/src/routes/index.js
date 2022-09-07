const routes = require("express").Router();
const multer = require("multer");
const multerConfig = require("../config/multer");

const Post = require("../models/post");

routes.post(
  "/api/upload",
  multer(multerConfig).single("file"),
  async (req, res) => {
    const { originalname: name, size, key, location: url = ""} = req.file;
    try {
      const post = await Post.create({
        name,
        size,
        key,
        url
      });
      res.status(200).json(post);
    } catch (error) {
      console.log(error);
    }
  }
);

module.exports = routes;
