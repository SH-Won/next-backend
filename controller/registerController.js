const User = require('../model/User')
const bcrypt = require('bcrypt')

const handleRegisterUser = async (req, res) => {
  const { name, email, password } = req.body
  if (!name || !email || !password)
    return res.status(400).json({ message: '성함, 이메일, 비밀번호 모두 필요합니다' })
  const existUser = await User.findOne({ email }).exec()
  if (existUser) return res.sendStatus(409) // 이미 동일한 이메일 유저가 있음
  try {
    const hashPassword = await bcrypt.hash(password, 10)
    const result = await User.create({
      name,
      email,
      password: hashPassword,
    })
    res.status(201).json({ success: true, message: '회원가입 성공' })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

module.exports = { handleRegisterUser }
