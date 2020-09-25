const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { registerValidation, loginValidation } = require('../validation')
const User = require('../models/User')

// validation

router.post('/register', async (req, res) => {
  // data validate
  const { error } = registerValidation(req.body)

  if (error) {
    return res.status(400).send({ message: error.details[0].message })
  }

  // 유저존재 유무 체크
  const emailExist = await User.findOne({ email: req.body.email })
  if (emailExist) {
    return res.status(400).send({ message: 'email already exist!!' })
  }

  // 비밀번호 암호화
  const salt = await bcrypt.genSalt(10)
  const hashPassword = await bcrypt.hash(req.body.password, salt)

  const user = new User({
    email: req.body.email,
    password: hashPassword,
    name: req.body.name,
  })

  try {
    const result = await user.save()
    res.json(result)
  } catch (err) {
    res.status(400).json({ message: err })
  }
})

router.post('/login', async (req, res) => {
  // data validate
  const { error } = loginValidation(req.body)

  if (error) {
    return res.status(400).send({ message: error.details[0].message })
  }

  const user = await User.findOne({ email: req.body.email })
  if (!user) {
    return res.status(400).send({ message: '로그인 정보가 올바르지 않습니다.' })
  }

  // 비밀번호 검증
  const validPassword = await bcrypt.compare(req.body.password, user.password)
  if (!validPassword) {
    return res.status(400).send({ message: '비밀번호가 일치하지 않습니다.' })
  }

  const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET, {
    expiresIn: '1h',
  })
  res.header('auth-token', token).send(token)
})

router.get('/logout', (req, res) => {
  jwt.destroy(token)
})

module.exports = router
