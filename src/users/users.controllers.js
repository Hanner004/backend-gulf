const { validationResult } = require("express-validator");
const { hash } = require("../exports/shared/encryptPassword");
const User = require("./models/User");

exports.create = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  } else {
    const { email, password, role } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      //consultar status code
      return res.status(400).json({
        errors: [{ msg: "El usuario se encuentra registrado" }],
      });
    } else {
      const newUser = new User(req.body);
      newUser.password = await hash(password);
      newUser.role = role;
      await newUser.save();
      return res.status(201).json({ data: newUser });
    }
  }
};

exports.findAll = async (req, res) => {
  const users = await User.find();
  return res.status(200).json({ data: users });
};

exports.findOne = async (req, res) => {
  try {
    const { _id } = req.params;
    const user = await User.findById({ _id });
    if (user) {
      return res.status(200).json({
        data: user,
      });
    } else {
      return res.status(404).json({
        errors: [{ msg: "El usuario no se encuentra registrado" }],
      });
    }
  } catch (error) {
    return res.status(400).json({
      errors: [{ msg: "El parametro _id es inválido" }],
    });
  }
};

exports.update = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    } else {
      const { _id } = req.params;
      const user = await User.findById({ _id });
      if (user) {
        await User.updateOne({ _id }, { $set: req.body });
        return res.status(200).json({
          msg: "Datos actualizados",
          data: req.body,
        });
      } else {
        return res.status(404).json({
          errors: [{ msg: "El usuario no se encuentra registrado" }],
        });
      }
    }
  } catch (error) {
    return res.status(400).json({
      errors: [{ msg: "El parametro _id es inválido" }],
    });
  }
};

exports.remove = async (req, res) => {
  try {
    const { _id } = req.params;
    const user = await User.findById({ _id });
    if (user) {
      await User.deleteOne({ _id });
      return res.status(200).json({
        msg: "Datos eliminados",
        data: user,
      });
    } else {
      return res.status(404).json({
        errors: [{ msg: "El usuario no se encuentra registrado" }],
      });
    }
  } catch (error) {
    return res.status(400).json({
      errors: [{ msg: "El parametro _id es inválido" }],
    });
  }
};
