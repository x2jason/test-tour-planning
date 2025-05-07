<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <nav class="bg-white shadow mb-6">
      <div class="container mx-auto px-4 py-3 flex gap-4">
        <RouterLink to="/drivers" class="text-lg font-medium hover:text-blue-600">Driver Management</RouterLink>
        <RouterLink to="/tours" class="text-lg font-medium hover:text-blue-600">Tour Management</RouterLink>
      </div>
    </nav>
    <main class="container mx-auto px-4">
      <RouterView />
    </main>
  </div>
</template>

<style scoped>
.router-link-exact-active {
  color: #2563eb;
}
</style>
