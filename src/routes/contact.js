const express = require('express')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const contactModel = require('../models/contact')

const router = express.Router()

router.post('/', async (req, res) => {
  try {
    const { email, subject, message } = req.body

    const contact = await contactModel.create({
      email: email.toLowerCase(),
      subject: subject,
      message: message,
    })

    return res.json({ threadId: contact.id })

  } catch (err) {
    console.error(err)
  }
})

module.exports = router
