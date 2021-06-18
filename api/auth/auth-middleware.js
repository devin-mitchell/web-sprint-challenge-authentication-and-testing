const { JWT_SECRET } = require("../secrets"); 
const jwt = require('jsonwebtoken')
const Users = require('../users/users-model')

const restricted = (req, res, next) => {
  const token = req.headers.authorization
  if (token) {
   jwt.verify(token, JWT_SECRET, (err, decoded) => {
     if (err) {
       next({
         status: 401,
         message: `Token invalid`
       })
     } else {
       req.decodedJwt = decoded
       next()
     }
   })
 } else {
   next({
     status: 401,
     message: 'Token required'
   })
  }
}

const checkUsernameUnique = async (req, res, next) => {

}

const checkUsernameExists = async (req, res, next) => {
  const { username } = req.body
  const user = await Users.getBy({ username })
  if (user) {
    req.user = user
    next()
  } else {
    next({
      status: 401,
      message: 'Invalid credentials'
    })
  }
}

module.exports = {
  restricted,
  checkUsernameExists,
}
