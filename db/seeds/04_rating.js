
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('rating').del()
    .then(function () {
      // Inserts seed entries
      return knex('rating').insert([
        {
          member_id: 1,
          item_id: 2,
          rating: 3
        },
        {
          member_id: 2,
          item_id: 3,
          rating: 5
        },
        {
          member_id: 3,
          item_id: 1,
          rating: 5
        },
        {
          member_id: 3,
          item_id: 1,
          rating: 4
        },
      ]);
    });
};
