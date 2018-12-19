
exports.seed = async function(knex, Promise) {
  // Deletes ALL existing entries
  await knex('status').del()
  // Inserts seed entries
  return await knex('status').insert([
    {
      name: "Pending"
    },
    {
      name: "Approved"
    },
    {
      name: "Shipped"
    },
    {
      name: "Delivered"
    },
  ]);
};
