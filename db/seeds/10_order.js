exports.seed = async function(knex, Promise) {
  // Deletes ALL existing entries
  await knex('order').del()
  // Inserts seed entries
  return await knex('order')
    .insert([
      {
        member_id: 1,
        ship_to: "123 Lombard St, Philadelphia",
        status_id: 1,
      },
      {
        member_id: 2,
        ship_to: "999 Xiexie Beijing",
        status_id: 2,
        ship_at: new Date(2018, 10, 30, 12, 15)
      },
      {
        member_id: 3,
        ship_to: "314 Baker Street",
        status_id: 3,
        ship_at: new Date("2018-10-25T23:30:15"),
        deliver_at: new Date(),
      },
      {
        member_id: 2,
        ship_to: "Mexico City",
        status_id: 4,
      },
      {
        member_id: 1,
        ship_to: "Nowhere",
        status_id: 1,
      },
      {
        member_id: 2,
        ship_to: "Somewhere",
        status_id: 2,
        paypal_payment_sid: "test",
      },
    ]);
};
