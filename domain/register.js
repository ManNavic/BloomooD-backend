// const express = require('express')
const bcrypt = require('bcrypt')
const { passwordValidation } = require('../utils/passwordValidation')
const { emailValidation } = require('../utils/emailValidation')
const User = require('../models/user')
const saltRounds = 10

const createUser = async (req, res) => {
  const {
    email,
    password,
    firstName,
    lastName,
    street,
    houseNumber,
    city,
    country,
    postCode
  } = req.body

  if (!passwordValidation(password)) {
    return res.status(400).json({ message: 'bad password' })
  }
  if (!emailValidation(email)) {
    return res.status(400).json({ message: 'bad email' })
  }
  try {
    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return res.status(409).json({ message: 'Email already exists' })
    }
    const hash = await bcrypt.hash(password, saltRounds)
    const user = new User({
      email: email,
      password: hash,
      profile: [
        {
          firstName: firstName,
          lastName: lastName,
          address: [
            {
              street: street,
              houseNumber: houseNumber,
              city: city,
              country: country,
              postCode: postCode
            }
          ]
        }
      ]
    })
    delete user.password
    const newUser = await user.save()
    res.status(201).json(newUser)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}
module.exports = { createUser }
