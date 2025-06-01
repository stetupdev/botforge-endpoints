import express from "express";

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON body
app.use(express.json());

app.post("/vibex-webhook", (req, res) => {
  console.log("Received webhook payload:", req.body);

  // TODO: Add your VibeX webhook processing logic here

  res.status(200).json({ message: "Webhook received" });
});

app.get("/", (req, res) => {
  res.send("VibeX webhook server is running.");
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
