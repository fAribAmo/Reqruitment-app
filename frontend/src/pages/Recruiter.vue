<template>
  <div class="recruiter-page">
    <h1 class="page-title">Welcome</h1>

    <div class="page-container">
      <!-- LEFT BOX: Interaction Table -->
      <div class="left-section">
        <!-- The table component that displays all applications -->
        <InteractionTable
          :applications="applications"
          @applicant-selected="handleApplicantSelected"
        />
      </div>

      <!-- RIGHT BOX: Applicant Details -->
      <div class="right-section" v-if="selectedApplicant">
        <!-- Show applicant details once one is selected -->
        <ApplicantDetails 
          v-if="selectedApplicant"
          :applicant="selectedApplicant"
          @close-details="closeApplicantDetails"
          @apply="applyForApplicant"
        />
      </div>
    </div>
  </div>
</template>

<script>
import InteractionTable from '../components/InteractionTable.vue'
import ApplicantDetails from '../components/ApplicantDetails.vue'

export default {
  name: 'RecruiterPage',
  components: {
    InteractionTable,
    ApplicantDetails
  },
  data() {
    return {
      applications: [],       // Will be fetched from backend or mock data
      selectedApplicant: null // Will store the currently selected applicant
    }
  },
  created() {
    this.fetchApplications()
  },
  methods: {
    fetchApplications() {
      this.applications = [
        { id: 1, fullName: 'Alice Johnson', email: 'alice@example.com' },
        { id: 2, fullName: 'Bob Smith',    email: 'bob@example.com' }
        // ...
      ]
      // Example fetch logic or mock data
    },
    handleApplicantSelected(applicant) {
      this.selectedApplicant = applicant
    },
    closeApplicantDetails() {
      this.selectedApplicant = null
    },
    applyForApplicant(applicant) {
      // handle "apply" action (e.g. mark as reviewed, accepted, etc.)
      console.log('Applying for:', applicant)
    }
  }
}
</script>

<style scoped>
.recruiter-page {
  min-height: 100vh;
  padding: 1rem;
  box-sizing: border-box;
}

.page-title {
  text-align: center;
  margin-bottom: 1rem;
}

.page-container {
  display: flex;
  justify-content: space-evenly;
  align-items: flex-start; /* top-align the boxes */
  gap: 2rem; /* space between the boxes */
}

/* Left box */
.left-section {
  flex: 1;               /* Takes available space, can tweak as needed */
  max-width: 500px;      /* Keep it from growing too wide */
  background-color: #14213d; /* example dark blue */
  color: #ffffff;
  padding: 1rem;
  border-radius: 8px;
  box-shadow: 2px 2px 5px rgba(0,0,0,0.1);
}

/* Right box */
.right-section {
  flex: 1;               
  max-width: 500px;
  background-color: #064420; /* example dark green */
  color: #ffffff;
  padding: 1rem;
  border-radius: 8px;
  box-shadow: 2px 2px 5px rgba(0,0,0,0.1);
}
</style>
