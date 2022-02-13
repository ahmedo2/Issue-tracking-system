const User = require("../models/user");
const bcrypt = require("bcryptjs");
const config = require("config");
const jwt = require("jsonwebtoken");

module.exports = {
  // Register
  register: function (req, res) {
    const {
      firstName,
      lastName,
      email,
      password,
      address,
      address2,
      state,
      zip,
      phoneNumber,
      role,
    } = req.body;

    if (
      !firstName ||
      !lastName ||
      !email ||
      !password ||
      !address ||
      !state ||
      !zip ||
      !phoneNumber
    ) {
      return res.status(400).json({ msg: "Please enter all fields" });
    }

    var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    if (reg.test(email) == false) {
      return res.status(400).json({ msg: "Invalid Email Format" });
    }

    User.findOne({ email })
      .then((user) => {
        if (user)
          return res.status(400).json({ msg: "User already registered" });
        // Create New User
        const newUser = new User({
          firstName,
          lastName,
          email,
          address,
          address2,
          state,
          zip,
          phoneNumber,
          role,
        });
        // Generate the Hash for the password
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(password, salt, (err, hash) => {
            if (err) throw err;

            newUser.password = hash;
            // console.log(newUser);

            // Save the new user to the DB
            newUser.save().then((user) => {
              const {
                firstName,
                lastName,
                email,
                address,
                state,
                zip,
                phoneNumber,
                role,
              } = user;

              jwt.sign(
                { id: user.id },
                config.get("jwtSecret"),
                { expiresIn: 3600 },
                (err, token) => {
                  if (err) throw err;
                  res.json({
                    token,
                    user: {
                      id: user.id,
                      firstName,
                      lastName,
                      email,
                      address,
                      state,
                      zip,
                      phoneNumber,
                      role,
                    },
                  });
                }
              );
            });
          });
        });
      })
      .catch((err) => console.log(err));
  },

  // Login
  auth: function (req, res) {
    const { email, password, role } = req.body;
    // console.log(req.body);

    if (!email || !password || !role) {
      return res.status(400).json({ msg: "Please enter all fields" });
    }

    User.findOne({ email, role })
      .then((user) => {
        if (!user) return res.status(400).json({ msg: "User does not exist" });

        bcrypt.compare(password, user.password).then((isMatch) => {
          if (!isMatch)
            return res.status(400).json({ msg: "Password invalid" });
          jwt.sign(
            { id: user.id },
            config.get("jwtSecret"),
            { expiresIn: 3600 },
            (err, token) => {
              if (err) throw err;
              const { firstName, lastName, email, address, state, zip, phone } =
                user;
              res.json({
                token,
                user: {
                  _id: user.id,
                  firstName,
                  lastName,
                  email,
                  address,
                  state,
                  zip,
                  phone,
                },
              });
            }
          );
        });
      })
      .catch((err) => console.log(err));
  },

  // Get User Infos
  getUser: function (req, res) {
    User.findById(req.user.id)
      .select("-password")
      .populate("tickets")
      .then((user) => res.json(user))
      .catch((err) => console.log(res.status(404).json({ success: false })));
  },
};
