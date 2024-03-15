<template>
  <header class="sticky top-0 bg-weather-primary shadow-lg">
    <nav class="container flex flex-col sm:flex-row items-center gap-4 text-white py-6">
      <RouterLink :to="{ name: 'home' }">
        <div class="flex items-center gap-3">
          <i class="fa-solid fa-sun text-2xl"></i>
          <p class="text-2xl">J$L Weather App</p>
        </div>
      </RouterLink>

      <div class="flex gap-3 flex-1 justify-end">
        <i
          class="fa-solid fa-circle-info text-xl hover:text-weather-secondary duration-150 cursor-pointer"
          @click="toggleModal"
        ></i>
        <i
          class="fa-solid fa-plus text-xl hover:text-weather-secondary duration-150 cursor-pointer"
          @click="addCity"
          v-if="route.query.preview"
        ></i>
        <button v-if="!isAuthenticated" @click="login">Login</button>
        <button v-else @click="logout">Logout</button>
      </div>

      <BaseModal :modalActive="modalActive" @close-modal="toggleModal">
        <div class="text-black">
          <h1 class="text-2xl mb-1">About:</h1>
          <p class="mb-4">
            The Local Weather allows you to track the current and future weather of cities of your choosing.
          </p>
          <h2 class="text-2xl">How it works:</h2>
          <ol class="list-decimal list-inside mb-4">
            <li>
              Search for your city by entering the name into the search bar.
            </li>
            <li>
              Select a city within the results, this will take you to the current weather for your selection.
            </li>
            <li>
              Track the city by clicking on the "+" icon in the top right. This will save the city to view at a later time on the home page.
            </li>
          </ol>

          <h2 class="text-2xl">Removing a city</h2>
          <p>
            If you no longer wish to track a city, simply select the city within the home page. At the bottom of the page, there will be an option to delete the city.
          </p>
        </div>
      </BaseModal>
    </nav>
  </header>
</template>

<script setup>
import { RouterLink, useRoute, useRouter } from "vue-router";
import { ref } from "vue";
import BaseModal from "./BaseModal.vue";
import axios from "axios";

const route = useRoute();
const router = useRouter();
const modalActive = ref(false);
const isAuthenticated = ref(!!sessionStorage.getItem("token"));

const addCity = async () => {
  try {

    const token = sessionStorage.getItem("token");
    if (!token) {
      // If no token found, redirect user to login page
      router.push({ name: "login" });
      return;
    }

    // Validate required fields
    if (!route.params.state || !route.params.city || !route.query.lat || !route.query.lng) {
      throw new Error("Missing required city information.");
    }
    const userId = sessionStorage.getItem("userId");
  

    const locationObj = {
      
      cityInput: {
        userId: userId,
        state: route.params.state,
        city: route.params.city,
        coords: {
          lat: parseFloat(route.query.lat),
          lng: parseFloat(route.query.lng),
        },
        
      },
      
    };

    const response = await axios.post("http://localhost:4000/graphql", {
      query: `
        mutation CreateCity($cityInput: CityInput!) {
          createCity(cityInput: $cityInput) {
            _id
            state
            city
            coords {
              lat
              lng
            }
          }
        }
      `,
      variables: locationObj,
    });

    console.log("City added successfully:", response.data);
    // Provide success feedback to the user

    // Update query parameters and redirect
    let query = Object.assign({}, route.query);
    delete query.preview;
    router.replace({ query });

    // Update saved cities list (optional)
    // ...
  } catch (error) {
    console.error("Error adding city:", error);
    // Provide error feedback to the user
  }
};

const toggleModal = () => {
  modalActive.value = !modalActive.value;
};

const login = () => {
  // Perform login logic
  router.push({ name: 'login' });
    
  isAuthenticated.value = true;
};

const logout = () => {
  // Perform logout logic
  sessionStorage.removeItem("token");
  sessionStorage.removeItem("userId")


  router.push({ name: 'home' });
  isAuthenticated.value = false;
  window.location.reload()
};
</script>
