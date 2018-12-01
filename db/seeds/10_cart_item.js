exports.seed = async function(knex, Promise) {
  // Deletes ALL existing entries
  await knex('cart_item').del()
  // Inserts seed entries
  try {
    return await knex('cart_item')
      .insert([
        {
          cart_id: 1,
          item_id: 1,
          quantity: 10
        },
        {
          cart_id: 2,
          item_id: 1,
          quantity: 50
        },
        {
          cart_id: 3,
          item_id: 2,
          quantity: 2
        },
      ]);
  } catch (e) {
    console.error(e.message)
    console.error(e.detail)
  }
};
