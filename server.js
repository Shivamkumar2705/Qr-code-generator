const express = require("express");
const qr = require("qr-image");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 3000;

// Set EJS as the template engine
app.set("view engine", "ejs");

// Middleware to serve static files like CSS
app.use(express.static(path.join(__dirname, "public")));

// Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded({ extended: true }));

// Route: Serve the homepage with a form
app.get("/", (req, res) => {
  res.render("index", { qrImageUrl: null, error: null });
});

// Route: Generate the QR code
app.post("/generate", (req, res) => {
  const url = req.body.url;
  
  if (!url) {
    return res.render("index", { qrImageUrl: null, error: "Please enter a valid URL." });
  }

  // Generate QR code and store it as PNG
  const qrImage = qr.imageSync(url, { type: 'png' });
  const qrImageUrl = `data:image/png;base64,${qrImage.toString('base64')}`;

  // Render the same page with the QR code
  res.render("index", { qrImageUrl, error: null });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
