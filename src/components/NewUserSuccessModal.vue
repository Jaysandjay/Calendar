<script setup>
import { useUsersStore } from '@/stores/usersStore';
import { useRouter } from 'vue-router';
import { ref, onMounted } from 'vue';

const userStore = useUsersStore();
const router = useRouter();
const showModal = ref(true);


const modalRef = ref(null);
onMounted(() => {
  modalRef.value?.focus();
});

function continueToHome() {
  showModal.value = false;
  router.push('/');
}
</script>

<template>
  <v-dialog v-model="showModal" persistent max-width="400">
    <v-card ref="modalRef" class="pa-6 text-center" style="border-radius: 16px; background-color: var(--secondary); color: white;" tabindex="0">
      <v-card-title class="text-h5 justify-center">
        Registration Successful!
      </v-card-title>

      <v-card-text class="text-subtitle-1 mt-4">
        Welcome <strong>{{ userStore.user.email }}</strong>
      </v-card-text>

      <v-card-actions class="justify-center mt-6">
        <v-btn color="primary" style="background-color: var(--quat);"  @click="continueToHome">
          Continue
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>


