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

module.exports.login = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user)
      return res.json({ msg: "Incorrect Username or Password", status: false });

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid)
      return res.json({ msg: "Incorrect Username or Password", status: false });
    delete user.password;
    return res.json({ status: true, user });
  } catch (ex) {
    next(ex);
  }
};

module.exports.setAvatar = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const avatarImage = req.body.image;
    const userData = await User.findByIdAndUpdate(
      userId,
      {
        isAvatarImageSet: true,
        avatarImage,
      },
      { new: true }
    );
    return res.json({
      isSet: userData.isAvatarImageSet,
      image: userData.avatarImage,
    });
  } catch (ex) {
    next(ex);
  }
};

module.exports.getAllUsers = async (req, res, next) => {
  try {
    // Here we are giving a queary such that it is looking all the users except _id not equals out user ID
    const users = await User.find({ _id: { $ne: req.params.id } }).select([
      "email",
      "username",
      "avatarImage",
      "_id",
    ]);
    return res.json(users);
  } catch (ex) {
    next(ex);
  }
};


