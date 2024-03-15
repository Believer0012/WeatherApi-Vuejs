<template>
  <div>
    <canvas ref="chartCanvas" :width="400" :height="300"></canvas>
    <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
  </div>
</template>

<script setup>
import Chart from 'chart.js/auto';
import axios from 'axios';
import { ref, watch, onMounted, nextTick } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const errorMessage = ref('');
const lat = route.query.lat;
const lon = route.query.lng;
const apiKey = '7efa332cf48aeb9d2d391a51027f1a71';  // Replace with your actual API key
const chartCanvas = ref(null);
const weatherData = ref(null);

const fetchData = async () => {
  try {
    const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`);
    weatherData.value = response.data;
  } catch (error) {
    console.error('Error fetching weather data:', error);
    errorMessage.value = 'Error: Unable to retrieve weather data.';
  }
};

const createChart = () => {
  if (!weatherData.value) return;  // Handle missing data gracefully

  nextTick(async () => {  // Ensure canvas is rendered before accessing context
    const ctx = chartCanvas.value.getContext('2d');
    new Chart(ctx, {
      type: 'bar', // Change to 'line' for a line chart
      data: {
        labels: ['Current Temperature'],  // Replace with relevant labels if using multiple data points
        datasets: [{
          label: 'Temperature',
          data: [weatherData.value.main.temp],  // Adjust data points based on your data structure
          fill: false,
          borderColor: 'black',  // White color for the line
          backgroundColor: 'rgba(255, 255, 255, 0.6)',  // Semi-transparent white for the background
          tension: 0.1
        }]
      },
      options: {
        scales: {
          x: {
            title: {
              display: true,
              text: 'Time',
              color: 'black'  // White color for the x-axis title
            },
            ticks: {
              color: 'black'  // White color for the x-axis labels
            }
          },
          y: {
            title: {
              display: true,
              text: 'Temperature (°C)',
              color: 'black'  // White color for the y-axis title
            },
            ticks: {
              color: 'black'  // White color for the y-axis labels
            }
          }
        }
      }
    });
  });
};

watch(weatherData, createChart);  // Update chart whenever weather data changes

onMounted(fetchData);
</script>

<style scoped>
.error-message {
  color:rgb(12, 12, 12)e;  /* White color for the error message */
}
</style>
