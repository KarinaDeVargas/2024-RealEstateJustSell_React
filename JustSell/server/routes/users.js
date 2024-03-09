const express = require("express");
const router = express.Router();
const { users } = require("../models");
const bcrypt = require("bcryptjs");
const { validateToken } = require("../middleware/AuthMiddleware");
const { sign } = require("jsonwebtoken");

router.get("/", async (req, res) => {
  try {
    const listOfUsers = await users.findAll();
    res.json(listOfUsers);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post("/", async (req, res) => {
  try {
    const {
      userName,
      password,
      email,
      firstName,
      lastName,
      Phone,
      streetNum,
      streetName,
      city,
      province,
      postal,
      company,
      role,
      isRealtorApproved,
      realtorCertification,
    } = req.body;

    const hash = await bcrypt.hash(password, 10);

    await users.create({
      userName,
      password: hash,
      email,
      firstName,
      lastName,
      Phone,
      streetNum,
      streetName,
      city,
      province,
      postal,
      company,
      role,
      isRealtorApproved,
      realtorCertification,
    });

    res.json("SUCCESS");
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/auth", validateToken, (req, res) => {
  res.json(req.user);
});

router.post("/login", async (req, res) => {
  const { userName, password } = req.body;

  try {
    const user = await users.findOne({ where: { userName: userName } });

    if (!user) {
      return res.json({ error: "User Doesn't Exist" });
    }

    bcrypt.compare(password, user.password).then(async (match) => {
      if (!match) {
        return res.json({ error: "Wrong Username And Password Combination" });
      }

      const accessToken = sign(
        { userName: user.userName, userID: user.userID, role: user.role },
        "importantsecret"
      );

      res.json({
        token: accessToken,
        userName: userName,
        userID: user.userID,
        role: user.role,
      });
    });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.delete("/:userID", async (req, res) => {
  const userID = req.params.userID;

  try {
    await users.destroy({
      where: {
        userID: userID,
      },
    });

    res.json({ success: true, message: "User deleted successfully" });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/:id", async (req, res) => {
  const userID = req.params.id;

  try {
    const user = await users.findByPk(userID);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(user);
  } catch (error) {
    console.error("Error fetching user by ID:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.put("/:id", async (req, res) => {
  const userID = req.params.id;
  const updatedUserData = req.body;

  try {
    const user = await users.findByPk(userID);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    await user.update(updatedUserData);

    res.json(user);
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/auth", validateToken, (req, res) => {
  res.json(req.user);
});

module.exports = router;
