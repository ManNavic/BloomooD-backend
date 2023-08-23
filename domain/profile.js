const User = require('../models/user')

const createProfile = async (req, res) => {
  const { firstName, lastName, address } = req.body
  try {
    // Find the user based on the email from the JWT token
    const user = await User.findOne({ email: req.user.email })

    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }

    // Create a new profile using the profileSchema
    const newProfile = {
      firstName,
      lastName,
      address
    }

    // Add the new profile to the user's profile array
    user.profile.push(newProfile)

    // Save the updated user document
    await user.save()

    res
      .status(201)
      .json({ message: 'Profile created successfully', profile: newProfile })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

module.exports = { createProfile }
