const ContactUs = require('../models/contactUs')
const createContactUs = async (req, res) => {
  const { firstName, lastName, email, subject, message } = req.body
  if (!firstName) {
    return res.status(400).json({ errors: ['Please enter your first name'] })
  }
  if (!lastName) {
    return res.status(400).json({ errors: ['Please enter your last name'] })
  }
  if (!email) {
    return res.status(400).json({ errors: ['Please enter your email address'] })
  }
  if (!subject) {
    return res.status(400).json({ errors: ['Please select the subject'] })
  }
  if (message.length < 0) {
    return res.status(400).json({ errors: ['Please enter your message'] })
  }
  try {
    const contact = new ContactUs({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      subject: req.body.subject,
      message: req.body.message
    })
    const newContact = await contact.save()
    res.status(201).json(newContact)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}
module.exports = { createContactUs }
