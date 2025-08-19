import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import routes from './routes/index'
import errorHandler from './middlewares/errHandler'

dotenv.config()

const app = express()

app.use(cors())
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use('/api', routes)
app.use(errorHandler)

const PORT: number = parseInt(process.env.PORT?.toString() || '4000')
app.listen(PORT, () =>{
    console.log(`Evaluation form listen to port:`, PORT)
})

export default app;