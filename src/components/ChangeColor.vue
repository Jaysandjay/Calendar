<script setup>
import { ref } from 'vue'

const root = document.documentElement
const mainColor = getComputedStyle(root).getPropertyValue('--mainColor').trim()
const selectedColor = ref(mainColor)

const colors = [
  { label: 'Red', value: 'rgb(255, 60, 60)' },
  { label: 'Teal', value: 'rgb(84, 182, 178)' },
  { label: 'Blue', value: 'rgb(0, 90, 255)' },
  { label: 'Green', value: 'rgb(0, 128, 0)' },
  { label: 'Orange', value: 'rgb(255, 165, 0)' },
  { label: 'Purple', value: 'rgb(128, 0, 128)' }
]

function updateColor(){
    document.documentElement.style.setProperty('--mainColor', selectedColor.value)
}
</script>

<template>
    <v-sheet class="d-flex flex-column justify-center align-center pa-2">
        <v-title class="text-h6">Color Scheme</v-title>

        <v-radio-group v-model="selectedColor" @change="updateColor">
          <v-row>
            <v-col 
              v-for="color in colors" 
              :key="color.value" 
              cols="6"
            >
              <v-radio 
                :label="color.label" 
                :value="color.value" 
                :color="color.value" 
              />
            </v-col>
          </v-row>
        </v-radio-group>
    </v-sheet>

</template>