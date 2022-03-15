const router = require("express").Router();

// import controllers
const controller = require("../../controllers/ticketController");
const messageController = require("../../controllers/messageController");

// import upload middleware
const upload = require("../../middleware/upload");

// uses /api
// Tickets Routes
router.get("/tickets", controller.findAll);
router.post("/tickets", controller.save);
router.put("/ticket/update/:id", controller.updateStatus);
router.put("/ticket/comment/:id", controller.addComment);
router.put("/ticket/comment/new/:id", controller.newComment);
router.delete("/ticket/:id", controller.delete);

// uses /api
// Images Routes
router.get("/ticket/files", controller.findFiles);
router.get("/ticket/file/:filename", controller.findOneFile);
router.get("/ticket/image/:imagename", controller.findOneImage);
router.post(
  "/ticket/image/upload",
  upload.single("file"),
  controller.imageUpload
);
router.delete(
  "/ticket/image/:userid/:imagename",
  controller.deleteProfileImage
);

// uses /api
//  Images when submittin a new tix Routes
router.post(
  "/tickets/newimage/upload",
  upload.single("file"),
  controller.imageUploadNewTix
);
router.delete("/ticket/newimage/:imagename", controller.imageDeleteNewTix);

// uses api/
// User Messages Routes
router.get("/usermessage", messageController.getMessages);
router.post("/usermessage", messageController.postMessages);
router.put("/usermessage/:id", messageController.updateMessageStatus);

module.exports = router;
