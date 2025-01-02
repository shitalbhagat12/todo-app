import React, { useState } from "react";
import emailjs from "emailjs-com";

const EmailModal = ({ closeModal, addTaskWithEmailMessage }) => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSendEmail = (e) => {
    e.preventDefault();

    if (!message.trim()) {
      alert("Please enter a message.");
      return;
    }

    const templateParams = {
      to_email: email,
      message: message,
    };

    emailjs
      .send("service_t36orxk", "template_2l37mkr", templateParams, "nOhUxmBbdjyfwfIqw")
      .then((response) => {
        // Use window.confirm() instead of window.alert()
        const isConfirmed = window.confirm(
          "Email sent successfully! Click 'OK' to add the task."
        );
        if (isConfirmed) {
          addTaskWithEmailMessage(email); // Add the task when 'OK' is clicked
          closeModal(); // Close the modal after the task is added
        }
      })
      .catch((error) => {
        alert("Error sending email.");
      });
  };

  return (
    <div className="email-modal">
      <form onSubmit={handleSendEmail}>
        <input
          type="email"
          placeholder="Enter recipient's email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <textarea
          placeholder="Write your message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button type="submit">Send</button>
        <button type="button" onClick={closeModal}>
          Cancel
        </button>
      </form>
    </div>
  );
};

export default EmailModal;
