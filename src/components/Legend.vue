<script setup>
import { defineProps } from 'vue'
import { useClassesStore } from '../stores/classesStore'
import ModifyClassesBtn from './ModifyClassesBtn.vue'

const props = defineProps({
  hasDelete: {
    type: Boolean,
    default: false
  }
})
const classesStore = useClassesStore()

function handleDelete(classInfo){
  classesStore.deleteClass(classInfo)
}


</script>

<template>
  <v-card class="mx-auto d-flex flex-column align-center overflow-auto" min-width="350" max-height="450">
    <v-list density="compact">
      <v-list-subheader>Classes</v-list-subheader>

      <v-list-item v-for="(item, index) in classesStore.items" :key="index" color="primary">
        <template v-slot:prepend>
          <v-icon :style="{ color: item.color }" icon="mdi-circle"></v-icon>
        </template>

        <v-list-item-title>{{ item.class }}</v-list-item-title>

        <template v-slot:append>
          <v-icon v-if="hasDelete" icon="mdi-close px-5" @click="()=>handleDelete(item)"></v-icon>
        </template>

      </v-list-item>
    </v-list>
    <ModifyClassesBtn v-if="!hasDelete"/>
  </v-card>
</template>
