const exp = require("constants");
const cors = require('cors');
const express = require("express");
const multer = require("multer");
const nodemailer = require("nodemailer");

// app object
const app = express();
// Enable CORS for all routes
app.use(cors());
const upload = multer({ dest: "uploads/" });

// handle file upload & send mail
app.post("/upload", upload.array("files"), (req, res) => {
  // get the uploaded files from req.files array
  const files = req.files;

  // create the nodemailer transporter'
  const transporter = nodemailer.createTransport({
    service: "hotmail",
    auth: {
      user: "subrato@infocusin.com",
      pass: "Bg34@huh!!",
    },
  });

  // configure the mail options
  const mailOptions = {
    from: "subrato@infocusin.com",
    to: [
        // "sonika@infocusin.com",
        "ritesh@infocusin.com",
        "surojit@infocusin.com",
        "sudip@infocusin.com"
    ],
    subject: "Uploaded Files",
    text: "Please find the attached files.",
    attachments: files.map((file) => ({
      filename: file.originalname,
      path: file.path,
    })),
  };

  // send the mail
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log("Error sending email:", error);
      res.status(500).send({message:"Error sending email !!!"});
    } else {
      console.log("Email sent:", info.response);
      res.status(200).send({message:"Email sent Succesfully !!!"});
    }
  });
});

// server
app.listen(5000, () => {
  console.log("Server started on port no 5000");
});
