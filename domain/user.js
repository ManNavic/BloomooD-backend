// const express = require('express')
const bcrypt = require('bcrypt')
const { passwordValidation } = require('../utils/passwordValidation')
const { emailValidation } = require('../utils/emailValidation')
const User = require('../models/user')
const saltRounds = 10

const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    } else return res.json(user)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}
const createUser = async (req, res) => {
  const { email, password } = req.body
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
      name: req.body.name,
      email: req.body.email,
      password: hash
    })
    delete user.password
    const newUser = await user.save()
    res.status(201).json(newUser)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}
module.exports = { getUser, createUser }
