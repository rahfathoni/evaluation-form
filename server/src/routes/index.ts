import express from 'express'
import questionRoute from './questionRoute'

const router = express.Router()

router.get('/', (req, res) => {
  res.status(200).json({
    message: 'Welcome to the Evaluation Form API',
  })
})

router.use('/questions', questionRoute)

export default router;