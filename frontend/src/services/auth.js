import conf from "../conf/conf.js";

async function login(username, password) {
  try {
    const response = await fetch(`${conf.apiBaseUrl}/auth/login`, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: username, password }),
    });
    if (!response.ok) {
      const err = await response.json();
      throw new Error(err.message || "Login failed");
    }
    return await response.json();
  } catch (error) {
    console.error("Error during login:", error);
    throw error;
  }
}

async function logout() {
  try {
    const response = await fetch(`${conf.apiBaseUrl}/auth/logout`, {
      method: "POST",
      credentials: "include",
    });
    if (!response.ok) {
      const err = await response.json();
      throw new Error(err.message || "Logout failed");
    }
    return await response.json();
  } catch (error) {
    console.error("Error during logout:", error);
    throw error;
  }
}

async function signup(username, password) {
  try {
    const response = await fetch(`${conf.apiBaseUrl}/auth/signup`, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: username, password }),
    });
    if (!response.ok) {
      const err = await response.json();
      throw new Error(err.message || "Signup failed");
    }
    return await response.json();
  } catch (error) {
    console.error("Error during signup:", error);
    throw error;
  }
}

async function getCurrentUser() {
  try {
    const response = await fetch(`${conf.apiBaseUrl}/auth/me`, {
      method: "GET",
      credentials: "include",
    });
    if (!response.ok) return null;
    return await response.json();
  } catch (error) {
    console.error("Error fetching current user:", error);
    return null;
  }
}

const authService = { login, logout, signup, getCurrentUser };
export default authService;
