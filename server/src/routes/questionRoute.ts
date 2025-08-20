import express from "express"
import QuestionsController from "../controllers/questionController"

const router = express.Router()

router.get("/", QuestionsController.getQuestionAll)

export default router