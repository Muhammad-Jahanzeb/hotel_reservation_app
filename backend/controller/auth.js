const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

//register user
const registerUser = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });

    if (user) {
      res.json("This user already exists!").status(200);
    } else {
      const { password } = req.body;

      hashedPassword = await bcrypt.hash(password, 10);

      req.body.password = hashedPassword;

      const newUser = new User(req.body);
      const savedUser = newUser.save();

      res.json("User successfully created!").status(200);
    }
  } catch (err) {
    res.json(`There was an error: ${err}`).status(500);
  }
};

//login user
const loginUser = async (req, res) => {
  //incorrect username
  const user = await User.findOne({ email: req.body.username });
  if (!user) {
    res.json("No such user exists!").status(200);
  }
  //incorrect pwd
  else {
    const checkPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (checkPassword) {
      const { password, _id, isAdmin, ...otherDetails } = user._doc;
      const token = jwt.sign({ id: _id, isAdmin: isAdmin }, process.env.JWT);
      console.log(otherDetails);
      res
        .cookie("access_token", token, {
          httpOnly: true,
        })
        .json(otherDetails)
        .status(200);
    } else {
      res.json("Incorrect password!");
    }
  }
};

module.exports = { registerUser, loginUser };
