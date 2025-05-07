<template>
  <el-card>
    <div class="flex gap-2">
      <el-input v-model="searchDriverName" placeholder="Search driver..." class="mb-2" clearable />
      <el-select v-model="selectedLocation" placeholder="Filter location" class="mb-2 w-[200px]" clearable>
        <el-option v-for="loc in locations" :key="loc" :label="loc" :value="loc" />
      </el-select>
    </div>

    <el-table :data="filteredDrivers" class="w-full">
      <el-table-column prop="name" label="Name" />
      <el-table-column prop="location" label="Location" />
      <el-table-column label="Actions" width="160">
        <template #default="scope">
          <el-button size="small" @click="openEditDialog(scope.row)">Edit</el-button>
          <el-button size="small" type="danger" @click="openDeleteDialog(scope.row)">Delete</el-button>
        </template>
      </el-table-column>
    </el-table>

    <DriverFormModal v-model="editDialogVisible" :driver="editDriver" @submit="handleEditSubmit"
      @close="editDialogVisible = false" />

    <el-dialog v-model="deleteDialogVisible" title="Confirm Delete" width="320px" show-close>
      <div>Are you sure you want to delete driver <b>{{ deleteDriver?.name }}</b>?</div>
      <template #footer>
        <el-button @click="deleteDialogVisible = false">Cancel</el-button>
        <el-button type="danger" @click="handleDeleteConfirm">Delete</el-button>
      </template>
    </el-dialog>
  </el-card>
</template>
<script setup lang="ts">
import { ref, computed } from 'vue'
import type { Driver } from '@/types'
import DriverFormModal from './DriverFormModal.vue'
const props = defineProps<{
  drivers: Driver[]
}>()
const emit = defineEmits(['edit', 'delete'])

const searchDriverName = ref('')
const selectedLocation = ref<string | null>(null)
const editDialogVisible = ref(false)
const editDriver = ref<Driver | null>(null)
const deleteDialogVisible = ref(false)
const deleteDriver = ref<Driver | null>(null)

const locations = computed(() => Array.from(new Set(props.drivers.map(d => d.location))))
const filteredDrivers = computed(() =>
  props.drivers.filter(driver => {
    const matchName = driver.name.toLowerCase().includes(searchDriverName.value.toLowerCase())
    const matchLocation = !selectedLocation.value || driver.location === selectedLocation.value
    return matchName && matchLocation
  })
)

const openEditDialog = (driver: Driver) => {
  editDriver.value = { ...driver }
  editDialogVisible.value = true
}
const handleEditSubmit = (updated: Driver) => {
  emit('edit', updated)
  editDialogVisible.value = false
  editDriver.value = null
}

const openDeleteDialog = (driver: Driver) => {
  deleteDriver.value = driver
  deleteDialogVisible.value = true
}
const handleDeleteConfirm = () => {
  if (deleteDriver.value) emit('delete', deleteDriver.value)
  deleteDialogVisible.value = false
  deleteDriver.value = null
}
</script>
