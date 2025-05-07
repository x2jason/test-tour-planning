import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { Tour } from '@/types'


export const useTourStore = defineStore('tour', () => {
  const tours = ref<Tour[]>([
    { id: 1, customerName: 'Great Company', shipmentDate: '01.01.2022', locationFrom: 'Berlin', locationTo: 'Hamburg', driverId: 1 },
    { id: 2, customerName: 'ABCD Company', shipmentDate: '01.06.2022', locationFrom: 'Hamburg', locationTo: 'Frankfurt', driverId: null },
    { id: 3, customerName: 'XYZ Company', shipmentDate: '01.07.2025', locationFrom: 'Hamburg', locationTo: 'Berlin', driverId: null },
  ])

  function addTour(tour: Omit<Tour, 'id'>) {
    tours.value.push({ ...tour, id: Date.now() })
  }
  function updateTour(id: number, tour: Tour) {
    const idx = tours.value.findIndex(t => t.id === id)
    if (idx !== -1) tours.value[idx] = { ...tour, id }
  }
  function deleteTour(id: number) {
    tours.value = tours.value.filter(t => t.id !== id)
  }
  return { tours,  addTour, updateTour, deleteTour }
}) 