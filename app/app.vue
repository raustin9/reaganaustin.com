<template>
  <div class="app-container">
    <AppSidebar />
    <main class="page-container">
      <NuxtPage page-key="static" />
    </main>
  </div>
</template>

<style lang="css">
  html,
  body {
    padding: 0;
    margin: 0;
    gap: 0;
    background-color: var(--background-primary);
  }

  .app-container {
    display: flex;
    flex-direction: row;
  }
</style>