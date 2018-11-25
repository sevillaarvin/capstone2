import Vue from 'vue'

Vue.filter("currency", (amount) => {
  try {
    return parseFloat(amount).toLocaleString("en-US", {
      style: "currency",
      currency: "USD"
    })
  } catch (e) {
    console.log(e)
    return amount
  }
})
