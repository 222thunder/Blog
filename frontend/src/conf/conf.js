const baseUrl = ""; // Forced to empty string to use proxy (Vite locally, Vercel in production)

const conf = {
  apiBaseUrl: baseUrl + "/api",
  postApi: baseUrl + "/api/post",
};

export default conf;
