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

    <router-link to="/register">Create account?</router-link>

    <button type="submit" class="btn-primary">Login</button>
  </form>
</template>

<script>
/**
 * LoginForm component
 * 
 * This component provides a simple login form where users can enter their username and password.
 * Upon submission, it emits a "login-submitted" event with the entered credentials.
 */
export default {
  name: "LoginForm",
  data() {
    return {
      /**
       * Username input field.
       * @type {string}
       */
      username: "",

      /**
       * Password input field.
       * @type {string}
       */
      password: "",
    };
  },
  methods: {
    /**
     * Handles form submission and emits login credentials.
     * @emits login-submitted
     */
    submitLogin() {
      const credentials = {
        username: this.username,
        password: this.password,
      };
      this.$emit("login-submitted", credentials); // Emit form data to LoginPage.vue
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
