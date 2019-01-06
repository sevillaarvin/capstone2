const router = require("express").Router()
const db = require("../../db/knex")
const { authenticate } = require("../auth")

router.get("/item/:itemId/rating", async (req, res) => {
  try {
    const { itemId } = req.params

    const ratings = await db.select([
        "rating.id",
        "member_id as memberId",
        "rating.stars",
        "rating.comment",
        "member.firstName",
        "member.avatar",
      ])
      .from("rating")
      .where({ item_id: itemId })
      .innerJoin("member", "member.id", "rating.member_id")

    const total = ratings.map((rating) => {
      return rating.stars
    }).reduce((total, star) => {
      return total + star
    }, 0)
    const average = ratings.length > 0 ? total / ratings.length : 0
    
    res.status(200).send({
      average,
      ratings,
    })
  } catch (e) {
    res.status(500).send()
    return
  }
})

router.post("/item/:itemId/rating", authenticate, async (req, res) => {
  try {
    const { itemId: item_id } = req.params
    const { user: { userId } } = res.locals
    const {
      memberId: member_id,
      stars,
      comment,
    } = req.body

    if (!(userId == member_id)) {
      res.status(403).send()
      return
    }
    if (stars < 1 || stars > 5) {
      res.status(400).send("Rating must be between 1 to 5")
      return
    }

    const result = await db.insert({
        item_id,
        member_id,
        stars,
        comment,
      })
      .into("rating")

    if (!result) {
      res.status(400).send("Unable to add rating")
      return
    }

    res.status(201).send()
    return
  } catch (e) {
    res.status(500).send()
    return
  }
})

module.exports = router
