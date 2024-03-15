const { City } = require('../../modals/City'); // Assuming your City model

module.exports = {
  cities: async ({ userId }) => { // Accept userId as a parameter
    try {
      const cities = await City.find({ userId }); // Filter cities by userId
      return cities;
    } catch (error) {
      console.error('Error fetching cities:', error);
      throw new Error('Failed to fetch cities');
    }
  },
  createCity: async ({ cityInput }) => {
    // Validate required fields:
    console.log(cityInput)
    if (!cityInput.state || !cityInput.city || !cityInput.coords || !cityInput.userId) {
      throw new Error('State, city, and coordinates are required.');
    }

    const { state, city, coords ,userId} = cityInput;

    // Check for existing city with the same state and city combination
    const existingCity = await City.findOne({ userId });

    if (existingCity) {
      throw new Error('City already exists.');
      return {
        error: true,
        message: 'City already exists.',
      };
    }

    const newCity = new City({ state, city, coords,userId });
    try {
      const savedCity = await newCity.save();
      return savedCity;
    } catch (error) {
      console.error('Error saving city:', error);
      if (error.name === 'ValidationError') {
        throw new Error('Failed to create city: Validation error'); // Informative message
      } else {
        throw new Error('Failed to create city'); // Generic fallback
      }
    }
  },
};
