
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('category').del()
    .then(function () {
      // Inserts seed entries
      return knex('category').insert([
        {
          name: "Swimming Equipment"
        },
        {
          name: "Aqua Learning"
        },
        {
          name: "Open Water Swimming"
        },
        {
          name: "Swimsuits"
        },
      ]);
    });
};
