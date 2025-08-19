import express from "express"
import QuestionController from "../controllers/questionController"

const router = express.Router()

router.get("/", QuestionController.getQuestions)

export default router