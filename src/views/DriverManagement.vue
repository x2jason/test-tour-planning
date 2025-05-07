<template>
  <div class="max-w-3xl mx-auto p-4">
    <div class="flex justify-between items-center mb-8">
      <h2 class="text-2xl font-bold">Driver Management</h2>
      <CreateDriver @submit="handleAddDriver" />
    </div>
    <DriverList :drivers="drivers" @edit="handleEdit" @delete="handleDelete" />
  </div>
</template>
<script setup lang="ts">
import DriverList from '@/components/driver/DriverList.vue'
import CreateDriver from '@/components/driver/CreateDriver.vue'
import { useDriverStore } from '@/stores/driver'
import { storeToRefs } from 'pinia'
import type { Driver } from '@/types'

const driverStore = useDriverStore()
const { drivers } = storeToRefs(driverStore)

const handleAddDriver = (driver: Driver) => {
  driverStore.addDriver(driver)
}
const handleEdit = (driver: Driver) => {
  driverStore.updateDriver(driver)
}
const handleDelete = (driver: Driver) => {
  driverStore.deleteDriver(driver.id)
}
</script>