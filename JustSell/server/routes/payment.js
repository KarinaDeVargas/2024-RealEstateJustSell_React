const express = require("express");
const app = express();
require("dotenv").config();
const router = express.Router();
const cors = require("cors");
app.use(express.json());
app.use(cors());
const { properties, payment, users } = require("../models");
const { validateToken } = require("../middleware/AuthMiddleware");
const Sequelize = require("sequelize");
const stripe = require("stripe")(process.env.STRIPE_KEY);
const { v4: uuidv4 } = require("uuid");

router.post("/", async (req, res) => {
  const { property, token } = req.body;
  const idempotencyKey = uuidv4();
  return stripe.customers
    .create({
      email: token.email,
      source: token.id,
    })
    .then((customer) => {
      stripe.charges.create(
        {
          amount: property.price,
          currency: "usd",
          customer: customer.id,
          receipt_email: token.email,
          description: "down payment",
        },
        { idempotencyKey }
      );
    })
    .then((result) => res.status(200).json(result))
    .catch((err) => console.log(err));
});
router.post("/payment", validateToken, async (req, res) => {
  try {
    const { propertyID } = req.body;

    await payment.create({
      userUserID: req.user.userID,
      propertiesPropertyID: propertyID,
    });

    res.json("SUCCESS");
  } catch (error) {
    console.error("Error creating payment:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
module.exports = router;
