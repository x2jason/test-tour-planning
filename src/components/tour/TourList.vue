<template>
  <el-card>
    <el-input v-model="search" placeholder="Search..." class="mb-2" clearable />
    <el-table :data="filteredTours" style="width: 100%">
      <el-table-column prop="customerName" label="Customer Name" />
      <el-table-column prop="shipmentDate" label="Shipment Date" />
      <el-table-column prop="locationFrom" label="From" />
      <el-table-column prop="locationTo" label="To" />
      <el-table-column label="Driver">
        <template #default="scope">
          <span>{{ getDriverName(scope.row.driverId) }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Actions" width="150">
        <template #default="scope">
          <div class="flex gap-1">
            <el-button size="small" @click="openEditDialog(scope.row)">Edit</el-button>
            <el-button size="small" type="danger" @click="$emit('delete', scope.row.id)">Delete</el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <TourFormModal v-model="editDialogVisible" :tour="editTour" @submit="handleEditSubmit"
      @cancel="editDialogVisible = false" />
  </el-card>
</template>
<script setup lang="ts">
import { ref, computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useTourStore } from '../../stores/tour'
import { useDriverStore } from '../../stores/driver'
import TourFormModal from './TourFormModal.vue'
import type { Tour } from '@/types'
const tourStore = useTourStore()
const driverStore = useDriverStore()
const { tours } = storeToRefs(tourStore)
const search = ref('')

const editDialogVisible = ref(false)
const editTour = ref<Tour | null>(null)

const openEditDialog = (tour: Tour) => {
  editTour.value = { ...tour }
  editDialogVisible.value = true
}
const handleEditSubmit = (updatedTour: Tour) => {
  emit('edit', updatedTour)
  editDialogVisible.value = false
  editTour.value = null
}

const getDriverName = (driverId: number | null) => {
  if (!driverId) return ''
  return driverStore.getDriverById(driverId)?.name
}

const filteredTours = computed(() => {
  const searchValue = search.value.trim().toLowerCase()
  if (!searchValue) return tours.value
  return tours.value.filter(tour => {
    if (tour.id) {
      // match driver name
      if (driverStore.getDriverById(tour?.driverId)?.name.toLowerCase().includes(searchValue)) {
        return true
      }
    }
    // fuzzy match everything
    return Object.values(tour).some(value => {
      if (typeof value === 'string') {
        return value.toLowerCase().includes(search.value.toLowerCase())
      }
    })
  })
})

const emit = defineEmits(['edit', 'delete'])
</script>
