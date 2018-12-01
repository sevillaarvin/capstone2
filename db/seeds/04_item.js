
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('item').del()
    .then(function () {
      // Inserts seed entries
      return knex('item').insert([
        {
          sku: "APMSTR0001",
          name: "Swimming Trunks",
          category_id: 1,
          description: "These are swimming trunks.",
          img: "https://cdn.vuetifyjs.com/images/cards/halcyon.png",
          price: 1000,
          discount: 500,
          size_id: 2,
        },
        {
          sku: "APFTPI0001",
          name: "Two Piece",
          category_id: 2,
          description: "These are two piece.",
          img: "https://cdn.vuetifyjs.com/images/cards/halcyon.png",
          price: 2000,
          discount: 0,
          size_id: 3,
        },
        {
          sku: "ACCGOG0001",
          name: "Swimming Goggles",
          category_id: 3,
          description: "These are goggles.",
          img: "https://cdn.vuetifyjs.com/images/cards/halcyon.png",
          price: 500,
          discount: 5,
        },
      ]);
    });
};
