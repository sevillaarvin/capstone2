
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('size').del()
    .then(function () {
      // Inserts seed entries
      return knex('size').insert([
        {
          name: "xs"
        },
        {
          name: "sm"
        },
        {
          name: "md"
        },
        {
          name: "lg"
        },
        {
          name: "xl"
        },
      ]);
    });
};
