const express = require("express");
require('dotenv').config();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const cors = require("cors");
const app = express();

// Bodyparser middleware
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(bodyParser.json());

// DB Config
const dbhost = process.env.DB_HOST;

// Connect to MongoDB
mongoose
  .connect(
    dbhost,
    { 
      useNewUrlParser: true,
      useUnifiedTopology: true,
      auth:{
        user: process.env.DB_USER,
        password: process.env.DB_PASS
      }
    }
  )
  .then(() => console.log("MongoDB successfully connected"))
  .catch(err => console.log(err));

// Passport middleware
app.use(passport.initialize());

// Passport config
require("./config/passport")(passport);

// cors config
app.use(cors());
// Routes
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/user', require('./routes/api/users'));
app.use('/api/scenario', require('./routes/api/scenario'));
app.use('/api/inspection', require('./routes/api/inspection'));
app.use('/api/driverId', require('./routes/api/driverId'));
app.use('/api/licensePlate', require('./routes/api/licensePlate'));

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server up and running on port ${port} !`));
