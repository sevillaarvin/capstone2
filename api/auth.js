const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")
const db = require("../db/knex")

// { userId, roleId, username }
const generateUserToken = user => {
  // TODO: Move secret to config file
  return jwt.sign(user, "secret", {
    expiresIn: "1h",
  })
}

const verifyUserToken = async token => {
  try {
    return jwt.verify(token, "secret")
  } catch (e) {
    return Promise.reject()
  }
}

const findUserCredentials = async (username, password) => {
  const user = await db.select([
      "id",
      "username",
      "email",
      "password",
      "role_id",
      "deactivated",
    ])
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

  return {
    userId: user.id,
    roleId: user.role_id,
    username: user.username,
    deactivated: user.deactivated,
  }
}

const hashPassword = async password => {
  return await bcrypt.hash(password, 10)
}

const authenticate = async (req, res, next) => {
  const authorization = req.header("authorization")
  let token
  let user

  try {
    token = authorization.split(" ")[1]
    user = await verifyUserToken(token)
  } catch (e) {
    res.status(401).send()
    return
  }

  res.locals.user = user
  next()
}

const authorizeAdmin = async (req, res, next) => {
  const { user } = res.locals
  let roles

  try {
    roles = await db.select([
        "id",
        "name",
      ])
      .from("role")
  } catch (e) {
    res.status(500).send()
    return
  }

  let userRole = roles.find(role => role.id === user.roleId)
  if (userRole.name === "admin") {
    next()
  } else {
    res.status(403).send()
    return
  }
}

module.exports = {
  generateUserToken,
  verifyUserToken,
  findUserCredentials,
  hashPassword,
  authenticate,
  authorizeAdmin,
}
