const User = require('../models/user') // user model
const bcrypt = require('bcrypt') // bcrypt for password hashing

const getPassword = async (req, res) => {
  const { email } = req.body
  if (!email) {
    return res
      .status(400)
      .json({ errors: ['Please enter valid email address'] })
  }
  try {
    const user = await User.findOne({ email: req.body.email })
    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }

    function generateRandomPassword() {
      const length = 8 // Length of password
      const charset = // Valid characters in password
        'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()-_=+'
      let password = ''
      // Loops througth the length of password
      for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * charset.length)
        password += charset[randomIndex] // Adding random characters to password
      }

      return password
    }
    // Generates new password
    const randomPassword = generateRandomPassword()
    // Hash the new password before storing it in the DB
    const hashedPassword = await bcrypt.hash(randomPassword, 10) // 10 is the number of salt rounds

    // Update the user password in the DB
    user.password = hashedPassword
    await user.save()

    // Returns user details and new not hashed password
    res.status(200).json({ user, newPassword: randomPassword })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

module.exports = { getPassword }
