<template>
  <form @submit.prevent="submitRegistration" class="register-form">
    <h2 class="form-title">Create Account</h2>

    <div class="form-group">
      <label for="firstName">Name</label>
      <input
        id="firstName"
        v-model="firstName"
        type="text"
        placeholder="Enter your name"
        required
      />
    </div>

    <div class="form-group">
      <label for="lastName">Surname</label>
      <input
        id="lastName"
        v-model="lastName"
        type="text"
        placeholder="Enter your surname"
        required
      />
    </div>

    <div class="form-group">
      <label for="personalId">Personal ID Number</label>
      <input
        id="personalId"
        v-model="personalId"
        type="text"
        placeholder="e.g. 123456-7890"
        required
      />
    </div>

    <div class="form-group">
      <label for="email">Email</label>
      <input
        id="email"
        v-model="email"
        type="email"
        placeholder="Enter your email"
        required
      />
    </div>

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

    <button type="submit" class="btn-primary">Register</button>
  </form>
</template>

<script>
export default {
  name: "RegisterForm",
  data() {
    return {
      firstName: "",
      lastName: "",
      personalId: "",
      email: "",
      username: "",
      password: "",
    };
  },
  methods: {
    submitRegistration() {
      const formData = {
        firstName: this.firstName,
        lastName: this.lastName,
        personalId: this.personalId,
        email: this.email,
      };

      this.$emit("user-registered", formData);
    }
  }
};
</script>

<style scoped>
.register-form {
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

input {
  width: 100%;
  padding: 0.6rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
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
  .register-form {
    padding: 1rem;
  }
  .form-group {
    margin-bottom: 1rem;
  }
}
</style>
