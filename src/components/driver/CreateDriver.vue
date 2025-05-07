<template>
  <div>
    <el-button type="primary" @click="dialogVisible = true">Add Driver</el-button>
    <DriverFormModal v-model="dialogVisible" title="Add Driver" submitText="Add Driver" @submit="onSubmit"
      @close="onClose" />
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import { useDriverStore } from '../../stores/driver'
import type { Driver } from '../../types'
import DriverFormModal from '../driver/DriverFormModal.vue'
const dialogVisible = ref(false)
const driverStore = useDriverStore()
const { addDriver } = driverStore

function onSubmit(driver: Driver) {
  addDriver(driver)
  dialogVisible.value = false
}
function onClose() {
  dialogVisible.value = false
}
</script>
