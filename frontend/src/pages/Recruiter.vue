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
      applications: [],
      selectedApplicant: null,
    };
  },
  methods: {
    async getApplications() { 
      try {
        const user = JSON.parse(localStorage.getItem("user") || "{}");
        if (!user.token) {
          console.error("No token found, user may not be logged in.");
          return;
        }

        const response = await axios.get(import.meta.env.VITE_API_BASE_URL + "/api/recruiter", {
          headers: {
            Authorization: `Bearer ${user.token}`, // Send the token
          },
        });
        console.log("Applications fetched:", response.data); // Log the response
        this.applications = response.data;
        console.log("Applications fetched:", this.applications);
      } catch (error) {
        console.error("Error fetching applications:", error);
      }
    },
    handleApplicantSelection(applicant) {
      this.selectedApplicant = applicant;
    },
    updateApplicantStatus(id, newStatus) {
      const applicant = this.applications.find(app => app.id === id);
      if (applicant) {
        applicant.status = newStatus;
      }
    },
    logout() {
      localStorage.removeItem("user"); // ✅ Remove user data
      console.log("✅ User logged out, navigating to Login Page...");
      this.$router.push("/login"); // ✅ Redirect to login page
    }
  },
  created() {
    this.getApplications(); // Fetch applications when the component is created
  },
};
</script>

<style scoped>
.recruiter-page {
  padding: 2rem;
}
</style>