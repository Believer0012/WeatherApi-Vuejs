<template>
  <div>
    <Suspense>
      <AsyncCityView />
      <template #fallback>
        <!-- Replace the "Loading..." text with a spinner -->
        <div class="flex justify-center items-center h-32"> <!-- Adjust height as needed -->
          <svg class="animate-spin h-12 w-10 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A8.002 8.002 0 014.373 4.373L2.987 5.759A9.956 9.956 0 002 12h4v5.291z"></path>
          </svg>
        </div>
      </template>
    </Suspense>
  </div>
</template>

<script setup>
import AsyncCityView from "../components/AsyncCityView.vue";
</script>
