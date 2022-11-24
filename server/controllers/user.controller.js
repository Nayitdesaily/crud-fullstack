const { User } = require("../models/user.model");

const createUser = async (req, res) => {
  try {
    const { name, age, email } = req.body;

    const newUser = await User.create({ name, age, email });

    res.status(200).json({
      message: "User created",
      data: newUser,
    });
  } catch (error) {
    console.log(error);
  }
};

const getUsers = async (req, res) => {
  try {
    const users = await User.find({status: 'active'});

    res.status(200).json({
      data: users,
    });
  } catch (error) {
    console.log(error);
  }
};

const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findOne({ _id: id, status:'active' });

    res.status(200).json({
      data: user,
    });
  } catch (error) {
    console.log(error);
  }
};

const updateUser = async (req, res) => {
  try {
    const { name, email } = req.body;
    const { id } = req.params;
    const user = await User.findOne({ _id: id });

    if (!user) {
      return res.status(404).json({
        status: "User not found",
      });
    }

    await user.updateOne({ name, email });

    res.status(403).json({
      data: user,
    });
  } catch (error) {
    console.log(error);
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findOne({ _id: id });

    if (!user) {
      return res.status(404).json({
        status: "User not found",
      });
    }
    await user.updateOne({ status: "deleted" });

    res.status(203).json({
      message: 'succesfully'
    })
  } catch (error) {
    console.log(error);
  }
};

module.exports = { createUser, getUsers, getUser, updateUser, deleteUser };
