import express from "express";
import nacl from "tweetnacl";

const app = express();
const PORT = process.env.PORT || 3000;

// Replace with your actual Discord public key (from the developer portal)
const DISCORD_PUBLIC_KEY = process.env.DISCORD_PUBLIC_KEY;

// Middleware to get raw body for signature verification
app.use(
  express.json({
    verify: (req, res, buf) => {
      req.rawBody = buf;
    },
  })
);

app.post("/vibex-webhook", (req, res) => {
  const signature = req.get("X-Signature-Ed25519");
  const timestamp = req.get("X-Signature-Timestamp");

  if (!verifyDiscordRequest(req.rawBody, signature, timestamp)) {
    return res.status(401).send("Invalid signature");
  }

  console.log("✅ Verified webhook payload:", req.body);

  // TODO: VibeX logic here

  res.status(200).json({ message: "Webhook received securely" });
});

app.get("/", (req, res) => {
  res.send("VibeX webhook server is running securely.");
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

// Verify function
function verifyDiscordRequest(rawBody, signature, timestamp) {
  if (!signature || !timestamp) return false;

  const isVerified = nacl.sign.detached.verify(
    Buffer.from(timestamp + rawBody),
    Buffer.from(signature, "hex"),
    Buffer.from(DISCORD_PUBLIC_KEY, "hex")
  );

  return isVerified;
}
