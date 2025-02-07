<template>
  <div class="register-page">
    <div class="intro-section">
      <h1>Welcome</h1>
      <p>Create an account to get started.</p>
    </div>

    <RegisterForm @user-registered="handleUserRegistered" />
    <router-link to="/">Already have an account? Log in here</router-link>

  </div>
</template>

<script>
import RegisterForm from "../components/LoginForm.vue";

export default {
  name: "RegisterPage",
  components: {
    RegisterForm
  },
  methods: {
    handleUserRegistered(formData) {
      console.log("Received registration data:", formData);
      //  Post the data to an API
      //  redirect to a welcome page
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
