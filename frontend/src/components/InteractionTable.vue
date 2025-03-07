<template>
  <div class="interaction-table">
    <h2>All Applications</h2>
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Applicant Name</th>
          <th>Email</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="application in applications"
          :key="application.personId"
          @click="selectApplicant(application)"
          :class="{ selected: application.personId === selectedApplicantId }"
        >
          <td>{{ application.personId }}</td>
          <td>{{ application.fullName }}</td>
          <td>{{ application.email }}</td>
          <td>{{ application.status }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: "InteractionTable",
  props: {
    /**
     * List of job applications.
     * @type {Array<Object>}
     * @property {number} personId - The unique ID of the applicant.
     * @property {string} fullName - The full name of the applicant.
     * @property {string} email - The applicant's email address.
     * @property {string} status - The current status of the application.
     */
    applications: {
      type: Array,
      default: () => [],
    },
    /**
     * ID of the currently selected applicant.
     * @type {number|null}
     */
    selectedApplicantId: { 
      type: Number,
      default: null,
    },
  },
  methods: {
    /**
     * Emits an event when an applicant is selected.
     * @param {Object} applicant - The selected applicant object.
     * @fires applicant-selected
     * @returns {void}
     */
    selectApplicant(applicant) {
      this.$emit("applicant-selected", applicant);
    },
  },
};
</script>

<style scoped>
.interaction-table {
  width: 100%;
}

table {
  width: 100%;
  border-collapse: collapse;
  background-color: #fff;
  color: #000;
  margin-top: 1rem;
}

thead {
  background: #555;
  color: #fff;
}

th, td {
  padding: 0.5rem;
  border: 1px solid #ccc;
}

tr:hover {
  background-color: #f2f2f2;
  cursor: pointer;
}

.selected {
  background-color: #ffcc00 !important;
  font-weight: bold;
}
</style>
