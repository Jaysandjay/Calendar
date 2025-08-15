<script setup>
import Legend from './Legend.vue'
import { ref, defineEmits } from 'vue'
import { useClassesStore } from '@/stores/classesStore'

const emit = defineEmits(['close'])
const classesStore = useClassesStore()
const selectedColor = ref('yellow')
const className = ref('')

const colors = [
  'yellow',
  'blue',
  'navy',
  'teal',
  'orange',
  'green',
  'lime',
  'purple',
  'maroon',
  'red',
  'brown',
  'fuchsia',
]

function handleClose() {
  emit('close')
}

function addClass() {
  const newClass = {
    class: className.value,
    color: selectedColor.value,
  }
  classesStore.addClass(newClass)
}
</script>

<template>
  <div class="modal-overlay">
    <v-card class="classes-modal d-flex flex-column pa-5">
      <v-icon
        class="position-absolute"
        style="top: 8px; right: 8px; cursor: pointer"
        icon="mdi-close px-5"
        @click="handleClose"
      ></v-icon>

      <Legend :hasDelete="true" />

      <v-form ref="formRef" @submit.prevent="addClass" class="mt-5">
        <div class="d-flex">
          <div style="width: 80px">
            <v-select
              v-model="selectedColor"
              :items="colors.map((c) => ({ title: '', value: c }))"
              item-title="title"
              item-value="value"
              style="width: 80px"
              outlined
            >
              <!-- Customize how each item looks in the dropdown -->
              <template #item="{ item, props }">
                <v-list-item v-bind="props">
                  <v-icon :style="{ color: item.value }" class="mr-2">mdi-circle</v-icon>
                </v-list-item>
              </template>

              <!-- Selected value -->
              <template #selection="{ item }">
                <v-icon :style="{ color: item.value }">mdi-circle</v-icon>
              </template>
            </v-select>
          </div>

          <v-text-field
            v-model="className"
            :rules="[(v) => !!v || 'Class is required']"
            label="Class Name"
          ></v-text-field>
        </div>

        <v-btn class="mt-4" type="submit" block>Submit</v-btn>
      </v-form>
    </v-card>
  </div>
</template>
