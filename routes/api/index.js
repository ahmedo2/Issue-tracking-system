const router = require("express").Router();

// import controllers
const controller = require('../../controllers/usersController');

// uses /api

// @route GET api/somthing
// @desc Get All Items
// @access Public

router.get("/items", controller.findAll);
router.post("/items", controller.save);
router.delete("/items/:id", controller.delete);

module.exports = router; 