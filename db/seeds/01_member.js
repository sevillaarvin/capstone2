const bcrypt = require("bcryptjs")

exports.seed = async function(knex, Promise) {
  let password1
  let password2
  let password3
  try {
    password1 = await bcrypt.hash("password1", 10)
    password2 = await bcrypt.hash("password2", 10)
    password3 = await bcrypt.hash("password3", 10)
  } catch (e) {
    return Promise.reject(e)
  }
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
          password: password1,
        },
        {
          firstName: "Jaden",
          lastName: "Smith",
          email: "jaden@smith.com",
          username: "smithjaden",
          password: password2,
        },
        {
          firstName: "Juan",
          lastName: "Felipe",
          email: "juan@felipe.com",
          username: "felipejuan",
          password: password3,
        },
      ]);
    });
};
