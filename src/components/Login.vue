<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useUsersStore } from '@/stores/usersStore';
import { onBeforeMount } from 'vue';

const userStore = useUsersStore()
const router = useRouter()

const email = ref('')
const password = ref('')
const error = ref(false)

onBeforeMount( () => {
  if(userStore.user.id){
    userStore.logout()
  }
})

function isEmailValid(email){
        const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return re.test(email);
    
}

async function createNew() {
    error.value = false
    
    const user = {
        email: email.value,
        password: password.value
    }

    await userStore.findUser(user)
    if(userStore.user.id){
        console.log(userStore.user)
        router.push('/')
    }else{
        userStore.createUser(user)
        router.push('/')
    }
}

const submit = async () =>{
    error.value = false
    const user ={
        email: email.value,
        password: password.value
    }
    await userStore.findUser(user)
    if(userStore.user.id){
        console.log(userStore.user)
        router.push('/')
    }else{
        error.value = true
    }
}



</script>

<template>
    <main class="h-screen d-flex" style="width: 100vw;">
        <v-sheet class="rounded-xl justify-center align-self-center" width="500" height="600">
          <div class="text-center pa-10 text-h4">
              Login
          </div>
          <v-form  @submit.prevent="submit" class="pa-10">
            <v-text-field
              v-model="email"
              type="email"
              :rules="[
                v => !!v || 'Email is required',
                v => isEmailValid(v) || 'Must be a valid email'
              ]"
              label="Email"
              class="mb-4"
            ></v-text-field>
            <v-text-field
              v-model="password"
              type="password"
              min-length="7"
              :rules="[(v) => !!v || 'Password is required']"
              label="Password"
            ></v-text-field>
            <v-btn class="mt-4 secondary" type="submit" block>Submit</v-btn>
            <v-btn class="mt-4 secondary" @click="createNew" block>Create New</v-btn>
            <v-btn class="mt-4 secondary v-btn v-btn--block v-btn--flat v-theme--dark v-btn--border bg-surface-light v-btn--density-default rounded-lg v-btn--size-large v-btn--variant-flat text-none" >
                <span class="v-btn__prepend"><i class="mdi-google mdi v-icon notranslate v-theme--dark v-icon--size-default" aria-hidden="true"></i></span>
                <span class="v-btn__content" data-no-activator="">Google</span>
            </v-btn>
            <span v-if="error" class="text-red">Please Try Again</span>
            
          </v-form>
        </v-sheet>
    </main>
    
</template>