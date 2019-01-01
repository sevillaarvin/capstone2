import Vue from "vue"

Vue.filter("long-date", date => {
  if (!date) {
    return date
  }
  return new Date(date).toLocaleDateString()
})

Vue.filter("short-desc", (description) => {
  if (!description || typeof description !== "string") {
    return "Generic description"
  }
  return description.substr(0,300) + "..."
})
