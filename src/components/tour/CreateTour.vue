<template>
  <div>
    <el-button type="primary" @click="modalVisible = true">Add Tour</el-button>
    <TourFormModal v-model="modalVisible" title="Add Tour" @submit="onSubmit" @cancel="modalVisible = false" />
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import { useTourStore } from '@/stores/tour'
import type { Tour } from '@/types'
import TourFormModal from './TourFormModal.vue'

const modalVisible = ref(false)
const tourStore = useTourStore()

function onSubmit(tour: Omit<Tour, 'id'>) {
  tourStore.addTour(tour)
  modalVisible.value = false
}

</script>
