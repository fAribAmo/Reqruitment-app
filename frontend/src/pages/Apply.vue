<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-100">
    <div class="max-w-3xl w-full p-8 bg-white shadow-lg rounded-lg">
      <!-- Header -->
      <div class="flex items-center gap-3">
        <h2 class="text-2xl font-bold text-gray-800">Job Application</h2>
      </div>
      <p class="text-gray-600 mt-2">
        Fill in the details below to apply for a job.
      </p>

      <!-- Form -->
      <form @submit.prevent="submitApplication" class="mt-6 space-y-6">
        
        <!-- Expertise & Experience Section -->
        <div>
          <label class="block text-gray-700 font-semibold mb-2">
            Select Your Expertise & Experience
          </label>

          <!-- Render multiple expertise entries via v-for -->
          <div
            v-for="(entry, index) in expertiseEntries"
            :key="index"
            class="flex items-center gap-4 mb-3"
          >
            <select
              v-model="entry.expertise"
              class="input-field"
              style="width: 30%"
            >
              <option disabled value="">Choose an area</option>
              <option
                v-for="area in expertiseOptions"
                :key="area"
                :value="area"
              >
                {{ area }}
              </option>
            </select>

            <input
              type="number"
              min="0"
              step="0.1"
              v-model="entry.experience"
              placeholder="Years of Exp"
              class="input-field"
              style="width: 20%"
            />

            <!-- Remove one expertise entry -->
            <button
              type="button"
              class="px-4 py-2 text-white bg-red-500 rounded"
              @click="removeExpertise(index)"
            >
              Remove
            </button>
          </div>

          <!-- Add another expertise entry -->
          <button
            type="button"
            class="px-4 py-2 text-white bg-green-500 rounded"
            @click="addExpertise"
          >
            + Add Another Expertise
          </button>
        </div>

        <!-- Availability Section -->
        <div>
          <label class="block text-gray-700 font-semibold mb-2">
            Availability Periods
          </label>

          <!-- Render multiple availability periods via v-for -->
          <div
            v-for="(period, idx) in availabilityPeriods"
            :key="idx"
            class="flex items-center gap-4 mb-3"
          >
            <!-- "From Date" input -->
            <input
              type="date"
              v-model="period.fromDate"
              class="input-field"
              style="width: 30%"
            />

            <!-- "To Date" input -->
            <input
              type="date"
              v-model="period.toDate"
              class="input-field"
              style="width: 30%"
            />

            <!-- Remove one availability period -->
            <button
              type="button"
              class="px-4 py-2 text-white bg-red-500 rounded"
              @click="removeAvailability(idx)"
            >
              Remove
            </button>
          </div>

          <!-- Add another availability period -->
          <button
            type="button"
            class="px-4 py-2 text-white bg-green-500 rounded"
            @click="addAvailability"
          >
            + Add Another Period
          </button>
        </div>

        <!-- Submit Button -->
        <button type="submit" class="submit-button">
          Submit Application
        </button>
      </form>

      <!-- Success/Error Messages -->
      <p
        v-if="message"
        class="text-green-600 mt-4 text-center font-medium"
      >
        {{ message }}
      </p>
      <p
        v-if="errorMessage"
        class="text-red-500 mt-2 text-center font-medium"
      >
        {{ errorMessage }}
      </p>
    </div>

    <!-- Confirmation Popup -->
    <div
      v-if="showConfirmation"
      class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm transition-opacity duration-300"
    >
      <div
        class="bg-white p-6 rounded-lg shadow-lg text-center transform scale-95 transition-transform duration-300 animate-popup"
      >
        <h3 class="text-xl font-semibold text-gray-700">
           Application Submitted!
        </h3>
        <p class="text-gray-600 mt-2">
          Redirecting you to the dashboard...
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      // Dropdown options for areas of expertise
      expertiseOptions: ["ticket sales", "lotteries", "roller coaster operation"],

      // Store multiple expertise entries in an array
      // We'll load them from localStorage in mounted()
      expertiseEntries: [],

      // Store multiple availability periods in an array
      availabilityPeriods: [],

      person_id: null,

      message: "",
      errorMessage: "",
      showConfirmation: false,
    };
  },
  created() {
    // You could also do this in mounted(), but created() is fine for localStorage
    const savedExpertise = localStorage.getItem("expertiseEntries");
    const savedAvailability = localStorage.getItem("availabilityPeriods");
    const savedUser = localStorage.getItem("user");

    if (savedUser) {
      try {
        const user = JSON.parse(savedUser);
        this.person_id = user.person_id || null;
      } catch (e) {
        console.error("Invalid user data in localStorage", e);
      }
    }

    if (savedExpertise) {
      this.expertiseEntries = JSON.parse(savedExpertise);
    } else {
      // If there's nothing saved, initialize with one empty entry
      this.expertiseEntries = [{ expertise: "", experience: "" }];
    }

    if (savedAvailability) {
      this.availabilityPeriods = JSON.parse(savedAvailability);
    } else {
      // Initialize with one empty period if nothing saved
      this.availabilityPeriods = [{ fromDate: "", toDate: "" }];
    }
  },
  watch: {
    // Watch each data array deeply so that localStorage is updated on any change
    expertiseEntries: {
      deep: true,
      handler(newVal) {
        localStorage.setItem("expertiseEntries", JSON.stringify(newVal));
      }
    },
    availabilityPeriods: {
      deep: true,
      handler(newVal) {
        localStorage.setItem("availabilityPeriods", JSON.stringify(newVal));
      }
    }
  },
  methods: {
    // Add another expertise entry
    addExpertise() {
      this.expertiseEntries.push({ expertise: "", experience: "" });
    },
    // Remove an expertise entry by index
    removeExpertise(index) {
      this.expertiseEntries.splice(index, 1);
    },
    // Add another availability period
    addAvailability() {
      this.availabilityPeriods.push({ fromDate: "", toDate: "" });
    },
    // Remove an availability period by index
    removeAvailability(index) {
      this.availabilityPeriods.splice(index, 1);
    },
    // Submit the form
    submitApplication() {
      //define user
      const user = JSON.parse(localStorage.getItem("user") || "{}");

      // Clear any previous messages
      this.message = "";
      this.errorMessage = "";

      // Basic validation: at least one valid expertise with non-empty data
      const hasValidExpertise = this.expertiseEntries.some(
        (item) => item.expertise && item.experience !== ""
      );
      // And at least one non-empty availability period
      const hasValidAvailability = this.availabilityPeriods.some(
        (period) => period !== ""
      );

      if (!hasValidExpertise) {
        this.errorMessage = "Please enter at least one valid area of expertise and years of experience!";
        return;
      }
      if (!hasValidAvailability) {
        this.errorMessage = "Please enter at least one availability period!";
        return;
      }

      // If validation passes, show the confirmation popup
      this.showConfirmation = true;

// Prepare the payload for the server
const applicationData = {
  person_id: this.person_id,
  expertiseEntries: this.expertiseEntries.map(entry => ({
    expertise: entry.expertise,
    years_of_experience: entry.experience
  })),
  availability: this.availabilityPeriods.map(period => ({
    from_date: period.fromDate,
    to_date: period.toDate
  }))
};


  console.log("Submitting application with data:", JSON.stringify({
  person_id: this.person_id,
  expertiseEntries: this.expertiseEntries,
  availability: this.availabilityPeriods
}, null, 2));

console.log("Submitting application data that is:", applicationData);
console.log("User token in APply",user.token);
  // Send the application data to the server using axios
  axios
    .post("http://localhost:3000/api/apply", applicationData, {
      headers: {
        Authorization: `Bearer ${user.token}`, // Send the token
      },
    })
    .then((response) => {
      // Handle success (you can customize this depending on your API response)
      this.showConfirmation = false;
      this.message = "Your application has been successfully submitted!";

      // Clear localStorage
      localStorage.removeItem("expertiseEntries");
      localStorage.removeItem("availabilityPeriods");
    })
    .catch((error) => {
      // Handle error
      this.showConfirmation = false;
      this.errorMessage = "There was an error submitting your application. Please try again.";
      console.error("Error submitting application:", error);
    });
   },
  },
};
</script>

<style scoped>
/* Input fields with hover and focus effects */
.input-field {
  width: 100%;
  padding: 0.6rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}

.input-field:focus {
  border-color: #3b82f6;
  box-shadow: 0 0 8px rgba(59, 130, 246, 0.3);
}

/* Submit button with animation */
.submit-button {
  width: 100%;
  padding: 0.75rem;
  border: none;
  border-radius: 4px;
  background-color: #007bff;
  color: #fff;
  font-weight: 600;
  cursor: pointer;
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
