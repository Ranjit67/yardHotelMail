const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");
const { auth, database } = require("../firebase/firebaseCredential");
const createError = require("http-errors");

const userDataSave = async (data, uid) => {
  const dbRef = `hotelsData/${uid}`;
  data.ownerInfo.uid = uid;
  await database.ref(dbRef).set(data);
  return 1;
};

router.post("/register", async (req, res, next) => {
  try {
    const hotelObject = req.body;

    const email = hotelObject?.ownerInfo?.email;
    const password = hotelObject?.ownerInfo?.password;

    if (!email || !password)
      throw createError.BadRequest("Email and password is important...");
    const response = await auth.createUserWithEmailAndPassword(email, password);
    // const hotelObject = {
    //   about,
    //   features,
    //   ownerInfo,
    //   location,
    //   roomTypes,
    //   photos,
    // };
    const userInsert = await userDataSave(hotelObject, response.user.uid);
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "noreply.yardhotel.in@gmail.com",
        pass: "8825163537",
      },
    });
    const mailOption = {
      from: `noreply.yardhotel@gmail.com`,
      to: email,
      subject: "Thank you for register on Yard Hotel",
      html: `<p>Yor register successfully please touch with chanel manager,</p><br></p> And log in with Following password</p><br><h4>${password}</h4>`,
    };
    await transporter.sendMail(mailOption);

    if (!userInsert) throw createError.GatewayTimeout("Data are not save...");

    res.json({ data: "Data save successfully..." });
  } catch (error) {
    next(error);
  }
});
module.exports = router;
