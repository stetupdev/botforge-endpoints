import express from "express";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Enable CORS for all origins
app.use(cors());

// Add your Content Security Policy header middleware
app.use((req, res, next) => {
  res.setHeader(
    "Content-Security-Policy",
    "connect-src 'self' https://botforge-endpoints.onrender.com;"
  );
  next();
});

// Define the /vibex-webhook POST endpoint
app.post("/vibex-webhook", (req, res) => {
  console.log("Received webhook ping:", req.body);
  res.status(200).json({ message: "Webhook received" });
});

// Root endpoint for health checks
app.get("/", (req, res) => {
  res.status(200).send("Botforge-Endpoints server is running.");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
