<template>
    <div>
      <CityCard v-for="city in savedCities" :key="city._id" :city="city" @click="goToCityView(city)" />
      <p v-if="savedCities.length === 0">
        No locations added. To start tracking a location, search in the field above.
      </p>
    </div>
  </template>
  
  <script setup>
  import axios from "axios";
  import { ref } from "vue";
  import { useRouter } from "vue-router";
  import CityCard from "./CityCard.vue";
  
  const savedCities = ref([]);
  const router = useRouter();
  
  const getCities = async () => {
    try {
      const response = await axios.post("http://localhost:4000/graphql", {
        query: "query { cities { _id state city coords { lat lng } } }"
      });
  
      savedCities.value = response.data.data.cities;
  
      const requests = [];
      savedCities.value.forEach((city) => {
        requests.push(
          axios.get(
            `https://api.openweathermap.org/data/2.5/weather?lat=${city.coords.lat}&lon=${city.coords.lng}&appid=7efa332cf48aeb9d2d391a51027f1a71&units=imperial`
          )
        );
      });
  
      const weatherData = await Promise.all(requests);
  
      weatherData.forEach((value, index) => {
        savedCities.value[index].weather = value.data;
      });
    } catch (error) {
      console.error("Error fetching cities:", error);
    }
  };
  
  await getCities();
  
  const goToCityView = (city) => {
    router.push({
      name: "weatherGraph",
      params: { state: city.state, city: city.city },
      query: {
        lat: city.coords.lat,
        lng: city.coords.lng,
      },
    });
  };
  </script>
  