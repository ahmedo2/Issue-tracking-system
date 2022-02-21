const express = require("express");
const mongoose = require("mongoose");
const config = require("config");
const methodOverride = require("method-override");
const app = express();

const routes = require("./routes");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

const db = process.env.MONGO_URI;

// Connet to MongoDB
mongoose
  .connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => console.log(`MongoDB Connected`))
  .catch((err) => console.log(err));

const PORT = process.env.PORT || 8000;

app.use(routes);

app.listen(PORT, () => console.log(`Server running on Port ${PORT}`));
