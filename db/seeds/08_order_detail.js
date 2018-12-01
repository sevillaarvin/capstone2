exports.seed = async function(knex, Promise) {
  // Deletes ALL existing entries
  await knex('order_detail').del()
      // Inserts seed entries
  return await knex('order_detail')
    .insert([
      {
        order_id: 1,
        item_id: 1,
        quantity: 1,
        price: 100,
      },
      {
        order_id: 2,
        item_id: 2,
        quantity: 2,
        price: 200,
      },
      {
        order_id: 3,
        item_id: 1,
        quantity: 3,
        price: 1500,
      },
      {
        order_id: 1,
        item_id: 3,
        quantity: 5,
        price: 750.99,
      },
      {
        order_id: 4,
        item_id: 3,
        quantity: 6,
        price: 999.99,
      },
    ]);
};
