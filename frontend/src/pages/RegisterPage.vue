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
/**
 * Import Axios for API requests.
 */
import axios from "axios";
/**
 * Import RegisterForm component.
 */
import RegisterForm from "../components/RegisterForm.vue";

export default {
  name: "RegisterPage",
  components: {
    RegisterForm,
  },
  methods: {
    /**
     * Handles user registration by sending the registration form data to the backend API.
     * On successful registration, the user is redirected to the login page.
     * In case of an error, an alert is shown indicating the username is already taken.
     *
     * @async
     * @function handleUserRegistered
     * @param {Object} formData - The registration data from the user.
     * @returns {Promise<void>}
     */
    async handleUserRegistered(formData) {
      // Debug: Log the received registration data.
      console.log("Received registration data:", formData);

      try {
        const response = await axios.post(
          "http://localhost:3000/api/auth/register",
          formData
        );

        // Debug: Log the successful registration response.
        console.log("Registration Successful:", response.data);

        // Redirect user to login page after successful registration.
        this.$router.push("/login");
      } catch (error) {
        console.error(
          "❌ Registration Failed:",
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
