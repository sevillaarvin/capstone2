import Vue from "vue"

Vue.filter("long-date", date => {
  if (!date) {
    return date
  }
  return new Date(date).toLocaleDateString()
})
