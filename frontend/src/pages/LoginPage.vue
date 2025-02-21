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
    async handleLogin(credentials) {
      console.log("Received login data:", credentials); // ✅ Debugging log

      try {
        // ✅ Send login request to backend
        const response = await axios.post("http://localhost:3000/api/auth/login", credentials);

        console.log("✅ Login Successful:", response.data);
        
        localStorage.setItem("token", response.data.token); // ✅ Store JWT token
        this.$router.push("/dashboard");  // ✅ Redirect to dashboard

      } catch (error) {
        console.error("❌ Login Failed:", error.response?.data?.message || "Server error");
        this.errorMessage = "Invalid username or password";  // ✅ Show error message
      }
    },
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