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

const SMTP_HOST = process.env.SMTP_HOST;
const SMTP_PORT = Number(process.env.SMTP_PORT || 587);
const SMTP_SECURE = process.env.SMTP_SECURE === "true";
const SMTP_USER = process.env.SMTP_USER || process.env.EMAIL_USER;
const SMTP_PASS = process.env.SMTP_PASS || process.env.EMAIL_PASS;
const EMAIL_TO = process.env.EMAIL_TO || process.env.EMAIL_USER || "guashberhe2019@gmail.com";
const EMAIL_FROM = process.env.EMAIL_FROM || SMTP_USER || "portfolio@example.com";

let transporter = null;

if (SMTP_HOST && SMTP_USER && SMTP_PASS) {
  transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: SMTP_PORT,
    secure: SMTP_SECURE,
    auth: { user: SMTP_USER, pass: SMTP_PASS },
  });
} else if (SMTP_USER && SMTP_PASS) {
  transporter = nodemailer.createTransport({
    service: "gmail",
    auth: { user: SMTP_USER, pass: SMTP_PASS },
  });
} else {
  console.warn("Email not configured: set SMTP_USER/SMTP_PASS or EMAIL_USER/EMAIL_PASS in environment. The contact form will return an error until configured.");
}

app.get("/", (_req, res) => {
  res.status(200).json({
    ok: true,
    message: "API server is running. Use /health, /api/portfolio, or POST /contact.",
  });
});

app.get("/api/portfolio", (_req, res) => {
  res.json(portfolioData);
});

app.get("/health", (_req, res) => {
  res.status(200).json({ ok: true, message: "Backend is healthy" });
});

const handleContact = async (req, res) => {
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
      from: EMAIL_FROM,
      to: EMAIL_TO,
      replyTo: email,
      subject: `Portfolio Message from ${name}`,
      text: [
        `Name: ${name}`,
        `Email: ${email}`,
        "",
        message,
      ].join("\n"),
    });

    return res.status(200).json({ success: true, message: "Message sent successfully!" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Error sending message" });
  }
};

app.post("/contact", handleContact);
app.post("/api/contact", handleContact);

app.listen(PORT, () => {
  console.log(`✅ Guash your Server is running on http://localhost:${PORT}`);
});
