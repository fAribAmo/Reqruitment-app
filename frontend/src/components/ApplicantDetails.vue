<template>
  <div class="applicant-details">
    <h2>Applicant Submission</h2>
    <p><strong>ID:</strong> {{ applicant.personId }}</p>
    <p><strong>Name:</strong> {{ applicant.fullName }}</p>
    <p><strong>Email:</strong> {{ applicant.email }}</p>
    <p>
      <strong>Resume:</strong>
      <a :href="applicant.resume" target="_blank">View Resume</a>
    </p>
    <p><strong>Date Applied:</strong> {{ applicant.dateApplied }}</p>
    <p>
      <strong>Status:</strong>
      <span :class="statusClass">{{ applicant.status }}</span>
    </p>
    <p>
      <strong>Expertise:</strong>
      {{ applicant.competences && applicant.competences.length ? applicant.competences.join(", ") : 'No expertise data' }}
    </p>
    <p><strong>Availability:</strong></p>
    <ul>
      <li v-for="(item, index) in applicant.availability" :key="index">
        {{ item }}
      </li>
    </ul>

    <!-- Status Update -->
    <div class="status-update">
      <label for="status">Application Status:</label>
      <select v-model="selectedStatus">
        <option value="Unhandled">Unhandled</option>
        <option value="Accepted">Accepted</option>
        <option value="Rejected">Rejected</option>
      </select>
      <button @click="updateStatus">Update</button>
    </div>

    <!-- Actions -->
    <div class="actions">
      <button class="close-btn" @click="$emit('close-details')">Close</button>
    </div>
  </div>
</template>

<script>
/**
 * ApplicantDetails component displays detailed information about an applicant
 * and provides functionality to update the application status.
 *
 * @component
 */
export default {
  name: "ApplicantDetails",
  props: {
    /**
     * The applicant object containing all relevant details.
     * @type {Object}
     * @property {string} personId - The unique identifier for the applicant.
     * @property {string} fullName - The full name of the applicant.
     * @property {string} email - The applicant's email address.
     * @property {string} resume - URL linking to the applicant's resume.
     * @property {string} dateApplied - The date the application was submitted.
     * @property {string} status - The current status of the application.
     * @property {Array} competences - An array of competences or expertise areas.
     * @property {Array} availability - An array representing the applicant's availability.
     */
    applicant: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      /**
       * The selected status for the applicant's application.
       * Initially set to the current status from the applicant prop.
       * @type {string}
       */
      selectedStatus: this.applicant.status,
    };
  },
  computed: {
    /**
     * Computes the CSS classes for displaying the status with appropriate styling.
     *
     * @function statusClass
     * @returns {Object} An object mapping CSS class names to boolean values.
     */
    statusClass() {
      return {
        "status-unhandled": this.applicant.status === "Unhandled",
        "status-accepted": this.applicant.status === "Accepted",
        "status-rejected": this.applicant.status === "Rejected",
      };
    },
  },
  methods: {
    /**
     * Emits an event to update the applicant's status.
     *
     * @function updateStatus
     * @emits update-status - Emits the applicant's id and the newly selected status.
     */
    updateStatus() {
      this.$emit("update-status", this.applicant.id, this.selectedStatus);
    },
  },
};
</script>

<style scoped>
.applicant-details {
  background-color: #ffffff;
  padding: 1rem;
  border-radius: 8px;
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.1);
}

.status-update {
  margin-top: 1rem;
}

.status-update select,
.status-update button {
  margin-left: 0.5rem;
}

.actions {
  display: flex;
  justify-content: flex-end;
  margin-top: 1rem;
}

.close-btn {
  background-color: #d40000;
  color: #fff;
  border: none;
  padding: 0.5rem 1rem;
  cursor: pointer;
  border-radius: 5px;
}

/* Status colors */
.status-unhandled {
  color: #ff9800;
  font-weight: bold;
}

.status-accepted {
  color: #4caf50;
  font-weight: bold;
}

.status-rejected {
  color: #f44336;
  font-weight: bold;
}
</style>
