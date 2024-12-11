require('dotenv').config();
// Step 1: Require the Express module
const express = require('express');
const mongoose = require('mongoose');
const { Pool } = require('pg'); // For PostgreSQL
// Step 2: Require the cors module
const cors = require('cors');
// Step 3: Create an instance of Express
const app = express();

// Step 4: Set up the body-parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());
// Step 6: Set up a basic route
app.get('/', (req, res) => {
  res.send('Hello, world!');
});

// Step 7: Start the server
const PORT = process.env.PORT || 3000;

// Check mongoose connection
mongoose.connect('mongodb://localhost:27017/intervention-builder', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
    }).then(() => {
    console.log('Connected to MongoDB');
    }).catch((error) => {
    console.log('Error connecting to MongoDB:', error.message);
});
// Create a global client for MongoDB
global.mongoClient = mongoose.connection;


// check pgsql connection
const pgClient = new Pool({
  user: 'angaza',
  host: 'localhost',
  database: 'intervention_builder',
  password: 'angaza',
  port: 5432,
});

// Create a global client for PostgreSQL
global.pgClient = pgClient;

// Declare routes
const userRoutes = require('./src/routes/user.routes');
app.use('/users', userRoutes);
const quizRoutes = require('./src/routes/quiz.routes');
app.use('/quizzes', quizRoutes);
const taggingRoutes = require('./src/routes/tagging.routes');
app.use('/tagging', taggingRoutes);
// const activityRoutes = require('./src/routes/activity.routes');
// app.use('/activities', activityRoutes);
// const lessonPlanRoutes = require('./src/routes/lesson-plan.routes');
// app.use('/lesson-plans', lessonPlanRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});