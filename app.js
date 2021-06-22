const express = require("express");
const nodemailer = require("nodemailer");
const createError = require("http-errors");
const { auth, database } = require("./firebase/firebaseCredential");
const app = express();

app.use(express.json());
//cors set

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");

  res.header(
    "Access-Control-Allow-Headers",
    "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers,X-Access-Token,XKey,Authorization"
  );

  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE");
    return res.status(200).json({});
  }

  next();
});
let transport = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "noreply.kingdomexpo.org@gmail.com",
    pass: "kingdomexpo123",
  },
});
app.post("/mail", async (req, res, next) => {
  const { displayFromSideName, toEmail, body, subject, cc, bcc, poster } =
    req.body;
  if (toEmail.length < 1)
    throw createError.BadRequest("You have to enter sender email... ");
  //mail property

  //mail option
  const mailOption = {
    from: `${displayFromSideName} <foo@example.com>`,
    to: toEmail,
    subject: subject,
    text: body,
    cc,
    bcc,
    html: poster,
  };
  const send = await transport.sendMail(mailOption);
  //mail option end
  //mail end
  res.send({ data: send });
});
// send data base

//noreply.yardhotel@gmail.com
//8249832295

const yardHotelRegister = require("./module/register");
app.use("/yardHotel", yardHotelRegister);
app.use(async (req, res, next) => {
  next(createError.NotFound());
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.send({
    error: {
      status: err.status || 500,
      message: err.message,
    },
  });
});
app.listen(process.env.PORT || 2000, () => {
  console.log("The port 2000 is ready to start....");
});
