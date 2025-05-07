<template>
  <el-dialog :title="dialogTitle" width="400px" @close="onClose">
    <el-form :model="form" :rules="rules" ref="formRef" label-width="80px" @submit.prevent>
      <el-form-item label="Name" prop="name">
        <el-input v-model="form.name" />
      </el-form-item>
      <el-form-item label="Location" prop="location">
        <el-input v-model="form.location" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">{{ submitTextComputed }}</el-button>
        <el-button @click="onClose">Cancel</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>
<script setup lang="ts">
import { ref, watch, computed } from 'vue'
import type { Driver } from '@/types'
const props = defineProps<{
  driver?: Driver | null
  title?: string
  submitText?: string
}>()
const emit = defineEmits(['submit', 'close'])
const form = ref({ name: '', location: '' })
const formRef = ref()
const isEdit = computed(() => !!props.driver)
const dialogTitle = computed(() => props.title || (isEdit.value ? 'Edit Driver' : 'Add Driver'))
const submitTextComputed = computed(() => props.submitText || (isEdit.value ? 'Save' : 'Add Driver'))

watch(() => props.driver, (val) => {
  if (val) form.value = { ...val }
  else form.value = { name: '', location: '' }
}, { immediate: true })

const rules = {
  name: [{ required: true, message: 'Please enter name', trigger: 'blur' }],
  location: [
    { required: true, message: 'Please enter location', trigger: 'blur' },
    {
      validator: (_: unknown, value: string, callback: (error?: Error) => void) => {
        if (/\d/.test(value)) callback(new Error('Location cannot contain numbers'))
        else callback()
      }, trigger: 'blur'
    }
  ]
}
function onSubmit() {
  formRef.value.validate((valid: boolean) => {
    if (valid) {
      emit('submit', { ...form.value })
      resetForm()
    }
  })
}
function onClose() {
  emit('close')
  resetForm()
}
function resetForm() {
  form.value = { name: '', location: '' }
  if (formRef.value) formRef.value.clearValidate()
}
</script>