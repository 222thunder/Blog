const express = require("express");
const postController = require("../controllers/postController");
const upload = require("../middleware/upload");

const postRouter = express.Router();

postRouter.post("/create", upload.single("photo"), postController.createPosts);
postRouter.get("/", postController.getPosts);
postRouter.get("/:postId", postController.getPostById);
postRouter.put("/edit/:postId", upload.single("photo"), postController.editPost);
postRouter.delete("/delete/:postId", postController.deletePost);

module.exports = postRouter;
