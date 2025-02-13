<template>
  <form @submit.prevent="submitLogin" class="login-form">
    <h2 class="form-title">Sign In</h2>

    <div class="form-group">
      <label for="username">Username</label>
      <input
        id="username"
        v-model="username"
        type="username"
        placeholder="Enter your username"
        required
      />
    </div>

    <div class="form-group">
      <label for="password">Password</label>
      <input
        id="password"
        v-model="password"
        type="password"
        placeholder="Enter your password"
        required
      />
    </div>

    <div class="additional-options">
      <label class="remember-me">
        <input type="checkbox" v-model="rememberMe" />
        Remember Me
      </label>
      <a href="../Register" class="register-link">Create account?</a>
    </div>

    <button type="submit" class="btn-primary">Login</button>
  </form>
</template>

<script>
import api from '../api';  // Import the API instance
export default {
  name: "LoginForm",
  data() {
    return {
      username: "",
      password: "",
      rememberMe: false,
    };
  },
  methods: {
    async submitLogin() {
      try {
        const response = await api.post("/login", {
          username: this.username,
          password: this.password,
          rememberMe: this.rememberMe,
        });
        console.log("User logined:", response.data);
        alert("Login successful!");
        // Clear form after success
        this.username = "";
        this.password = "";
        this.rememberMe = false;
      } catch (error) {
        console.error("Login failed:", error);
        alert(
          "Login failed: " + (error.response?.data?.error || "Server error")
        );
      }
    },
  },
};
</script>

<style scoped>
.login-form {
  width: 100%;
  max-width: 400px;
  margin: 0 auto;
  background-color: #fff;
  padding: 2rem;
  border-radius: 6px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  box-sizing: border-box;
}

.form-title {
  margin-bottom: 1rem;
  text-align: center;
}

.form-group {
  margin-bottom: 1.2rem;
}

label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 600;
}

input[type="username"],
input[type="password"] {
  width: 100%;
  padding: 0.6rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}

.additional-options {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.remember-me {
  display: flex;
  align-items: center;
}

.register-link {
  color: #007bff;
  text-decoration: none;
  font-size: 0.9rem;
}

.register-link:hover {
  text-decoration: underline;
}

.btn-primary {
  width: 100%;
  padding: 0.75rem;
  border: none;
  border-radius: 4px;
  background-color: #007bff;
  color: #fff;
  font-weight: 600;
  cursor: pointer;
}

.btn-primary:hover {
  background-color: #0056b3;
}

@media (max-width: 500px) {
  .login-form {
    padding: 1rem;
  }
  .form-group {
    margin-bottom: 1rem;
  }
  .additional-options {
    flex-direction: column;
    align-items: flex-start;
  }
  .forgot-link {
    margin-top: 0.5rem;
  }
}
</style>
