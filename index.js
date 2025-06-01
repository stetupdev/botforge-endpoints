import express from "express";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Set Content Security Policy header
app.use((req, res, next) => {
  res.setHeader(
    "Content-Security-Policy",
    "connect-src 'self' https://botforge-endpoints.onrender.com;"
  );
  next();
});

app.post("/vibex-webhook", (req, res) => {
  console.log("Received webhook ping:", req.body);
  res.status(200).json({ message: "Webhook received" });
});

app.get("/", (req, res) => {
  res.status(200).send("Botforge-Endpoints server is running.");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
