<script setup>
import { ref } from 'vue'

const colors = [
  {
    label: 'Pink',
    main: '#FF33AA',
    second: '#CC2290',
    third: '#FF99D9',
    fourth: '#990066',
  },
  {
    label: 'Teal',
    main: '#54B6B2',
    second: '#387976',
    third: '#8DCECB',
    fourth: '#1C3C3B',
  },
  {
    label: 'Blue',
    main: '#0066FF',
    second: '#3399FF',
    third: '#99CCFF',
    fourth: '#003399',
  },
  {
    label: 'Green',
    main: '#00AA33',
    second: '#33CC66',
    third: '#99E6AA',
    fourth: '#006622',
  },
  {
    label: 'Orange',
    main: '#FF7700',
    second: '#FFAA33',
    third: '#FFD699',
    fourth: '#994400',
  },
  {
    label: 'Purple',
    main: '#9900CC',
    second: '#CC33FF',
    third: '#E699FF',
    fourth: '#660099',
  },
]

const root = document.documentElement
const mainColor = getComputedStyle(root).getPropertyValue('--mainColor').trim()
const currentColor = colors.find((c) => c.main === mainColor)
const selectedColor = ref(currentColor)

function updateColor() {
  const color = selectedColor.value
  document.documentElement.style.setProperty('--mainColor', color.main)
  document.documentElement.style.setProperty('--secondary', color.second)
  document.documentElement.style.setProperty('--tertiary', color.third)
  document.documentElement.style.setProperty('--quat', color.fourth)
}
</script>

<template>
  <v-sheet class="d-flex flex-column justify-center align-center pa-2">
    <v-title class="text-h6">Color Scheme</v-title>

    <v-radio-group v-model="selectedColor" @change="updateColor" class="d-flex flex-wrap gap-1 justify-center">
      <v-row :no-gutters="true">
        <v-col v-for="color in colors" :key="color.label" cols="6">
          <v-radio 
          :label="color.label" 
          :value="color" 
          :color="color.main" 
          class="m-0 p-0 text-caption" 
          density="compact"
          
          />
        </v-col>
      </v-row>
    </v-radio-group>
  </v-sheet>
</template>
