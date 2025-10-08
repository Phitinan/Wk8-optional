const Event = require("../models/eventModel");
const mongoose = require("mongoose");

//GET / event;
const getAllEvents = async (req, res) => {
  try {
    const events = await Event.find({}).sort({ createdAt: -1 });

    res.status(200).json(events);
  } catch {
    res.status(500).json({ message: "failed to get events" });
  }
};

const createEvent = async (req, res) => {

  try {
    // const user_id = req.user._id;
    const newEvent = new Event({
      ...req.body,
      // user_id,
    });
    await newEvent.save();
    res.status(201).json(newEvent);
  } catch (error) {
    console.error("Error creating event:", error);
    res.status(500).json({ error: "Server Error" });
  }
};

// GET /event/:eventId
const getEventById = async (req, res) => {
  const { eventId } = req.params

  if (!mongoose.Types.ObjectId.isValid(eventId)) {
    return res.status(404).json({ error: 'No such event' })
  }
  try {
    const event = await Event.findById(eventId)
    if (!event) {
      return res.status(404).json({ error: 'No such event' })
    }
    res.status(200).json(event)
  } catch (error) {
    res.status(500).json({ error: "can't get event" });
  }

};

// PUT /event/:eventId
const updateEvent = async (req, res) => {
  const { eventId } = req.params

  if (!mongoose.Types.ObjectId.isValid(eventId)) {
    return res.status(404).json({ error: 'No such event' })
  }

  const event = await Event.findOneAndUpdate({ _id: eventId }, {
    ...req.body
  }, { new: true, runValidators: true })

  if (!event) {
    return res.status(400).json({ error: 'No such event' })
  }

  res.status(200).json(event)
};

// DELETE /event/:eventId
const deleteEvent = async (req, res) => {
  const { eventId } = req.params

  if (!mongoose.Types.ObjectId.isValid(eventId)) {
    return res.status(404).json({ error: 'No such event' })
  }
  try {
    const event = await Event.findOneAndDelete({ _id: eventId })

    if (!event) {
      return res.status(400).json({ error: 'No such event' })
    }

    res.status(204).send();
  } catch (error) {
    console.error("Error deleting event:", error);
    res.status(500).json({ error: "Server Error" });
  }
};

module.exports = {
  getAllEvents,
  getEventById,
  createEvent,
  updateEvent,
  deleteEvent,
};
