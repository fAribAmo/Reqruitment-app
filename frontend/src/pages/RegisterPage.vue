<template>
  <div class="register-page">
    <div class="intro-section">
      <h1>Welcome</h1>
      <p>Create an account to get started.</p>
    </div>
    <RegisterForm @user-registered="handleUserRegistered" />
  </div>
</template>

<script>
import axios from "axios"; // Import Axios for API requests
import RegisterForm from "../components/RegisterForm.vue";

export default {
  name: "RegisterPage",
  components: {
    RegisterForm,
  },
  methods: {
    /**
     * Handles the user registration process.
     * 
     * @param {Object} formData - The registration data submitted by the user.
     */
    async handleUserRegistered(formData) {
      console.log("Received registration data:", formData); // Debugging

      try {
        const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/auth/register`, formData);

        console.log("Registration Successful:", response.data);

        // Redirect user to login page after successful registration
        this.$router.push("/login");
      } catch (error) {
        console.error(
          " Registration Failed:",
          error.response?.data?.message || "Server error"
        );
        alert("The username is already taken.");
      }
    },
  },
};
</script>

<style scoped>
.register-page {
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
</style>
