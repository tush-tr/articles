const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const apiRouter = require("./routes/api");
const apiResponse = require("./helpers/apiResponse");
require('dotenv').config({ path: '.env.example' });

// Connect to DB
mongoose.connect(process.env.MONGODB_URL,
    { useNewUrlParser: true, useUnifiedTopology: true},
    () => console.log("Connected to DB")
);

const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use(express.static("./public")); // to expose uploaded images

// Route prefixes
app.use("/api", apiRouter);

// Throw 404 if URL not found
app.all("*", function(req, res) {
	return apiResponse.notFoundResponse(res, "Page not found");
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is running at port: ${PORT}`));