<template>
  <div class="login-page">
    <div class="intro-section">
      <h1>Welcome Back</h1>
      <p>Please sign in to continue.</p>
    </div>
    <LoginForm @login-submitted="handleLogin" />
    <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>  <!-- ✅ Show error message -->
  </div>
</template>

<script>
import axios from "axios";  // ✅ Import Axios for API requests
import LoginForm from "../components/LoginForm.vue";

export default {
  name: "LoginPage",
  components: {
    LoginForm,
  },
  data() {
    return {
      errorMessage: "",  // ✅ Store login errors
    };
  },
  methods: {
      /**
     * Handles user login by sending credentials to the backend.
     * Stores the JWT token and role in localStorage upon success.
     * Redirects users based on their roles.
     *
     * @async
     * @function handleLogin
     * @param {Object} credentials - The user login credentials.
     * @param {string} credentials.username - The username entered by the user.
     * @param {string} credentials.password - The password entered by the user.
     * @returns {Promise<void>} Redirects the user to the appropriate page or shows an error message.
     * @throws {Error} If login fails due to invalid credentials or server errors.
     */
    async handleLogin(credentials) {
      console.log("Sending login request with credentials:", credentials); //Debug request

      try {
        const response = await axios.post("http://localhost:3000/api/auth/login", credentials);

        console.log("Full Backend Response:", response.data); //Debug response

        if (!response.data || !response.data.token || response.data.role === undefined) {
          throw new Error("Invalid response from server");
        }

        //Store token and role in localStorage
        localStorage.setItem("user", JSON.stringify({ token: response.data.token, role: response.data.role }));

        console.log("Stored User:", localStorage.getItem("user")); //Debug localStorage

        //Redirect based on role
        if (response.data.role == 2) {
          console.log("Redirecting to Recruiter Page...");
          this.$router.push("/dashboard");
        } else if (response.data.role == 1) {
          console.log("Redirecting to Applicant Dashboard...");
          this.$router.push("/recruiter");
        } else {
          console.log("Role not recognized, redirecting to dashboard.");
          this.$router.push("/dashboard");
        }

      } catch (error) {
        console.error("Login Failed:", error.response?.data?.message || error.message);
        this.errorMessage = error.response?.data?.message || "Server error"; //Show detailed error message
      }
    }

  },
};
</script>

<style scoped>
.login-page {
  display: flex;
  flex-direction: column; 
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background: #f1f1f1;
  padding: 1rem;
}

.intro-section {
  text-align: center;
  margin-bottom: 1.5rem;
}

.intro-section h1 {
  margin-bottom: 0.5rem;
}

.intro-section p {
  color: #555;
}

.error-message {
  color: red;
  margin-top: 1rem;
}
</style>