<template>
  <div class="login-container">
    <h2>Login</h2>
    <form @submit.prevent="handleLogin">
      <label>Username:</label>
      <input v-model="username" type="text" required />
      
      <label v-if="!missingPassword">Password:</label>
      <input v-if="!missingPassword" v-model="password" type="password" required />
      
      <p v-if="missingPassword" class="error">Some fields are missing. Please create a password.</p>
      <label v-if="missingPassword">New Password:</label>
      <input v-if="missingPassword" v-model="newPassword" type="password" required />
      
      <button type="submit" v-if="!missingPassword">Login</button>
      <button v-if="missingPassword" @click.prevent="setPassword">Set Password</button>
    </form>
    <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      username: '',
      password: '',
      newPassword: '',
      missingPassword: false,
      errorMessage: ''
    };
  },
  methods: {
    async handleLogin() {
      try {
        const response = await axios.post('/api/login', { username: this.username, password: this.password });
        localStorage.setItem('token', response.data.token);
        this.$router.push('/dashboard');
      } catch (error) {
        if (error.response && error.response.data.message.includes('Some fields are missing')) {
          this.missingPassword = true;
          this.errorMessage = error.response.data.message;
        } else {
          this.errorMessage = 'Invalid credentials';
        }
      }
    },
    async setPassword() {
      try {
        const response = await axios.post('/api/set-password', { username: this.username, newPassword: this.newPassword });
        localStorage.setItem('token', response.data.token);
        this.$router.push('/dashboard');
      } catch (error) {
        this.errorMessage = 'Error setting password';
      }
    }
  }
};
</script>

<style>
.error {
  color: red;
}
</style>
