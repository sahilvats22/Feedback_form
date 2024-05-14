const express = require("express")
const router = express.Router()
const { createFeedback,  getFeedback, getFeedbackById } = require("../controller/controller")

router.get('/', getFeedback)
router.get('/:id', getFeedbackById)
router.post('/', createFeedback)

module.exports = router