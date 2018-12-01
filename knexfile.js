module.exports = {
  development: {
    client: "pg",
    connection: {
      host: "localhost",
      user: "aes",
      password: "password",
      database: "nextseville",
      charset: "utf8"
    },
    migrations: {
      directory: __dirname + '/db/migrations'
    },
    seeds: {
      directory: __dirname + '/db/seeds'
    }
  },
  production: {
    client: "pg",
    connection: process.env.DATABASE_URL,
    migrations: {
      directory: __dirname + '/db/migrations'
    },
    seeds: {
      directory: __dirname + '/db/seeds'
    }
  }
}
