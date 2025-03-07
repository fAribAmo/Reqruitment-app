<template>
  <header class="common-header">
    <div class="header-logo">
      <img src="../assets/logo.png" alt="Logo" />
      <span>{{ title }}</span>
    </div>
  </header>
</template>

<script>
/**
 * Header component displays the application header including the logo and title.
 *
 * @component
 * @example
 * <Header title="My App" />
 */
export default {
  name: "Header",
  props: {
    /**
     * The title to be displayed in the header.
     * @type {string}
     * @default "Job Application App"
     */
    title: {
      type: String,
      default: "Recruitment App",
    }
  }
};
</script>

<style scoped>
.common-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.5rem 1rem;
  border-bottom: 1px solid #ccc;
  box-sizing: border-box;
}

.header-logo {
  display: flex;
  align-items: center;
}

.header-logo img {
  height: 40px;
  margin-right: 10px;
}

.header-nav ul {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
}

.header-nav li {
  margin: 0 1rem;
}

.header-user {
  display: flex;
  align-items: center;
}
</style>
