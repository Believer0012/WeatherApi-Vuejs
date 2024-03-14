// server.js

const express = require('express');
const mongoose = require('mongoose');
const { graphqlHTTP } = require('express-graphql');
const schema = require('./graphql/schema/schema'); // Assuming schema.js exists
const userSchema = require('./graphql/schema/userSchema')
const cityResolver = require('./graphql/resolver/resolvers');
const userResolver = require('./graphql/resolver/userResolver');

const cors = require('cors');

const app = express();

// Middleware for JSON parsing
app.use(express.json());
app.use(cors())

// Error handling middleware (optional but recommended)
app.use((err, req, res, next) => {
    console.error(err.stack); // Log errors for debugging
    res.status(500).json({ message: 'Internal server error' }); // Send generic error response
});

// Mongoose connection (assuming you have a database connection setup)
mongoose.connect('mongodb://0.0.0.0:27017/weatherapp', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB:', error.message);
        process.exit(1); // Exit the process on failure
    });

// GraphQL endpoint
app.use('/graphql', graphqlHTTP({
    schema,
    rootValue:cityResolver,
    graphiql: true, // Enable GraphiQL UI for interactive testing
}));


app.use('/user-graphql', graphqlHTTP({
    schema: userSchema,
    rootValue:userResolver,
    graphiql: true, // Enable GraphiQL UI for interactive testing
  }));


const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
