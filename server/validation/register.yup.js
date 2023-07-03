const yup = require("yup")


const RegisterValidation = yup.object({
  name: yup.string().min(2 , "Name must have atleast 2 characters").required("Please enter Your name"),
  email: yup.string().email("Please enter a valid email").required("Please enter Your email"),
  password: yup.string().min(6 , "Password must have atleast 6 characters").required("Please enter Your password"),
  confirmPassword: yup.string().oneOf([yup.ref("password"), null], "Passwords must match"),
  phone: yup.string().min(10 , "Phone number must have atleast 10 characters").required("Please enter Your phone number"),

})

module.exports = RegisterValidation