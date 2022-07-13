const User = require("../models/userModel");
// usinh bcrypt for password 
const bcrypt = require("bcrypt");


module.exports.register = async (req, res, next) => {
    // chk this if u wanna see api is working fine or not 
  // console.log(req.body)
  try {
    const { username, email, password } = req.body;
    const usernameCheck = await User.findOne({ username });
    // checking userName is there or not 
    if (usernameCheck)
      return res.json({ msg: "Username already used", status: false });
      // checking email is there or not 
    const emailCheck = await User.findOne({ email });
    if (emailCheck)
      return res.json({ msg: "Email already used", status: false });
      // hashing password 
    const hashedPassword = await bcrypt.hash(password, 10);
     // using create api creating password 
    const user = await User.create({
      email,
      username,
      password: hashedPassword,
    });
    // delting user password for complete transprency 
    delete user.password;
    // returning user object as json 
    return res.json({ status: true, user });
  } catch (ex) {
    next(ex);
  }
};

