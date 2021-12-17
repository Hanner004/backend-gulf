const { validationResult } = require("express-validator");
const User = require("./models/User");
const { hash } = require("../../exports/shared/encryptPassword");
const { ext } = require("../../exports/shared/role");

exports.createUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  } else {
    const { email, password, role } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        errors: [{ msg: "El usuario se encuentra registrado" }],
      });
    } else {
      const newUser = new User(req.body);
      newUser.password = await hash(password);
      newUser.role = role;
      await newUser.save();
      return res.status(201).json({
        msg: "Usuario registrado",
        data: newUser,
      });
    }
  }
};

exports.getUsers = async (req, res) => {
  const users = await User.find();
  return res.status(200).json({
    msg: "Usuarios",
    data: users,
  });
};

exports.getUser = async (req, res) => {
  try {
    const { idUser } = req.params;
    const user = await User.findById({ _id: idUser });
    if (user) {
      return res.status(200).json({
        msg: "Usuario",
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

exports.updateUser = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    } else {
      const { idUser } = req.params;
      const user = await User.findById({ _id: idUser });
      if (user) {
        await User.updateOne({ _id: idUser }, { $set: req.body });
        return res.status(200).json({
          msg: "Datos actualizado",
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

exports.removeUser = async (req, res) => {
  try {
    const { idUser } = req.params;
    const user = await User.findById({ _id: idUser });
    if (user) {
      await User.deleteOne({ _id: idUser });
      return res.status(200).json({
        msg: "Usuario eliminado",
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

exports.statusUser = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    } else {
      const { idUser } = req.params;
      const { status } = req.body;
      const user = await User.findById({ _id: idUser });
      if (user && user.role === ext) {
        await User.updateOne(user, { $set: { status } });
        switch (status) {
          case true:
            return res.status(200).json({ msg: "Usuario activado" });
          case false:
            return res.status(200).json({ msg: "Usuario desactivado" });
        }
      } else {
        return res.status(404).json({
          errors: [
            {
              msg: "El usuario no se encuentra registrado o no tiene el rol de usuario externo",
            },
          ],
        });
      }
    }
  } catch (error) {
    return res.status(400).json({
      errors: [{ msg: "El parametro _id es inválido" }],
    });
  }
};

exports.rechargeUser = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    } else {
      const { idUser } = req.params;
      const user = await User.findById({ _id: idUser });
      if (user) {
        await User.findByIdAndUpdate(
          { _id: idUser },
          {
            $set: {
              "wallet.money": req.body.money,
            },
          }
        );
        user.wallet.history.push({
          action: "Recarga de saldo",
          value: req.body.money,
          date: new Date(),
        });
        await user.save();
        return res.status(200).json({
          msg: "La recarga de saldo se realizó correctamente",
        });
      } else {
        return res.status(404).json({
          errors: [{ msg: "El usuario no se encuentra registrado" }],
        });
      }
    }
  } catch (error) {
    console.log(error)
    return res.status(400).json({
      errors: [{ msg: "El parametro _id es inválido" }],
    });
  }
};
