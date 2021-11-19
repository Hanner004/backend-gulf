const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const { hash } = require("../exports/shared/encryptPassword");
const User = require("../users/models/User");

exports.register = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  } else {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      return res.status(200).json({
        message: "El usuario se encuentra registrado",
        data: user,
      });
    } else {
      const newUser = new User(req.body);
      newUser.password = await hash(req.body.password);
      await newUser.save();
      return res.status(201).json(newUser);
    }
  }
};

exports.login = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  } else {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      let validatePassword = await bcrypt.compare(
        req.body.password,
        user.password
      );
      if (validatePassword) {
        return res.status(200).json({
          message: `Bienvenido ${user.name} ${user.lastname}`,
          data: user,
        });
      } else {
        return res.status(400).json({
          message: "Contraseña incorrecta",
        });
      }
    } else {
      return res.status(404).json({
        message: "El usuario no se encuentra registrado",
      });
    }
  }
};
