import conf from "../conf/conf.js";

class PostService {
  async createPost(formData) {
    try {
      const response = await fetch(`${conf.postApi}/create`, {
        method: "POST",
        credentials: "include",
        body: formData, // FormData handles its own Content-Type (multipart/form-data)
      });
      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.message || "Post creation failed");
      }
      return await response.json();
    } catch (error) {
      console.error("PostService::createPost failed", error);
      throw error;
    }
  }

  async updatePost(postId, formData) {
    try {
      const response = await fetch(`${conf.postApi}/edit/${postId}`, {
        method: "PUT",
        credentials: "include",
        body: formData,
      });
      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.message || "Post update failed");
      }
      return await response.json();
    } catch (error) {
      console.error("PostService::updatePost failed", error);
      throw error;
    }
  }

  async deletePost(postId) {
    try {
      const response = await fetch(`${conf.postApi}/delete/${postId}`, {
        method: "DELETE",
        credentials: "include",
      });
      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.message || "Post deletion failed");
      }
      return await response.json();
    } catch (error) {
      console.error("PostService::deletePost failed", error);
      throw error;
    }
  }

  async getPost(postId) {
    try {
      const response = await fetch(`${conf.postApi}/${postId}`, {
        credentials: "include"
      });
      if (!response.ok) {
        throw new Error("Post not found");
      }
      return await response.json();
    } catch (error) {
      console.error("PostService::getPost failed", error);
      throw error;
    }
  }

  async getPosts() {
    try {
      const response = await fetch(`${conf.postApi}/`, {
        credentials: "include"
      });
      if (!response.ok) {
        throw new Error("Failed to fetch posts");
      }
      return await response.json();
    } catch (error) {
      console.error("PostService::getPosts failed", error);
      throw error;
    }
  }
}

const postService = new PostService();
export default postService;
