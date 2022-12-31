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

    const user = await userModel.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      const token = jwt.sign({ user_id: user._id }, process.env.JWT_SECRET, {
        expiresIn: '30d',
      });

      return res.json({ id: user._id, email: user.email, token: token });
    }

    res.status(400).send('Invalid Credentials');
  } catch (err) {
    console.error(err);
  }
});

module.exports = router;
