const RegisterSchema = require("../model/register.model");
const RegisterValidation = require("../validation/register.yup");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

class RegisterController {
  static getData = async (req, res) => {
    try {
      const getdata = await RegisterSchema.find({});
      res.json(getdata);
    } catch (error) {
      console.error(error);
      res.status(500).send("Server Error");
    }
  };

  static addData = async (req, res) => {
    const { name, email, password, confirmPassword, phone } = req.body;
    try {
      if (!name || !email || !password || !confirmPassword || !phone) {
        res.status(400).send("All fields are compulsory");
        return;
      }

      const exisistingUser = await RegisterSchema.findOne({ email });
      if (exisistingUser) {
        res.status(401).send("User already existed");
        return;
      }

      const myEnPassword = await bcrypt.hash(password, 10);

      if (password !== confirmPassword) {
        res.send("password are not same");
      } else {
        const validation = await RegisterValidation.validate({
          name,
          email,
          confirmPassword: myEnPassword,
          phone,
          password: myEnPassword,
        });
        console.log(validation);
        const newData = await RegisterSchema.create({
          name,
          email,
          confirmPassword: myEnPassword,
          phone,
          password: myEnPassword,
        });
        const token = jwt.sign(
          { id: newData._id, email },
          "shhh", //secret
          {
            expiresIn: "1h",
          }
        );

        newData.token = token;
        newData.password = undefined;
        newData.confirmPassword = undefined;

        res.json(newData);
        console.log(newData);
      }
    } catch (error) {
      console.error(error);
      res.status(500).send(error.message);
    }
  };

  static LoginData = async (req, res) => {
    const { email, password } = req.body;
    try {
      const LoginData = await RegisterSchema.findOne({ email });

      const myPassword = await bcrypt.compare(password, LoginData.password);

      if (!myPassword) {
        res.send("Invalid Password");
        return;
      }

      if (LoginData && myPassword) {
        const token = jwt.sign(
          { id: LoginData._id, email },
          "shhh", //secret
          {
            expiresIn: "1h",
          }
        );

        LoginData.token = token;

        const options = {
          expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
          httpOnly: true,
        };
        res.status(200).cookie("token", token, options).json({
          success: true,
          token,
          LoginData,
        });
      }
    } catch (error) {
      console.error(error);
      res.status(500).send("Server Error");
    }
  };

  static authUser = async (req, res) => {
    console.log(req.user);
    res.send("Welcome to Dashboard");
  };
  static logout = async (req, res) => {
    req.user.tokens = req.tokens.find((element) => {
      return element == !req.token;
    });
    res.clearcookie("jwt");
    console.log("logout successfully");
    await req.user.save();
    res.render("login");
  };
}

module.exports = RegisterController;
