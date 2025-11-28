<script setup>
import { useAuth0 } from "@auth0/auth0-vue";

const { loginWithRedirect, logout, user, isAuthenticated, getAccessTokenSilently } = useAuth0();

async function showToken() {
  const token = await getAccessTokenSilently();
  console.log("Access Token:", token);
}
</script>

<template>
<main class="h-screen d-flex mainColor" style="width: 100vw;">
    
    <div class="space-y-6 text-center justify-center">
      <h1 class="text-3xl font-bold">Auth Test</h1>
      <div class="flex justify-center space-x-4">
        <button 
        class="mx-10 px-8 py-3 secondary text-white rounded-xl hover:tertiary transition"
        @click="loginWithRedirect()"
        >
          Login
        </button>
        <button 
        class="px-8 py-3 secondary text-white rounded-xl hover:tertiary transition"
        @click="logout({ returnTo: window.location.origin})"
        >
          Logout
        </button>
      </div>
      <div v-if="isAuthenticated">
      <p>Welcome {{ user.name || user.email }}</p>
    </div>
      <p class="text-gray-700">User info goes here...</p>
    </div>
</main>
    
</template>


