const UserTicket = require("../models/UserTicket");
const User = require("../models/user");

module.exports = {
  // Find All Tickets
  findAll: function (req, res) {
    UserTicket.find()
      .then((items) => res.json(items))
      .catch((err) => console.log(err));
  },

  // Save Ticket
  save: function (req, res) {
    const { tixId, date, subject, description, status, userId } = req.body;
    if (!subject || !description) {
      return res.status(400).json({ msg: "Please enter all fields" });
    }

    const newTicket = new UserTicket({
      tixId,
      date,
      subject,
      description,
      status,
    });
    // console.log(newTicket);
    newTicket
      .save()
      .then(({ _id }) =>
        User.findByIdAndUpdate(
          { _id: userId },
          { $push: { tickets: _id } },
          { new: true }
        )
      )
      .then((data) => res.json(data))
      .catch((err) => console.log(err));
  },

  // Delete Ticket
  delete: function (req, res) {
    UserTicket.findByIdAndDelete(req.params.id)
      .then((items) => res.json({ success: true }))
      .catch((err) => console.log(res.status(404).json({ success: false })));
  },
};
