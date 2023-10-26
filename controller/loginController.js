const User = require('../model/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const handleLoginUser = async (req, res) => {
  const cookies = req.cookies
  const { email, password } = req.body
  if (!email || !password)
    return res.status(400).json({ message: '이메일 비밀번호가 모두 필요합니다' })

  const foundedUser = await User.findOne({ email }).exec()
  if (!foundedUser) return res.sendStatus(401) // 가입정보 없음

  const isMatchPassword = await bcrypt.compare(password, foundedUser.password)
  if (isMatchPassword) {
    const role = foundedUser.role
    const accessToken = jwt.sign(
      {
        userInfo: {
          email: foundedUser.email,
          role: role,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: '10s',
      }
    )
    const newRefreshToken = jwt.sign(
      { email: foundedUser.email },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: '600s' }
    )
    if (cookies?.refreshtoken) {
      const refreshToken = cookies.refreshtoken

      res.clearCookie('refreshtoken', {
        httpOnly: true,
        sameSite: 'None',
        secure: true,
      })
    }
    foundedUser.refreshToken = newRefreshToken
    const result = await foundedUser.save()
    res.cookie('refreshtoken', newRefreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'None',
      maxAge: 24 * 60 * 60 * 1000,
    })
    res.json({ accessToken })
  } else {
    res.sendStatus(401)
  }
}
module.exports = { handleLoginUser }
