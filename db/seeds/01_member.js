const bcrypt = require("bcryptjs")

exports.seed = function(knex, Promise) {
  let password
  bcrypt.hash("password1", 10, (err, hash) => {
    password = hash
  })
  // Deletes ALL existing entries
  return knex('member').del()
    .then(function () {
      // Inserts seed entries
      return knex('member').insert([
        {
          firstName: "John",
          lastName: "Smith",
          email: "john@smith.com",
          username: "smithjohn",
          password,
        },
        {
          firstName: "Jaden",
          lastName: "Smith",
          email: "jaden@smith.com",
          username: "smithjaden",
          password,
        },
        {
          firstName: "Juan",
          lastName: "Felipe",
          email: "juan@felipe.com",
          username: "felipejuan",
          password,
        },
      ]);
    });
};
