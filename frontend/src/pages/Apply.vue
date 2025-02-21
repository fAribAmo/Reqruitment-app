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
            <!-- Expertise -->
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

            <!-- Experience -->
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

        <!-- Availability Section (Two Inputs: fromDate and toDate) -->
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
          ✅ Application Submitted!
        </h3>
        <p class="text-gray-600 mt-2">
          Redirecting you to the dashboard...
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Apply",
  data() {
    return {
      // Dropdown options for areas of expertise
      expertiseOptions: ["ticket sales", "lotteries", "roller coaster operation"],

      // We'll store multiple expertise entries in an array of objects
      expertiseEntries: [],

      // We'll store multiple availability periods in an array of objects
      // each object => { fromDate: "", toDate: "" }
      availabilityPeriods: [],

      message: "",
      errorMessage: "",
      showConfirmation: false,
    };
  },
  created() {
    // Try to load existing data from localStorage
    const savedExpertise = localStorage.getItem("expertiseEntries");
    const savedAvailability = localStorage.getItem("availabilityPeriods");

    // If we found saved expertise entries, parse them
    if (savedExpertise) {
      const parsedExpertise = JSON.parse(savedExpertise);
      this.expertiseEntries = parsedExpertise;
    } else {
      // Otherwise, initialize with one empty object
      this.expertiseEntries = [{ expertise: "", experience: "" }];
    }

    // Same for availability periods
    if (savedAvailability) {
      const parsedAvailability = JSON.parse(savedAvailability);

      // Optional: If you used to save strings, you can migrate them
      // for example, if some items are empty strings "" or "June - August"
      // we convert them into objects. (If you never had old data, skip this.)
      this.availabilityPeriods = parsedAvailability.map((item) => {
        if (typeof item === "string") {
          // Migrate old format to new object format
          return { fromDate: "", toDate: "" };
        }
        return item; // Assume it's already { fromDate, toDate }
      });
    } else {
      // If nothing in localStorage, start with one blank object
      this.availabilityPeriods = [{ fromDate: "", toDate: "" }];
    }
  },
  watch: {
    // Watch expertiseEntries deeply for changes
    expertiseEntries: {
      deep: true,
      handler(newVal) {
        localStorage.setItem("expertiseEntries", JSON.stringify(newVal));
      }
    },
    // Watch availabilityPeriods deeply for changes
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
      this.message = "";
      this.errorMessage = "";

      // Check that at least one valid expertise is entered
      const hasValidExpertise = this.expertiseEntries.some(
        (item) => item.expertise && item.experience !== ""
      );

      // Check that at least one availability period is fully filled out
      const hasValidAvailability = this.availabilityPeriods.some(
        (period) =>
          period.fromDate && period.fromDate.trim() !== "" &&
          period.toDate && period.toDate.trim() !== ""
      );

      if (!hasValidExpertise) {
        this.errorMessage = "Please enter at least one area of expertise and years of experience!";
        return;
      }
      if (!hasValidAvailability) {
        this.errorMessage = "Please enter at least one valid availability period (From / To)!";
        return;
      }

      // If validation passes, show the confirmation popup
      this.showConfirmation = true;

      // Simulate a delay before finalizing
      setTimeout(() => {
        this.showConfirmation = false;
        this.message = "Your application has been submitted!";
        
        //  reset localStorage and redirect
        localStorage.removeItem("expertiseEntries");
        localStorage.removeItem("availabilityPeriods");
        this.$router.push("/dashboard");
      }, 1500);
    },
  },
};
</script>

<style scoped>
/* Input fields with hover and focus effects */
.input-field {
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
