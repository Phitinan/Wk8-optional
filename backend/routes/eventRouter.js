const express = require("express");
const {
  getAllEvents,
  getEventById,
  createEvent,
  updateEvent,
  deleteEvent,
} = require("../controllers/eventControllers");

const { Auth } = require("./middleware/requireAuth");

const router = express.Router();

router.get("/", getAllEvents);
router.post("/", createEvent);

router.use(Auth);

router.get("/:eventId", getEventById);
router.put("/:eventId", updateEvent);
router.delete("/:eventId", deleteEvent);

module.exports = router;
