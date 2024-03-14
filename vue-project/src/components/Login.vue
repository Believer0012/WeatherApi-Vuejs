<template>
    <div class="p-40 vue-template">
      <form class="max-w-md mx-auto" @submit.prevent="handleSubmit">
        <h3 class="text-2xl font-semibold mb-4 text-white">Sign In</h3>
  
        <div class="form-group mb-4">
          <label for="email" class="block mb-2 text-white">Email address</label>
          <input
            id="email"
            type="email"
            v-model="email"
            class="pt-5 py-2 px-1 w-full bg-transparent border-b focus:border-weather-secondary focus:outline-none focus:shadow-[0px_1px_0_0_#004E71] text-white"
          />
        </div>
  
        <div class="form-group mb-4">
          <label for="password" class="block mb-2 text-white">Password</label>
          <input
            id="password"
            type="password"
            v-model="password"
            class="pt-5 py-2 px-1 w-full bg-transparent border-b focus:border-weather-secondary focus:outline-none focus:shadow-[0px_1px_0_0_#004E71] text-white"
          />
        </div>
  
        <button type="submit" class="btn-light btn-lg btn-block py-5 text-white">Sign In</button>
  
      </form>
    </div>
  </template>
  
  <script>
  import { ref } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';
  
  
  export default {
    setup() {
      const email = ref('');
      const password = ref('');
   const router = useRouter();
      const handleSubmit = async () => {
  try {
    // Assuming you have email and password as ref variables
    const loginData = {
      email: email.value,
      password: password.value
    };

    // Send login data to backend
    const response = await axios.post('http://localhost:4000/user-graphql', {
      query: `
        mutation Login($email: String!, $password: String!) {
          login(email: $email, password: $password) {
            userId
            token
            tokenExpiration
          }
        }
      `,
      variables: {
        email: loginData.email,
        password: loginData.password
      }
    });

    sessionStorage.setItem('token',response.data.data.login.token)
    sessionStorage.setItem('userId',response.data.data.login.userId)
   
    router.push({ name: 'home' });
    
   

  } catch (error) {
    console.error('Login failed:', error.response.data);
    // Handle error, show error message to the user, etc.
  }
};
  
      return {
        email,
        password,
        handleSubmit,
      };
    },
  };
  </script>
  