import express from "express"
import EvaluationController from "../controllers/evaluationController"

const router = express.Router()

router.get("/", EvaluationController.getEvaluationAll)
router.get("/:id", EvaluationController.getEvaluationById)
router.post("/add", EvaluationController.createEvaluation)

export default router