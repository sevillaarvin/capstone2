
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('rating').del()
    .then(function () {
      // Inserts seed entries
      return knex('rating').insert([
        {
          member_id: 1,
          item_id: 2,
          stars: 3
        },
        {
          member_id: 2,
          item_id: 3,
          stars: 5
        },
        {
          member_id: 3,
          item_id: 1,
          stars: 5
        },
        {
          member_id: 3,
          item_id: 2,
          stars: 4
        },
      ]);
    });
};
