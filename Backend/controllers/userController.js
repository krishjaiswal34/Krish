const userModel=require('../models/userModel')

exports.registerUser=async (req, res) => {
    const { userAuthId } = req.body;
    console.log("userAuthId::", userAuthId);
    try {
      const user = await userModel
        .create({ userAuthId: userAuthId })
        .then((user) => {
          console.log("user created :", user);
          return res.json("User created");
        })
        .catch((err) => {
          console.log("error creating user", err);
          return res.json("error creating user", err);
        });
    } catch (error) {
      console.log("Server error");
      return res.json("Server error");
    }
  }