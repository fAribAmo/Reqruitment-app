<template>
  <div class="min-h-screen bg-gray-100 p-8">
    <!-- Dashboard Header -->
    <div class="flex items-center justify-between mb-6">
      <h2 class="text-3xl font-bold text-gray-700">Dashboard</h2>
    </div>

    <!-- Applicant View -->
    <div v-if="userType === 'applicant'">
      <h3 class="text-2xl font-semibold text-gray-700">Your Applications</h3>
      <p class="mt-2 text-gray-600">Track the status of your applications below.</p>

      <!-- Displaying Applicant's Application Status -->
      <div v-if="applications.length > 0" class="mt-4">
        <ul>
          <li v-for="(app, index) in applications" :key="index" class="bg-white shadow-sm rounded-lg p-4 mb-4">
            <div class="flex justify-between">
              <div>
                <h4 class="text-xl font-semibold">{{ app.name }}</h4>
                <p class="text-gray-500">{{ app.expertise }} | {{ app.availability }}</p>
              </div>
              <span :class="statusClasses(app.status)" class="px-4 py-1 rounded-full text-white">{{ app.status }}</span>
            </div>
          </li>
        </ul>
      </div>
      <p v-else class="mt-4 text-gray-600">You have not applied for any positions yet.</p>
      <button @click="logout" class="bg-red-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-red-600">
        Logout
      </button>

      <!-- Button to apply for a new position -->
      <div class="mt-6">
        <router-link to="/apply" class="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600">
          Apply for a New Position
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      /**
       * Retrieved from authentication.
       * @type {string}
       */
      userType: '',
      /**
       * Applications data fetched from the backend.
       * @type {Array}
       */
      applications: []
    };
  },
  methods: {
    /**
     * Fetches applications from the backend API.
     * @async
     * @returns {Promise<void>}
     */
    async fetchApplications() {
      try {
        /** Adjust API endpoint as needed */
        const response = await axios.get('/api/applications');
        this.applications = response.data;
      } catch (error) {
        console.error('Error fetching applications:', error);
      }
    },
    /**
     * Logs out the user by removing stored user data and navigating to the login page.
     */
    logout() {
      /** Remove stored user data */
      localStorage.removeItem("user");
      /** Log the logout action */
      console.log("User logged out, redirecting to Login Page...");
      /** Navigate to login page */
      this.$router.push("/login");
    }
  },
  created() {
    /**
     * Simulate fetching the userType from authentication.
     * (Should be replaced with actual authentication logic.)
     */
    this.userType = localStorage.getItem('userType') || 'applicant';
    /**
     * Fetch applications from the backend.
     */
    this.fetchApplications();
  }
};
</script>
