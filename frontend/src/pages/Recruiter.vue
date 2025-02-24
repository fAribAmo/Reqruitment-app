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
</template>

<script>
import InteractionTable from "../components/InteractionTable.vue";
import ApplicantDetails from "../components/ApplicantDetails.vue";

export default {
  components: {
    InteractionTable,
    ApplicantDetails,
  },
  data() {
    return {
      applications: [
        {
          id: 1,
          fullName: "Alice Johnson",
          email: "alice@example.com",
          resume: "https://example.com/resume/alice.pdf",
          dateApplied: "2024-02-15",
          status: "Unhandled",
          expertise: ["JavaScript", "Vue", "Node.js"],
          availability: ["Full-time"],
        },
        {
          id: 2,
          fullName: "Bob Smith",
          email: "bob@example.com",
          resume: "https://example.com/resume/bob.pdf",
          dateApplied: "2024-02-14",
          status: "Accepted",
          expertise: ["Python", "Django", "React"],
          availability: ["Part-time"],
        },
        {
          id: 3,
          fullName: "Charlie Davis",
          email: "charlie@example.com",
          resume: "https://example.com/resume/charlie.pdf",
          dateApplied: "2024-02-10",
          status: "Rejected",
          expertise: ["Java", "Spring Boot", "SQL"],
          availability: ["Remote"],
        },
      ],
      selectedApplicant: null,
    };
  },
  methods: {
    handleApplicantSelection(applicant) {
      this.selectedApplicant = applicant;
    },
    updateApplicantStatus(id, newStatus) {
      const applicant = this.applications.find(app => app.id === id);
      if (applicant) {
        applicant.status = newStatus;
      }
    },
  },
};
</script>

<style scoped>
.recruiter-page {
  padding: 2rem;
}
</style>
