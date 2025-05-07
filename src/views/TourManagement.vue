<template>
  <div class="max-w-3xl mx-auto p-4">
    <div class="flex justify-between items-center mb-8">
      <h2 class="text-2xl font-bold">Tour Management</h2>
      <CreateTour />
    </div>
    <TourList @edit="onEdit" @delete="onDelete" @submit="onSubmit" @cancel="onCancel" />
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import TourList from '@/components/tour/TourList.vue'
import CreateTour from '@/components/tour/CreateTour.vue'
import { useTourStore } from '@/stores/tour'
import type { Tour } from '@/types'
const tourStore = useTourStore()
const showForm = ref(false)

function onEdit(tour: Tour) {
  tourStore.updateTour(tour.id, tour)
  showForm.value = true
}
function onDelete(id: number) {
  tourStore.deleteTour(id)
}
function onSubmit(tour: Tour) {
  if (tour.id) tourStore.updateTour(tour.id, tour)
  else tourStore.addTour(tour)
  showForm.value = false
}
function onCancel() {
  showForm.value = false
}
</script>