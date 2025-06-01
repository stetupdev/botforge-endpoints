import express from "express";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.post("/vibex-webhook", (req, res) => {
  console.log("Received webhook ping:", req.body);
  res.status(200).json({ message: "Webhook received" });
});

app.get("/", (req, res) => {
  res.status(200).send("VibeX webhook server is up.");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
