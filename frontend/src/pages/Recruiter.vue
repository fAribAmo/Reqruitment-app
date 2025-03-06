<template>
  <div class="recruiter-page">
    <h1>Recruiter Dashboard</h1>

    <!-- Interaction Table -->
    <InteractionTable 
      :applications="applications" 
      :selectedApplicantId="selectedApplicant ? selectedApplicant.id : null"
      @applicant-selected="handleApplicantSelection"
    />

    <!-- Applicant Details -->
    <ApplicantDetails 
      v-if="selectedApplicant"
      :applicant="selectedApplicant"
      @update-status="updateApplicantStatus"
      @close-details="selectedApplicant = null"
    />
  </div>
  <button @click="logout" class="logout-button">Logout</button>
</template>

<script>
import InteractionTable from "../components/InteractionTable.vue";
import ApplicantDetails from "../components/ApplicantDetails.vue";
import axios from "axios";

export default {
  components: {
    InteractionTable,
    ApplicantDetails,
  },
  data() {
    return {
      /**
       * Array of application objects fetched from the backend.
       * @type {Array}
       */
      applications: [],
      /**
       * The currently selected applicant.
       * @type {Object|null}
       */
      selectedApplicant: null,
    };
  },
  methods: {
    /**
     * Retrieves applications from the backend API.
     * Uses the JWT token stored in localStorage for authorization.
     *
     * @async
     * @function getApplications
     * @returns {Promise<void>} A promise that resolves once the applications are fetched.
     */
    async getApplications() { 
      try {
        const user = JSON.parse(localStorage.getItem("user") || "{}");
        if (!user.token) {
          console.error("No token found, user may not be logged in.");
          return;
        }

        const response = await axios.get("http://localhost:3000/api/recruiter", {
          headers: {
            Authorization: `Bearer ${user.token}`, // Send the token for authentication.
          },
        });
        console.log("Applications fetched:", response.data); // Log the response.
        this.applications = response.data;
        console.log("Applications fetched:", this.applications);
      } catch (error) {
        console.error("Error fetching applications:", error);
      }
    },
    /**
     * Sets the selected applicant based on the applicant object provided.
     *
     * @function handleApplicantSelection
     * @param {Object} applicant - The applicant object selected from the interaction table.
     */
    handleApplicantSelection(applicant) {
      this.selectedApplicant = applicant;
    },
    /**
     * Updates the status of an applicant in the applications array.
     *
     * @function updateApplicantStatus
     * @param {number|string} id - The ID of the applicant.
     * @param {string} newStatus - The new status to assign to the applicant.
     */
    updateApplicantStatus(id, newStatus) {
      const applicant = this.applications.find(app => app.id === id);
      if (applicant) {
        applicant.status = newStatus;
      }
    },
    /**
     * Logs out the current user by removing user data from localStorage
     * and navigating to the login page.
     *
     * @function logout
     */
    logout() {
      localStorage.removeItem("user"); // Remove stored user data.
      console.log("✅ User logged out, navigating to Login Page...");
      this.$router.push("/login"); // Redirect to login page.
    }
  },
  /**
   * Lifecycle hook called when the component is created.
   * Fetches the applications from the backend API.
   */
  created() {
    this.getApplications(); // Fetch applications when the component is created.
  },
};
</script>

<style scoped>
.recruiter-page {
  padding: 2rem;
}
</style>
