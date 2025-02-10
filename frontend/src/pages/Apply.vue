<template>
    <div class="flex items-center justify-center min-h-screen bg-gray-100">
      <div class="max-w-2xl w-full p-8 bg-white shadow-lg rounded-lg transform transition-all duration-300 hover:shadow-xl">
        
        <!-- Header -->
        <div class="flex items-center gap-3">
          <h2 class="text-2xl font-bold text-gray-800">Job Application</h2>
        </div>
        <p class="text-gray-600 mt-2">Fill in the details below to apply for a job.</p>
  
        <!-- Form -->
        <form @submit.prevent="submitApplication" class="mt-6 space-y-6">
          <div>
            <label class="block text-gray-700 font-semibold">Select Your Expertise</label>
            <select v-model="expertise" class="input-field">
              <option disabled value="">Choose an option</option>
              <option v-for="area in expertiseOptions" :key="area" :value="area">{{ area }}</option>
            </select>
          </div>
  
          <div>
            <label class="block text-gray-700 font-semibold">Years of Experience</label>
            <input type="number" v-model="experience" min="0" class="input-field" />
          </div>
  
          <div>
            <label class="block text-gray-700 font-semibold">Availability</label>
            <input type="text" v-model="availability" placeholder="e.g., June - August" class="input-field" />
          </div>
  
          <!-- Submit Button -->
          <button type="submit" class="submit-button">
            Submit Application
          </button>
        </form>
  
        <!-- Messages -->
        <p v-if="message" class="text-green-600 mt-4 text-center font-medium">{{ message }}</p>
        <p v-if="errorMessage" class="text-red-500 mt-2 text-center font-medium">{{ errorMessage }}</p>
      </div>
  
      <!-- Confirmation Popup -->
      <div v-if="showConfirmation" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm transition-opacity duration-300">
        <div class="bg-white p-6 rounded-lg shadow-lg text-center transform scale-95 transition-transform duration-300 animate-popup">
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
  
  <style scoped>
  /* Input fields with hover and focus effects */
  .input-field {
    width: 20%;
    padding: 12px;
    border: 2px solid #e5e7eb;
    border-radius: 20px;
    outline: none;
    transition: border-color 0.3s ease, box-shadow 0.3s ease;
  }
  
  .input-field:focus {
    border-color: #3b82f6;
    box-shadow: 0 0 8px rgba(59, 130, 246, 0.3);
  }
  
  /* Submit button with animation */
  .submit-button {
    width: 15%;
    padding: 12px;
    background-color: #3b82f6;
    color: white;
    font-weight: bold;
    border-radius: 20px;
    box-shadow: 0 4px 6px rgba(59, 130, 246, 0.2);
    transition: all 0.3s ease;
    
  }
  
  .submit-button:hover {
    background-color: #2563eb;
    transform: translateY(-2px);
    box-shadow: 0 6px 10px rgba(37, 99, 235, 0.3);
  }
  
  /* Confirmation popup animation */
  @keyframes popup {
    0% {
      transform: scale(0.8);
      opacity: 0;
    }
    100% {
      transform: scale(1);
      opacity: 1;
    }
  }
  
  .animate-popup {
    animation: popup 0.3s ease-out forwards;
  }
  </style>
  