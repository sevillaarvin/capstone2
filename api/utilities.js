const convertRating = items => {
  items.forEach(item => {
    item.rating = Number(item.rating)
  })
}

const convertGender = members => {
  members.forEach(member => {
    const gender = member.gender
    if (gender === "m") {
      member.gender = "Male"
    } else if (gender === "f") {
      member.gender = "Female"
    }
  })
}

const revertGender = members => {
  members.forEach(member => {
    const gender = member.gender
    if (gender === "Male") {
      member.gender = "m"
    } else if (gender === "Female") {
      member.gender = "f"
    }
  })
}

const convertNullToString = (items, property) => {
  items.forEach((item) => {
    if (!item[property]) {
      item[property] = ""
    }
  })
}

const convertStringToNumber = (items, property) => {
  items.forEach((item) => {
    item[property] = Number(item[property])
  })
}

const convertISODate = (items, property) => {
  items.forEach((item) => {
    if (!item[property]) {
      return
    }
    const isoDate = item[property]
    const newDate = `${isoDate.getFullYear()}-${isoDate.getMonth() + 1}-${isoDate.getDate()}`
    item[property] = newDate
  })
}

module.exports = {
  convertRating,
  convertGender,
  revertGender,
  convertNullToString,
  convertStringToNumber,
  convertISODate,
}
