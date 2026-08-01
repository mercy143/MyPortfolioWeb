import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import nodemailer from "nodemailer";
import { readFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

const portfolioData = JSON.parse(
  readFileSync(join(__dirname, "data", "portfolio.json"), "utf-8")
);

app.use(cors());
app.use(express.json());

const EMAIL_USER = process.env.EMAIL_USER;
const EMAIL_PASS = process.env.EMAIL_PASS;

let transporter = null;
if (EMAIL_USER && EMAIL_PASS) {
  transporter = nodemailer.createTransport({
    service: "gmail",
    auth: { user: EMAIL_USER, pass: EMAIL_PASS },
  });
} else {
  console.warn("Email not configured: set EMAIL_USER and EMAIL_PASS in environment (.env for local). Contact will return error until configured.");
}

app.get("/api/portfolio", (_req, res) => {
  res.json(portfolioData);
});

app.post("/contact", async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ success: false, message: "All fields are required." });
  }

  if (!transporter) {
    console.error("Attempted to send email but transporter is not configured.");
    return res.status(500).json({ success: false, message: "Email service is not configured on the server. Please contact the site owner directly." });
  }

  try {
    await transporter.sendMail({
      from: email,
      to: process.env.EMAIL_USER,
      subject: `Portfolio Message from ${name}`,
      text: message,
    });

    res.status(200).json({ success: true, message: "Message sent successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Error sending message" });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Guash your Server is running on http://localhost:${PORT}`);
});
