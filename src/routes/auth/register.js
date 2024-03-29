const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userModel = require('../../models/user');

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!(email && password)) {
      return res.status(400).json({ error: { text: 'All input is required' } });
    }

    const oldUser = await userModel.findOne({ email });

    if (oldUser) {
      return res.status(400).json({ error: { text: 'User already exist' } });
    }

    const encryptedPassword = await bcrypt.hash(password, 10);

    const user = await userModel.create({
      email: email.toLowerCase(),
      password: encryptedPassword,
    });

    const token = jwt.sign({ user_id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '30d',
    });

    res.json({ token });
  } catch (err) {
    console.error(err);
  }
});

module.exports = router;
