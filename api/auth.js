const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")
const db = require("../db/knex")

const generateUserToken = user => {
  // TODO: Move secret to config file
  return jwt.sign(user, "secret")

}

const verifyUserToken = async token => {
  try {
    return jwt.verify(token, "secret")
  } catch (e) {
    return Promise.reject()
  }
}

const findUserCredentials = async (username, password) => {
  const user = await db.select("id", "username", "email", "password")
    .from("member")
    .where({username: username})
    .orWhere({email: username})
    .first()

  if (!user) {
    return Promise.reject()
  }

  const valid = await bcrypt.compare(password, user.password)

  if (!valid) {
    return Promise.reject()
  }

  return { userId: user.id }
}

module.exports = {
  generateUserToken,
  verifyUserToken,
  findUserCredentials
}