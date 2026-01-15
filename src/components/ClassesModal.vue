<script setup>
import Legend from './Legend.vue'
import { ref, defineEmits, nextTick } from 'vue'
import { useClassesStore } from '@/stores/classesStore'

const emit = defineEmits(['close'])
const classStore = useClassesStore()
const selectedColor = ref('yellow')
const className = ref('')
const error = ref(false)

const colors = [
  'yellow',
  'black',
  'dimgray',
  'slategray',
  'darkslategray',
  'navy',
  'darkolivegreen',
  'olive',
  'saddlebrown',
  'maroon',
  'darkred',
  'goldenrod',
  'darkgoldenrod',
  'peru',
  'tan',
]

function handleClose() {
  emit('close')
}

function addClass() {
  error.value = false
  if (className.value != ''.trim()) {
    const newClass = {
      name: className.value,
      color: selectedColor.value,
    }
    classStore.addClass(newClass)
    className.value = ''
  }else {
    error.value = true
  }
}
</script>

<template>
  <div class="modal-overlay w-auto">
    <v-card class="classes-modal d-flex flex-column pa-5 w-50">
      <div class="mb-1">Modify Classes</div>
      <v-icon
        class="position-absolute"
        style="top: 8px; right: 8px; cursor: pointer"
        icon="mdi-close px-5"
        @click="handleClose"
      ></v-icon>

      <Legend class="legendModal" style="width: 100%;" :hasDelete="true" />

      <v-form @submit.prevent="addClass" class="mt-5">
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
              <template #item="{ item, props }">
                <v-list-item v-bind="props">
                  <v-icon :style="{ color: item.value }" class="mr-2">mdi-circle</v-icon>
                </v-list-item>
              </template>

              <template #selection="{ item }">
                <v-icon :style="{ color: item.value }">mdi-circle</v-icon>
              </template>
            </v-select>
          </div>

          <v-text-field
            v-model="className"
            label="Class Name"
          ></v-text-field>
        </div>
        <p v-if="error" class="text-red">Class is required</p>

        <v-btn class="mt-4" type="submit" block>Submit</v-btn>
      </v-form>
    </v-card>
  </div>
</template>
