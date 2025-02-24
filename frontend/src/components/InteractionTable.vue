
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
          :key="application.id"
          @click="selectApplicant(application)"
          :class="{ selected: application.id === selectedApplicantId }"
        >
          <td>{{ application.id }}</td>
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
    applications: {
      type: Array,
      default: () => [],
    },
    selectedApplicantId: { 
      type: Number,
      default: null,
    },
  },
  methods: {
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
