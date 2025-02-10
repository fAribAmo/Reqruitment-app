<template>
    <div class="flex items-center justify-center min-h-screen bg-gray-100">
      <div class="max-w-2xl w-full p-8 bg-white shadow-lg rounded-lg">
        
        <!-- Header -->
        <div class="flex items-center gap-3">
          <h2 class="text-2xl font-bold">Job Application</h2>
        </div>
        <p class="text-gray-600 mt-2">Fill in the details below to apply for a job.</p>
  
        <!-- Form -->
        <form @submit.prevent="submitApplication" class="mt-6 space-y-4">
          <div>
            <label class="block text-gray-700 font-semibold">Select Your Expertise</label>
            <select v-model="expertise" class="w-full p-3 border rounded focus:ring-2 focus:ring-blue-400">
              <option disabled value="">Choose an option</option>
              <option v-for="area in expertiseOptions" :key="area" :value="area">{{ area }}</option>
            </select>
          </div>
  
          <div>
            <label class="block text-gray-700 font-semibold">Years of Experience</label>
            <input type="number" v-model="experience" min="0"
              class="w-full p-3 border rounded focus:ring-2 focus:ring-blue-400" />
          </div>
  
          <div>
            <label class="block text-gray-700 font-semibold">Availability</label>
            <input type="text" v-model="availability" placeholder="e.g., June - August"
              class="w-full p-3 border rounded focus:ring-2 focus:ring-blue-400" />
          </div>
  
          <!-- Submit Button -->
          <button type="submit"
            class="w-full p-3 bg-blue-500 text-white font-semibold rounded-lg shadow-md transition-all duration-300 hover:bg-blue-600 hover:shadow-lg">
            Submit Application
          </button>
        </form>
  
        <!-- Messages -->
        <p v-if="message" class="text-green-600 mt-4">{{ message }}</p>
        <p v-if="errorMessage" class="text-red-500 mt-2">{{ errorMessage }}</p>
      </div>
  
      <!-- Confirmation Popup -->
      <div v-if="showConfirmation" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
        <div class="bg-white p-6 rounded-lg shadow-lg text-center">
          <h3 class="text-xl font-semibold text-gray-700">✅ Application Submitted!</h3>
          <p class="text-gray-600 mt-2">Redirecting you to the dashboard...</p>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        expertise: "",
        experience: "",
        availability: "",
        message: "",
        errorMessage: "",
        showConfirmation: false,
        expertiseOptions: ["Customer Service", "Ride Operator", "Food & Beverage"]
      };
    },
    methods: {
      submitApplication() {
        // Reset messages
        this.message = "";
        this.errorMessage = "";
  
        if (!this.expertise || !this.experience || !this.availability) {
          this.errorMessage = "All fields are required!";
          return;
        }
  
        // Show confirmation popup
        this.showConfirmation = true;
  
        setTimeout(() => {
          this.showConfirmation = false;
          this.$router.push("/dashboard");
        }, 2000);
      }
    }
  };
  </script>  

  