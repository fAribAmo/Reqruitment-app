
<template>
  <form @submit.prevent="submitRegistration" class="register-form">
    <h2 class="form-title">Create Account</h2>

    <div class="form-group">
      <label for="name">Name</label>
      <input
        id="name"
        v-model="name"
        type="text"
        placeholder="Enter your name"
        required
      />
    </div>

    <div class="form-group">
      <label for="surname">Surname</label>
      <input
        id="surname"
        v-model="surname"
        type="text"
        placeholder="Enter your surname"
        required
      />
    </div>

    <div class="form-group">
      <label for="pnr">Personal ID Number</label>
      <input
        id="pnr"
        v-model="pnr"
        type="text"
        placeholder="e.g. 1234567890"
        required
        minlength="10"
        maxlength="10"
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
        type="text"
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
      /**
       * @property {string} name - User's first name.
       */
      name: "",
      
      /**
       * @property {string} surname - User's last name.
       */
      surname: "",
      
      /**
       * @property {string} pnr - User's personal ID number (10 digits).
       */
      pnr: "",
      
      /**
       * @property {string} email - User's email address.
       */
      email: "",
      
      /**
       * @property {string} username - Chosen username for the account.
       */
      username: "",
      
      /**
       * @property {string} password - User's account password.
       */
      password: "",
      
      /**
       * @property {string} role_id - User role, default is "2" (applicant).
       */
      role_id: "2", 
    };
  },
  methods: {
    /**
     * @method submitRegistration
     * @description Collects form data and emits an event to notify the parent component.
     * @emits user-registered - Sends the collected form data as an object.
     */
    submitRegistration() {
      const formData = {
        name: this.name,
        surname: this.surname,
        pnr: this.pnr,
        email: this.email,
        username: this.username,
        password: this.password,
        role_id: this.role_id,
      };
      
      this.$emit("user-registered", formData); // Emit form data to RegisterPage.vue
    },
  },
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