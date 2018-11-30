
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('item').del()
    .then(function () {
      // Inserts seed entries
      return knex('item').insert([
        {
          name: "Swimming Trunks",
          category_id: 1,
          description: "These are swimming trunks.",
          img: "https://cdn.vuetifyjs.com/images/cards/halcyon.png",
          price: 100000
        },
        {
          name: "Two Piece",
          category_id: 2,
          description: "These are two piece.",
          img: "https://cdn.vuetifyjs.com/images/cards/halcyon.png",
          price: 200000
        },
        {
          name: "Swimming Goggles",
          category_id: 3,
          description: "These are goggles.",
          img: "https://cdn.vuetifyjs.com/images/cards/halcyon.png",
          price: 50000
        },
      ]);
    });
};
