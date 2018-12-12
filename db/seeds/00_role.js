exports.seed = async function(knex, Promise) {
  // Deletes ALL existing entries
  await knex('role').del()
  // Inserts seed entries
  try {
    return await knex('role')
      .insert([
        {
          name: "admin",
        },
        {
          name: "user",
        },
      ]);
  } catch (e) {
    console.error(e.message)
    console.error(e.detail)
  }
};
