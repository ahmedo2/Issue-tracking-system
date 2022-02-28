const UserMessage = require("../models/UserMessage");

module.exports = {
  getMessages(req, res) {
    UserMessages.findAll()
      .then((data) => {
        res.json(data);
      })
      .catch((err) => console.log(err));
  },

  postMessages(req, res) {
    const { subject, description, userId } = req.body;

    if (!subject || !description) {
      return res.status(400).json({ msg: "Please enter all fields" });
    }

    const messageObj = new UserMessage({
      userId,
      subject,
      description,
    });
    console.log(messageObj);

    messageObj
      .save()
      .then((data) => {
        res.json(data);
      })
      .catch((err) => console.log(err));
  },
};
