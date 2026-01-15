<script setup>
import { defineProps } from 'vue'
import { useClassesStore } from '../stores/classesStore'
import { useEventsStore } from '@/stores/eventsStore'
import ModifyClassesBtn from './ModifyClassesBtn.vue'

const props = defineProps({
  hasDelete: {
    type: Boolean,
    default: false,
  },
})
const classStore = useClassesStore()

async function handleDelete(classInfo) {
  console.log("class to delete", classInfo)
  await classStore.deleteClass(classInfo)
  
}
</script>

<template>
  <v-card class="mx-auto d-flex flex-column align-left">
    <div class="legend" >
      <v-list density="compact">
        <v-list-subheader>Classes</v-list-subheader>
        
        <p v-if="classStore.items.length === 0" class="ml-2">No classes</p>
        <v-list-item
          v-for="(item) in classStore.items"
          :key="item.id"
          color="primary"
          class="classListItem"
        >

          <template v-slot:prepend>
            <v-icon
              v-if="hasDelete"
              icon="mdi-close px-5"
              @click="() => handleDelete(item)"
            ></v-icon>
            <v-icon :style="{ color: item.color }" icon="mdi-circle"></v-icon>
          </template>

          <v-list-item-title>{{ item.name }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </div>
    <ModifyClassesBtn v-if="!hasDelete" />
  </v-card>
</template>
