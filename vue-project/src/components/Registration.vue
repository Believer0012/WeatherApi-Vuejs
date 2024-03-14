<template>
    <div class="p-40 vue-template">
      <form class="max-w-md mx-auto" @submit.prevent="handleSubmit">
        <h3 class="text-white text-2xl font-semibold mb-4">Sign Up</h3>
  
        <div class="form-group mb-4">
          <label for="fullName" class="text-white block mb-2">Full Name</label>
          <input
            id="fullName"
            type="text"
            v-model="fullname"
            class="pt-5 py-2 px-1 w-full bg-transparent border-b focus:border-weather-secondary focus:outline-none focus:shadow-[0px_1px_0_0_#004E71]"
          />
        </div>
  
        <div class="form-group mb-4">
          <label for="email" class="text-white block mb-2">Email address</label>
          <input
            id="email"
            type="email"
            v-model="email"
            class="pt-5 py-2 px-1 w-full bg-transparent border-b focus:border-weather-secondary focus:outline-none focus:shadow-[0px_1px_0_0_#004E71]"
          />
        </div>
  
        <div class="form-group mb-4">
          <label for="password" class="text-white block mb-2">Password</label>
          <input
            id="password"
            type="password"
            v-model="password"
            class="pt-5 py-2 px-1 w-full bg-transparent border-b focus:border-weather-secondary focus:outline-none focus:shadow-[0px_1px_0_0_#004E71]"
          />
        </div>
  
        <button type="submit" class="text-white forgot-password text-right mt-2 px-5 py-5">Sign Up</button>
  
        <p class="text-white forgot-password text-right mt-2">
          Already registered
          <router-link :to="{ name: 'login' }">sign in?</router-link>
        </p>
      </form>
    </div>
  </template>
  
  <script>
  import { ref } from 'vue';
import axios from 'axios';
  
  export default {
    setup() {
      const email = ref('');
      const password = ref('');
      const fullname = ref('');
  
      const handleSubmit = async () => {
  try {
    // Assuming you have fullname, email, and password as ref variables
    const userData = {
      fullname: fullname.value,
      email: email.value,
      password: password.value
    };

    // Send registration data to backend
    const response = await axios.post('http://localhost:4000/user-graphql', {
      query: `
        mutation CreateUser($userInput: UserInput!) {
          createUser(userInput: $userInput) {
            _id
            fullname
            email
          }
        }
      `,
      variables: {
        userInput: userData
      }
    });

    // Handle response
    console.log('Registration successful:', response.data.data.createUser);
    // You can redirect the user to another page or show a success message here
  } catch (error) {
    console.error('Registration failed:', error.response.data);
    // Handle error, show error message to the user, etc.
  }
};
  
      return {
        email,
        password,
        fullname,
        handleSubmit,
      };
    },
  };
  </script>
  