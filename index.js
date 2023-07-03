const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const RegisterRoute = require("./server/routes/register.route");
const CategoryRoute = require("./server/routes/category.route");
const ProductRoute = require("./server/routes/product.route");

const cookieparser = require("cookie-parser");

const app = express();
app.use(express.json());
app.use(cookieparser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(express.static("public"));

app.use("/api", RegisterRoute);
app.use("/api", CategoryRoute);
app.use("/api", ProductRoute);

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1/ShoppingCart", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("database connected...");
  } catch (error) {
    console.log(error);
  }
};
connectDB();

app.listen(3004, "localhost", () => {
  console.log("server started on port 3004");
});
