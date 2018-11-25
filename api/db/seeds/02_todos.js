
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('todos').del()
    .then(function () {
      // Inserts seed entries
      return knex('todos').insert([
        {
          id: 1,
          title: "go to the gym",
          user_id: 3
        },
        {
          id: 2,
          title: "buy groceries",
          user_id: 3
        },
        {
          id: 3,
          title: "get the mail",
          user_id: 3
        },
        {
          id: 4,
          title: "get some headphones",
          user_id: 3
        },
        {
          id: 5,
          title: "go to the gym",
          user_id: 2
        },
        {
          id: 6,
          title: "go to the gym",
          user_id: 1
        },
      ]);
    });
};
