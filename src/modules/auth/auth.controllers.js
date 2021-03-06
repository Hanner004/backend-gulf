const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const signToken = require("../../exports/shared/signToken");
const User = require("../users/models/User");
const { hash } = require("../../exports/shared/encryptPassword");
const { ext } = require("../../exports/shared/role");

exports.register = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  } else {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        errors: [{ msg: "El usuario se encuentra registrado" }],
      });
    } else {
      const newUser = new User(req.body);
      newUser.password = await hash(password);
      newUser.role = ext;
      await newUser.save();
      return res.status(201).json({
        msg: "Usuario registrado",
        data: newUser,
      });
    }
  }
};

exports.login = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  } else {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      let validatePassword = await bcrypt.compare(password, user.password);
      if (validatePassword) {
        return res.status(200).json({
          msg: "Usuario conectado",
          data: user,
          token: await signToken(user._id),
        });
      } else {
        return res.status(400).json({
          errors: [{ msg: "Contraseña incorrecta" }],
        });
      }
    } else {
      return res.status(404).json({
        errors: [{ msg: "El usuario no se encuentra registrado" }],
      });
    }
  }
};
