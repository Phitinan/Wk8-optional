import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useField from "../hooks/useField";

const AddEventPage = () => {
  const title = useField("title");
  const date = useField("date");
  const location = useField("location");
  const name = useField("name");
  const contactEmail = useField("contactEmail");
  const contactPhone = useField("contactPhone");

  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));
  const token = user ? user.token : null;

  const addEvent = async (newEvent) => {
    try {
      console.log(newEvent)
      const res = await fetch("/api/events", {
        method: "POST",
        headers: {
          "Content-Type": "application/JSON",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newEvent),
      });
      if (!res.ok) {
        throw new Error("Failed to add event")
      }
    } catch (error) {
      console.error(error);
      return false;
    }
    return true;
  };

  const submitForm = async (e) => {
    e.preventDefault();

    const newEvent = {
      title:title.value,
      date:date.value,
      location:location.value,

      organizer: {
        name:name.value,
        contactEmail:contactEmail.value,
        contactPhone:contactPhone.value,
      }
    };

    const success = await addEvent(newEvent);
    if (success) {
      console.log("event added successfully");
      navigate("/");
    } else {
      console.error("Failed to add the event");
    }
  };

  return (
    <div className="create">
      <h2>Add a New Event</h2>
      <form onSubmit={submitForm}>
        <label>Event title:</label>
        <input
          type="text"
          required
          {...title}
        />
        <label>event date:</label>
        <input
          type="date"
          required
          {...date}
        />

        <label>location:</label>
        <textarea
          required
          {...location}

        ></textarea>
        <label>Organiszer name</label>
        <input
          type="text"
          required
          {...name}
        />
        <label>Organiszer email:</label>
        <input
          type="text"
          required
          {...contactEmail}
        /><label>Organiszer phone:</label>
        <input
          type="text"
          required
          {...contactPhone}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default AddEventPage;
