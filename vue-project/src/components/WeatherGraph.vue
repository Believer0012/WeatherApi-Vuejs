<template>
    <div>
      <canvas ref="chartCanvas"></canvas>
    </div>
  </template>
  
  <script setup>
  import Chart from 'chart.js/auto';
  import axios from 'axios';
  import { ref, onMounted } from 'vue';
  import { useRoute } from 'vue-router';
  
  const route = useRoute();
  const { lat, lng } = route.query;
  
  const weatherData = ref(null);
  
  const fetchWeatherData = async () => {
    try {
      const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=7efa332cf48aeb9d2d391a51027f1a71&units=imperial`);
      console.log(response)
      weatherData.value = response.data;
      createChart();
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  };
  
  onMounted(fetchWeatherData);
  
  const createChart = () => {
    if (!weatherData.value) return;
  
    const ctx = this.$refs.chartCanvas.getContext('2d');
    new Chart(ctx, {
      type: 'line',
      data: {
        labels: weatherData.value.daily.map(day => new Date(day.dt * 1000).toLocaleDateString()),
        datasets: [{
          label: 'Temperature (°C)',
          data: weatherData.value.daily.map(day => day.temp.day),
          fill: false,
          borderColor: 'rgb(75, 192, 192)',
          tension: 0.1
        }]
      }
    });
  };
  </script>
  
  <style scoped>
  /* Add any necessary styles here */
  </style>
  