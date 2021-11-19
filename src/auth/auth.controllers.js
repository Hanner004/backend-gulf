const { validationResult } = require("express-validator");
const User = require("../users/models/User");

exports.register = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  } else {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      res.status(200).json({
        message: "El usuario se encuentra registrado",
        data: user,
      });
    } else {
      const newUser = new User(req.body);
      await newUser.save();
      res.status(201).json(newUser);
    }
  }
};

exports.login = async (req, res) => {};
