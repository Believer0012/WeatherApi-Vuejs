// sendEmail.js

const cron = require('node-cron');
const {User} = require('./modals/user');
const {City} = require('./modals/City');
const axios = require('axios');
const nodemailer = require('nodemailer');

// Function to fetch weather data for a city
async function fetchWeather(city) {
    try {
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city.city}&appid=58ba60077a0c583eb45643384021a8bf`);
        return response.data;
    } catch (error) {
        console.error('Error fetching weather data:', error);
        throw new Error('Error fetching weather data');
    }
}

// Function to send email
async function sendEmail(to, subject, body) {
    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: '', // Replace with your Gmail email
                pass: '' // Replace with your Gmail password
            }
        });

        const mailOptions = {
            from: 'joeljonahsz@gmail.com', // Sender address
            to, // Recipient address
            subject, // Subject line
            html: body // HTML body
        };

        await transporter.sendMail(mailOptions);
        console.log('Email sent successfully');
    } catch (error) {
        console.error('Error sending email:', error);
        throw new Error('Error sending email');
    }
}

// Function to schedule emails
function scheduleEmails() {
    cron.schedule('0 12 * * *', async () => { // Send emails every day at 12 PM except on Sundays (day 0)
        try {
            // Fetch all users
            const users = await User.find();

            // Iterate over each user
            for (const user of users) {
                // Fetch cities associated with the user
                const cities = await City.find({ userId: user._id });

                // Iterate over each city
                for (const city of cities) {
                    // Fetch weather data for the city
                    const weatherData = await fetchWeather(city);

                    // Prepare email content
                    const emailSubject = `Weather Update for ${city.city}`;
                    const emailBody = `<p>${city.city} weather: ${weatherData.weather[0].description}</p>`;

                    // Send email to user
                    await sendEmail(user.email, emailSubject, emailBody);
                }
            }
        } catch (error) {
            console.error('Error sending emails:', error);
        }
    }, {
        timezone: 'Asia/Kolkata' // Replace with your timezone (e.g., 'Asia/Kolkata')
    });
}

module.exports = {
    scheduleEmails
};
