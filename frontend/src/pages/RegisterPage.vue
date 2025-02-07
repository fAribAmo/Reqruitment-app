<template>
  <div class="register-page">
    <div class="intro-section">
      <h1>Welcome</h1>
      <p>Create an account to get started.</p>
    </div>

    <!-- Include the register form -->
    <RegisterForm @user-registered="handleUserRegistered" />
  </div>
</template>

<script>
import RegisterForm from "@/components/RegisterForm.vue";

export default {
  name: "RegisterPage",
  components: {
    RegisterForm
  },
  methods: {
    handleUserRegistered(formData) {
      console.log("Received registration data:", formData);
      // 1. Post the data to an API
      // 2. Show success/error messages
      // 3. Possibly redirect or show a welcome page
    }
  }
};
</script>

<style scoped>
.register-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center; 
  min-height: 100vh; /* fill the full viewport height */
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
