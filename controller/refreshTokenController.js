const User = require('../model/User')
const jwt = require('jsonwebtoken')

const handleRefreshToken = async (req, res) => {
  const cookies = req.cookies
  if (!cookies?.refreshtoken) return res.sendStatus(401)
  const refreshToken = cookies.refreshtoken
  res.clearCookie('refreshtoken', { httpOnly: true, sameSite: 'None', secure: true })
  const foundedUser = await User.findOne({ refreshToken }).exec()

  if (!foundedUser) {
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, async (err, decode) => {
      if (err) return res.sendStatus(403)
      const hackedUser = await User.findOne({ email: decode.email }).exec()
      hackedUser.refreshToken = ''
      const result = await hackedUser.save()
    })
    return res.sendStatus(403) // 로그인 요망
  }

  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, async (err, decode) => {
    if (err) {
      foundedUser.refreshToken = ''
      const result = await foundedUser.save()
    }
    if (err || foundedUser.email !== decode.email) return res.sendStatus(403) // 로그인 요망
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

    foundedUser.refreshToken = newRefreshToken
    const result = await foundedUser.save()
    res.cookie('refreshtoken', newRefreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'None',
      maxAge: 24 * 60 * 60 * 1000,
    })
    res.json({ accessToken })
  })
}

module.exports = { handleRefreshToken }
