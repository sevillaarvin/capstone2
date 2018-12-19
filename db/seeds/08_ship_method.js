exports.seed = async function (knex, Promise) {
  // Deletes ALL existing entries
  await knex('ship_method').del()
  // Inserts seed entries
  try {
    return await knex("ship_method")
      .insert([
        {
          name: "Economy",
        },
        {
          name: "VIP",
        },
      ])
  } catch (e) {
    return Promise.reject(e)
  }
}
