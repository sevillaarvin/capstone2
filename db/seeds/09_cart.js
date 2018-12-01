exports.seed = async function(knex, Promise) {
  // Deletes ALL existing entries
  await knex('cart').del()
  // Inserts seed entries
  try {
    return await knex('cart')
      .insert([
        {
          member_id: 1,
          order_id: 1,
        },
        {
          member_id: 2,
          order_id: 2,
        },
        {
          member_id: 3,
        },
      ]);
  } catch (e) {
    console.error(e.message)
    console.error(e.detail)
  }
};
