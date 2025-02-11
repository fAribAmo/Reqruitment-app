<template>
  <div class="login-container">
    <h2>Login</h2>
    <form @submit.prevent="handleLogin">
      <label>Username:</label>
      <input v-model="username" type="text" required />

      <label v-if="!missingPassword">Password:</label>
      <input v-if="!missingPassword" v-model="password" type="password" required />

      <p v-if="missingPassword" class="error">No password found. Please create one.</p>
      <label v-if="missingPassword">New Password:</label>
      <input v-if="missingPassword" v-model="newPassword" type="password" required />

      <button type="submit" v-if="!missingPassword">Login</button>
      <button v-if="missingPassword" @click.prevent="setPassword">Set Password</button>
    </form>
    <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
  </div>
</template>

<script>
import api from '../api';

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
        //Change '/login' to '/auth/login'
        const response = await api.post('/auth/login', { username: this.username, password: this.password });

        this.errorMessage = "🎉 Login successful!...";

        localStorage.setItem('token', response.data.token);
        console.log("Login successful:", response);
        
         //Ensure Vue Router is properly accessed
        if (this.$router) {
          this.$router.push('/dashboard');
        } else {
          console.error("Router is undefined!");
        }

      } catch (error) {
        console.error("Login Error:", error.response ? error.response.data : error);
        
        if (error.response && error.response.data.message.includes('No password set')) {
          this.missingPassword = true;
          this.errorMessage = error.response.data.message;
        } else {
          this.errorMessage = 'Invalid credentials';
        }
      }
    },
    async setPassword() {
      try {
        //Change '/set-password' to '/auth/set-password'
        const response = await api.post('/auth/set-password', { username: this.username, newPassword: this.newPassword });

        localStorage.setItem('token', response.data.token);
        this.$router.push('/dashboard');
      } catch (error) {
        console.error("Set Password Error:", error.response ? error.response.data : error);
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
