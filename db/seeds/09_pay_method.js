exports.seed = async function (knex, Promise) {
  // Deletes ALL existing entries
  await knex('pay_method').del()
  // Inserts seed entries
  try {
    return await knex("pay_method")
      .insert([
        {
          name: "COD",
        },
        {
          name: "PayPal",
        },
      ])
  } catch (e) {
    return Promise.reject(e)
  }
}
