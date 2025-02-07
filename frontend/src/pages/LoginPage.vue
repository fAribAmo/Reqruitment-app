<template>
  <div class="login-page">
    <div class="intro-section">
      <h1>Welcome Back</h1>
      <p>Please sign in to continue.</p>
    </div>
    <LoginForm @login-submitted="handleLogin" />
  </div>
</template>

<script>
import LoginForm from "@/components/LoginForm.vue";

export default {
  name: "LoginPage",
  components: {
    LoginForm,
  },
  methods: {
    handleLogin(credentials) {
      console.log("Received login data:", credentials);
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
</style>
