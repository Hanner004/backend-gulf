const { validationResult } = require("express-validator");
const User = require("../users/models/User");
const Vehicle = require("./models/Vehicle");

exports.createVehicle = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    } else {
      const { idUser } = req.params;
      const user = await User.findById({ _id: idUser });
      if (user) {
        const vehicle = await Vehicle.findOne({ placa: req.body.placa });
        if (vehicle) {
          return res.status(400).json({
            errors: [{ msg: "El vehículo se encuentra registrado" }],
          });
        } else {
          const newVehicle = new Vehicle(req.body);
          await newVehicle.save();
          user.vehicles_id.push(newVehicle._id);
          await user.save();
          return res.status(201).json({
            msg: "Vehículo registrado",
            data: newVehicle,
          });
        }
      } else {
        return res.status(404).json({
          errors: [{ msg: "El usuario no se encuentra registrado" }],
        });
      }
    }
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      errors: [{ msg: "El parametro _id es inválido" }],
    });
  }
};

exports.getVehicles = async (req, res) => {
  try {
    const { idUser } = req.params;
    const user = await User.findById({ _id: idUser });
    if (user) {
      const vehicles = await Vehicle.find({
        _id: { $in: user["vehicles_id"] },
      });
      return res.status(200).json({
        msg: "Vehículos de " + user.name,
        data: vehicles,
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

exports.updateVehicle = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    } else {
      const { idUser, idVehicle } = req.params;
      const {placa} = req.body
      const user = await User.findById({ _id: idUser });
      if (user) {
        const vehicle = await Vehicle.findById({ _id: idVehicle });
        if (vehicle) {
          const valVehicle = await Vehicle.findOne({ placa });
          if (vehicle.placa != placa && valVehicle) {
            return res.status(400).json({
              errors: [{ msg: "El vehículo se encuentra registrado" }],
            });
          } else {
            await Vehicle.updateOne({ _id: idVehicle }, { $set: req.body });
            return res.status(200).json({
              msg: "Datos de vehículo actualizados",
              data: req.body,
            });
          }
        } else {
          return res.status(404).json({
            errors: [{ msg: "El vehículo no se encuentra registrado" }],
          });
        }
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

exports.removeVehicle = async (req, res) => {
  try {
    const { idUser, idVehicle } = req.params;
    const user = await User.findById({ _id: idUser });
    if (user) {
      const vehicle = await Vehicle.findById({ _id: idVehicle });
      if (vehicle) {
        const index = user.vehicles_id.findIndex(
          (element) => element._id == idVehicle
        );
        user.vehicles_id.splice(index, 1);
        await user.save();
        await Vehicle.deleteOne({ _id: idVehicle });
        return res.status(200).json({
          msg: "Vehículo eliminado",
          data: vehicle,
        });
      } else {
        return res.status(404).json({
          errors: [{ msg: "El vehículo no se encuentra registrado" }],
        });
      }
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
