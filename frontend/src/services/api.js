import conf from "../conf/conf.js";

// ─── helper ───────────────────────────────────────────────────────────────────
async function request(url, options = {}) {
  const response = await fetch(url, {
    credentials: "include", // always send session cookie
    ...options,
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.message || "Request failed");
  return data;
}

// ─── GET /api/post/ ───────────────────────────────────────────────────────────
async function getPosts() {
  return request(`${conf.postApi}/`);
  // returns: { posts: [ { _id, title, content, photo, author: { _id, email }, createdAt, ... } ] }
}

// ─── POST /api/post/create ────────────────────────────────────────────────────
async function createPost({ title, content, photo = null }) {
  const formData = new FormData();
  formData.append("title", title);
  formData.append("content", content);
  if (photo) formData.append("photo", photo); // File object from <input type="file">

  return request(`${conf.postApi}/create`, {
    method: "POST",
    body: formData,
    // ⚠️  Do NOT set Content-Type manually — browser sets it with the boundary automatically
  });
  // returns: { message: "Post created successfully", post: { ... } }
}

// ─── PUT /api/post/edit/:postId ───────────────────────────────────────────────
async function editPost(postId, { title, content }) {
  return request(`${conf.postApi}/edit/${postId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title, content }),
  });
  // returns: { message: "Post updated successfully", post: { ... } }
}

// ─── DELETE /api/post/delete/:postId ─────────────────────────────────────────
async function deletePost(postId) {
  return request(`${conf.postApi}/delete/${postId}`, {
    method: "DELETE",
  });
  // returns: { message: "Post deleted successfully" }
}

// ─── exports ──────────────────────────────────────────────────────────────────
const hello = async () => {
  const data = await fetch(conf.helloApi);
  const result = await data.json();
  return result;
};

export { hello, getPosts, createPost, editPost, deletePost };
