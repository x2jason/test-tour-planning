import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { Driver } from '@/types'

export const useDriverStore = defineStore('driver', () => {
  const drivers = ref<Driver[]>([
    { id: 1, name: 'John Doe', location: 'Berlin' },
    { id: 2, name: 'Jane Smith', location: 'Hamburg' },
    { id: 3, name: 'Jack Bauer', location: 'Berlin' },
    { id: 4, name: 'Yus Efe', location: 'Hamburg' },
    { id: 5, name: 'Pete Pe', location: 'Frankfurt' },
  ])

  function getDriverById(driverId?: number | null) {
    if (!driverId) return null
    return drivers.value.find(d => d.id === driverId)
  }

  function addDriver(driver: Omit<Driver, 'id'>) {
    drivers.value.push({ ...driver, id: Date.now() })
  }
  function updateDriver(updated: Driver) {
    const idx = drivers.value.findIndex(d => d.id === updated.id)
    if (idx !== -1) drivers.value[idx] = { ...updated }
  }
  function deleteDriver(id: number) {
    drivers.value = drivers.value.filter(d => d.id !== id)
  }
  return { drivers, addDriver, updateDriver, deleteDriver, getDriverById }
}) 