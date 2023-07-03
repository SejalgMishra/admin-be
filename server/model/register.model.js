const mongoose = require("mongoose");
const { Schema, model } = mongoose;


const RegisterSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  confirmPassword: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  token: {
    type: String
  }
});

// const RegisterSchema = new Schema(RegisterValidation.fields);

const Register = mongoose.model("register", RegisterSchema);

module.exports = Register;
