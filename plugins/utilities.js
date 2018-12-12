import Vue from "vue"

Vue.filter("long-date", date => {
  return new Date(date).toLocaleDateString()
})
