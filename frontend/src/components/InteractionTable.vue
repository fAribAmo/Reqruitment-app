<template>
    <div class="interaction-table">
      <h2>All Applications</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Applicant Name</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="application in applications"
            :key="application.id"
            @click="selectApplicant(application)"
          >
            <td>{{ application.id }}</td>
            <td>{{ application.fullName }}</td>
            <td>{{ application.email }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  
  <script>
  export default {
    name: 'InteractionTable',
    props: {
      applications: {
        type: Array,
        default: () => []
      }
    },
    methods: {
      selectApplicant(applicant) {
        // Emit event to parent (RecruiterPage)
        this.$emit('applicant-selected', applicant)
      }
    }
  }
  </script>
  
  <style scoped>
  .interaction-table {
    /* Keep styling minimal here, 
       or let the parent container handle background & padding */
  }
  
  table {
    width: 100%;
    border-collapse: collapse;
    background-color: #fff;
    color: #000; /* If you want text black on white background */
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
  
  /* Highlight row on hover */
  tr:hover {
    background-color: #f2f2f2;
    cursor: pointer;
  }
  </style>
  