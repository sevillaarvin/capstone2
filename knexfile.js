module.exports = {
  development: {
    client: "pg",
    // connection: "postgres://fwsxzkihaienjw:b0be65b967e79d1e33d547a3f8adb305508a0134cd0b5bcc974073cb779ec45a@ec2-54-163-230-178.compute-1.amazonaws.com:5432/dd1u5gl9f83kvt",
    // connection: process.env.DATABASE_URL || "postgres://aes:password@localhost/clubseville_test",
    connection: {
      host: "localhost",
      user: "aes",
      password: "password",
      database: "clubseville",
      charset: "utf9"
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
