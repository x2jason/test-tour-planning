<template>
  <el-dialog :title="form.id ? 'Edit Tour' : 'Add Tour'" width="500px" @close="onClose">
    <el-form :model="form" :rules="rules" ref="formRef" label-width="140px" @submit.prevent label-position="left">
      <el-form-item label="Customer Name" prop="customerName">
        <el-input v-model="form.customerName" />
      </el-form-item>
      <el-form-item label="Shipment Date" prop="shipmentDate">
        <el-date-picker v-model="form.shipmentDate" type="date" format="DD.MM.YYYY" value-format="DD.MM.YYYY" />
      </el-form-item>
      <el-form-item label="From" prop="locationFrom">
        <el-input v-model="form.locationFrom" @input="onLocationFromChange" />
      </el-form-item>
      <el-form-item label="To" prop="locationTo">
        <el-input v-model="form.locationTo" />
      </el-form-item>
      <el-form-item label="Assign Driver" prop="driverId">
        <el-select v-model="form.driverId" placeholder="Select driver">
          <el-option v-for="driver in filteredDrivers" :key="driver.id" :label="driver.name" :value="driver.id" />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">{{ form.id ? 'Update' : 'Add' }} Tour</el-button>
        <el-button @click="$emit('cancel')">Cancel</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>
<script setup lang="ts">
import { ref, watch, computed } from 'vue'
import { useDriverStore } from '@/stores/driver'
import type { Tour } from '@/types'
const driverStore = useDriverStore()
const props = defineProps<{
  tour?: Tour | null
  title?: string
  submitText?: string
}>()
const emit = defineEmits(['submit', 'cancel'])
const form = ref({
  id: undefined,
  customerName: '',
  shipmentDate: '',
  locationFrom: '',
  locationTo: '',
  driverId: null,
})
const formRef = ref()

watch(() => props.tour, (val) => {
  if (val) Object.assign(form.value, val)
  else Object.assign(form.value, { id: undefined, customerName: '', shipmentDate: '', locationFrom: '', locationTo: '', driverId: null })
}, { immediate: true })

const rules = {
  customerName: [{ required: true, message: 'Please enter customer name', trigger: 'blur' }],
  shipmentDate: [{ required: true, message: 'Please select shipment date', trigger: 'change' }],
  locationFrom: [{ required: true, message: 'Please enter location from', trigger: 'blur' }],
  locationTo: [
    { required: true, message: 'Please enter location to', trigger: 'blur' },
    {
      validator: (_: unknown, value: string, callback: (error?: Error) => void) => {
        if (value === form.value.locationFrom) {
          callback(new Error('Destination cannot be the same as origin'))
        } else {
          callback()
        }
      },
      trigger: 'blur'
    }
  ],
  driverId: [{ required: false, message: 'Please select driver', trigger: 'change' }],
}
const filteredDrivers = computed(() =>
  driverStore.drivers.filter(d => d.location.toLowerCase() === form.value.locationFrom.toLowerCase())
)
function onLocationFromChange() {
  form.value.driverId = null
}
function onSubmit() {
  formRef.value.validate((valid: boolean) => {
    if (valid) emit('submit', { ...form.value })
  })
}
function onClose() {
  emit('cancel')
  resetForm()
}
function resetForm() {
  form.value = { id: undefined, customerName: '', shipmentDate: '', locationFrom: '', locationTo: '', driverId: null }
  if (formRef.value) formRef.value.clearValidate()
}
</script>
