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

module.exports = {
  convertRating,
  convertGender,
  revertGender
}
