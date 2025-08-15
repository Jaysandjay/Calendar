<script setup>
import { ref } from 'vue'
import ClassesModal from './ClassesModal.vue'

const isClicked = ref(false)

function handleClick() {
  isClicked.value = true
}
</script>

<template>
  <v-btn :disabled="isClicked" @click="handleClick" class="ma-3 secondary">Modify</v-btn>
  <teleport to="body">
    <ClassesModal v-if="isClicked" @close="isClicked = false" />
  </teleport>
</template>
