import express from "express"
import EvaluationController from "../controllers/evaluationController"

const router = express.Router()

router.get("/", EvaluationController.getEvaluationAll)

export default router