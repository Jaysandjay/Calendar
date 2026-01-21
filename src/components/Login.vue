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
const existingUserError = ref(false)
const showModal = ref(false)

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
    existingUserError.value = false

    const user = { email: email.value, password: password.value }
    console.log("Creating user:", user)

    await userStore.findUser(user)
    console.log("After findUser:", userStore.user)

    if(userStore.user.id){
        console.log("User exists already")
        existingUserError.value = true
    } else {
        console.log("User does not exist, creating...")
        await userStore.createUser(user)
        console.log("After createUser:", userStore.user)
        await userStore.findUser(user)
        if(userStore.user.id){
            console.log("Showing modal")
            showModal.value = true
        } else {
            console.log("User creation failed")
            error.value = true
        }
    }
}


function continueToHome() {
  showModal.value = false
  router.push('/')
}


const submit = async () =>{
    error.value = false
    existingUserError.value = false
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
    <main class="h-screen d-flex" style="width: 100vw; background-color: var(--secondary);">
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
            <div
              class="mt-4 flex flex-col"
            >
              <p>
                To register, please fill in the fields and click 'Create New'
              </p>
            <br>
              <p>
                Just want to check out the app? Use the following:
              </p>
              <p>Email: test@gmail.com</p>
              <p>Password: 123</p>
                
          </div>
            <span v-if="error" class="text-red">Please Try Again</span>
            <span v-if="existingUserError" class="text-red">User already exists</span>
            
          </v-form>
        </v-sheet>


        <v-dialog v-model="showModal" persistent max-width="400">
          <v-card ref="modalRef" class="pa-6 text-center" style="border-radius: 16px; background-color: var(--secondary); color: white;" tabindex="0">
            <v-card-title class="text-h5 justify-center">
              Registration Successful!
            </v-card-title>

            <v-card-actions class="justify-center mt-6">
              <v-btn color="primary" style="background-color: var(--quat);"  @click="continueToHome">
                Continue
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
    </main>
    
</template>