import bcrypt from "bcryptjs";

import { User } from "../models/user.js";

export const signup = async (req, res, next) => {
  const username = req.body.username;
  const email = req.body.email;
  const name = req.body.name;
  const phoneNumber = req.body.phoneNumber;
  const password = req.body.password;
  try {
    const hashedPassword = await bcrypt.hash(password, 12);
    const user = new User({
      username: username,
      email: email,
      phoneNumber: phoneNumber,
      password: hashedPassword,
    });
    await user.save();
    return res.json({ message: "User added" });
  } catch (err) {
    console.log(err);
  }
};

export const login = async (req, res, next) => {
    const usernameEmail = req.body.usernameEmail;
    const password = req.body.password;
    try {
        const user = await User.findById({email: usernameEmail});
    } catch (err) {
        
    }
    const isEqual = await bcrypt.compare(password)
}
