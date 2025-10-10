
import React, { useRef, useState, useEffect } from "react";
import emailjs from "@emailjs/browser";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [status, setStatus] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [feedbackOpen, setFeedbackOpen] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [feedbackStatus, setFeedbackStatus] = useState("");
  const feedbackRef = useRef(null);

  // Autofocus feedback textarea
  useEffect(() => {
    if (feedbackOpen) feedbackRef.current?.focus();
  }, [feedbackOpen]);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;

    if (!formData.name || !formData.email || !formData.message) {
      setStatus("⚠️ Please fill all required fields.");
      return;
    }

    // Optional: Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setStatus("⚠️ Invalid email format.");
      return;
    }

    setIsSubmitting(true);
    setStatus("Sending...");

    const templateParams = {
      from_name: formData.name,
      from_email: formData.email,
      phone: formData.phone,
      message: formData.message,
    };

    try {
      await emailjs.send(
        "service_abc123",
        "template_6q2szc8",
        templateParams,
        "noigK-fejzo60tBgW"
      );
      setStatus("✅ Message sent successfully!");
      setFormData({ name: "", email: "", phone: "", message: "" });
    } catch (error) {
      console.error(error);
      setStatus("❌ Failed to send message. Try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFeedbackSubmit = async (e) => {
    e.preventDefault();
    if (feedback.trim() === "") {
      alert("Feedback cannot be empty.");
      return;
    }

    try {
      // Simulate async API call
      await new Promise((resolve) => setTimeout(resolve, 500));
      setFeedbackStatus("✅ Feedback submitted successfully!");
      setFeedback("");
      setFeedbackOpen(false);
    } catch {
      setFeedbackStatus("❌ Error submitting feedback.");
    }
  };

  const handleCancelFeedback = () => {
    if (feedback.trim() !== "") {
      const confirmCancel = window.confirm(
        "Are you sure you want to cancel? Your feedback will be lost."
      );
      if (!confirmCancel) return;
    }
    setFeedbackOpen(false);
    setFeedback("");
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) handleCancelFeedback();
  };

  return (
    <div className="relative p-6 max-w-lg mx-auto">
      <div className="absolute inset-0 -z-10 rounded-3xl bg-gradient-to-br from-pink-200 via-purple-200 to-pink-100 animate-pulse opacity-30 blur-3xl"></div>

      <div className="relative z-10 bg-white rounded-3xl shadow-xl p-8 flex flex-col gap-6 hover:shadow-pink-400/50 transition-shadow duration-500">
        <h2 className="text-3xl font-bold text-center text-gray-900">Contact Me</h2>

        {/* Contact Info */}
        <div className="flex flex-col gap-3 mb-4 text-gray-700">
          {/* Location */}
          <div className="flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5 text-green-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 11c1.104 0 2-.896 2-2s-.896-2-2-2-2 .896-2 2 .896 2 2 2z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 22s8-4.5 8-10c0-4.418-3.582-8-8-8s-8 3.582-8 8c0 5.5 8 10 8 10z"
              />
            </svg>
            <a
              href="https://www.google.com/maps?q=MoR"
              target="_blank"
              rel="noreferrer"
              className="hover:text-green-600 transition"
            >
              Location: Ministry of Revenue Ethiopia
            </a>
          </div>

          {/* Email */}
          <div className="flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5 text-green-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
            <a
              href="mailto:guashberhe2019@gmail.com"
              className="hover:text-green-600 transition"
            >
              Email: guashberhe2019@gmail.com
            </a>
          </div>

          {/* Phone */}
          <div className="flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5 text-green-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.019 3.056a1 1 0 01-.216 1.03L8.414 9.414a16.011 16.011 0 007.172 7.172l1.654-1.654a1 1 0 011.03-.216l3.056 1.019a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C7.373 21 3 16.627 3 11V5z"
              />
            </svg>
            <a
              href="tel:+251932330844"
              className="hover:text-green-600 transition"
            >
              Phone: +251932330844
            </a>
          </div>
        </div>

        {/* Contact Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            name="name"
            placeholder="Your Full Name"
            value={formData.name}
            onChange={handleChange}
            className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 transition"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
            className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 transition"
            required
          />
          <input
            type="text"
            name="phone"
            placeholder="Your Phone Number"
            value={formData.phone}
            onChange={handleChange}
            className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 transition"
          />
          <textarea
            name="message"
            placeholder="Your Message"
            value={formData.message}
            onChange={handleChange}
            rows="4"
            className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 transition"
            required
          />
          <button
            type="submit"
            disabled={isSubmitting}
            className={`bg-gradient-to-r from-green-500 to-green-600 text-white p-3 rounded-lg font-semibold transition transform hover:scale-105 hover:shadow-lg ${
              isSubmitting ? "opacity-50 cursor-not-allowed" : "hover:from-green-600 hover:to-green-500"
            }`}
          >
            {isSubmitting ? "Sending..." : "Send Message"}
          </button>
        </form>

        {status && (
          <p
            className={`text-center font-medium ${
              status.includes("✅")
                ? "text-green-600"
                : status.includes("❌")
                ? "text-red-600"
                : "text-yellow-600"
            }`}
          >
            {status}
          </p>
        )}

        {/* Feedback Button */}
        <button
          onClick={() => setFeedbackOpen(true)}
          className="bg-pink-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-pink-600 transition transform hover:scale-105 self-center"
        >
          Give Feedback
        </button>

        {/* Feedback Modal */}
        {feedbackOpen && (
          <div
            className="fixed inset-0 flex items-end justify-center z-50 bg-black/40"
            onClick={handleOverlayClick}
          >
            <div className="bg-white rounded-t-3xl p-6 w-full max-w-md shadow-lg relative transform transition-transform duration-500 animate-slide-up">
              <h3 className="text-xl font-bold mb-4 text-gray-900">Your Feedback</h3>
              <textarea
                ref={feedbackRef}
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                placeholder="Write your feedback..."
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400 transition mb-4"
                rows="5"
              />
              <div className="flex justify-end gap-3">
                <button
                  onClick={handleCancelFeedback}
                  className="px-4 py-2 rounded-lg bg-gray-300 hover:bg-gray-400 transition"
                >
                  Cancel
                </button>
                <button
                  onClick={handleFeedbackSubmit}
                  className="px-4 py-2 rounded-lg bg-pink-500 text-white hover:bg-pink-600 transition"
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        )}

        {feedbackStatus && (
          <p
            className={`text-center font-medium ${
              feedbackStatus.includes("✅")
                ? "text-green-600"
                : feedbackStatus.includes("❌")
                ? "text-red-600"
                : "text-yellow-600"
            }`}
          >
            {feedbackStatus}
          </p>
        )}
      </div>

      <style>
        {`
          @keyframes slide-up {
            0% { transform: translateY(100%); }
            100% { transform: translateY(0); }
          }
          .animate-slide-up {
            animation: slide-up 0.35s cubic-bezier(0.25, 0.8, 0.25, 1) forwards;
          }
        `}
      </style>
    </div>
  );
}
