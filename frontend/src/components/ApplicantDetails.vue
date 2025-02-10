<template>
    <div class="applicant-details">
      <h2>Applicant Submission</h2>
      <p><strong>ID:</strong> {{ applicant.id }}</p>
      <p><strong>Name:</strong> {{ applicant.fullName }}</p>
      <p><strong>Email:</strong> {{ applicant.email }}</p>
      <!-- Additional fields: resume link, date applied, status, etc. -->
  
      <div class="actions">
        <button class="close-btn" @click="$emit('close-details')">
          Close
        </button>
        <button class="apply-btn" @click="handleApply">
          Apply
        </button>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'ApplicantDetails',
    props: {
      applicant: {
        type: Object,
        required: true
      }
    },
    methods: {
      handleApply() {
        // Emit an event with the current applicant
        this.$emit('apply', this.applicant)
      }
    }
  }
  </script>
  
  <style scoped>
  .applicant-details {
    /* parent container handles the background color and padding, 
       so keep it simple here */
    margin-top: 1rem;
  }
  
  .actions {
    display: flex;
    gap: 1rem;
    margin-top: 1rem;
  }
  
  .close-btn {
    background-color: #d40000; /* Red */
    color: #fff;
    border: none;
    padding: 0.5rem 1rem;
    cursor: pointer;
  }
  
  .apply-btn {
    background-color: #0056b3; /* Blue */
    color: #fff;
    border: none;
    padding: 0.5rem 1rem;
    cursor: pointer;
  }
  </style>
  