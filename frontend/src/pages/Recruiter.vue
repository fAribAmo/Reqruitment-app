<template>
  <div class="recruiter-page">
    <h1 class="page-title">Welcome, Recruiter</h1>

    <!-- Search Input -->
    <input 
      v-model="searchQuery" 
      placeholder="Search applicants..." 
      class="search-box"
    />

    <div class="page-container">
      <!-- LEFT BOX: Interaction Table displaying list of applications -->
      <div class="left-section">
        <InteractionTable
          :applications="filteredApplications"
          :selectedApplicantId="selectedApplicant ? selectedApplicant.id : null"
          @applicant-selected="handleApplicantSelected"
        />
      </div>

      <!-- RIGHT BOX: Applicant Details - shown when an applicant is selected -->
      <div class="right-section" v-if="selectedApplicant">
        <ApplicantDetails 
          :applicant="selectedApplicant"
          @close-details="closeApplicantDetails"
          @update-status="updateApplicationStatus"
        />
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import InteractionTable from "../components/InteractionTable.vue";
import ApplicantDetails from "../components/ApplicantDetails.vue";

export default {
  name: "RecruiterPage",
  components: {
    InteractionTable,
    ApplicantDetails,
  },
  data() {
    return {
      applications: [], 
      selectedApplicant: null,
      searchQuery: "" // Search functionality
    };
  },
  created() {
    this.fetchApplications(); 
  },
  computed: {
    filteredApplications() {
      return this.applications.filter(app => 
        app.fullName.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        app.email.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        app.status.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    }
  },
  methods: {
    // Fetch applications from the backend
    async fetchApplications() {
      try {
        const token = localStorage.getItem("token"); 
        const response = await axios.get("http://localhost:3000/applications", {
          headers: { Authorization: `Bearer ${token}` },
        });
        this.applications = response.data; 
      } catch (error) {
        console.error("Error fetching applications:", error);
      }
    },
    // Handle selection of an applicant from the interaction table
    handleApplicantSelected(applicant) {
      this.selectedApplicant = applicant;
    },
    // Close the applicant details view
    closeApplicantDetails() {
      this.selectedApplicant = null;
    },
    // Update the application status in the backend
    async updateApplicationStatus(id, status) {
      try {
        const token = localStorage.getItem("token");
        await axios.patch(
          `http://localhost:3000/applications/${id}`,
          { status },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        this.fetchApplications(); // Refresh applications list after update
        this.selectedApplicant = null; // Close details view after updating status
      } catch (error) {
        console.error("Error updating application status:", error);
      }
    },
  },
};
</script>

<style scoped>
.recruiter-page {
  min-height: 100vh;
  padding: 1rem;
  box-sizing: border-box;
}

/* Search Box */
.search-box {
  width: 100%;
  max-width: 400px;
  padding: 0.5rem;
  margin-bottom: 1rem;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.page-title {
  text-align: center;
  margin-bottom: 1rem;
}

.page-container {
  display: flex;
  justify-content: space-evenly;
  align-items: flex-start;
  gap: 2rem;
  flex-wrap: wrap;
}

.left-section {
  flex: 1;
  max-width: 500px;
  background-color: #14213d;
  color: #ffffff;
  padding: 1rem;
  border-radius: 8px;
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.1);
}

.right-section {
  flex: 1;
  max-width: 500px;
  background-color: #064420;
  color: #ffffff;
  padding: 1rem;
  border-radius: 8px;
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.1);
}

/* Responsive Design */
@media (max-width: 768px) {
  .page-container {
    flex-direction: column;
    align-items: center;
  }

  .left-section, .right-section {
    max-width: 100%;
  }
}
</style>
