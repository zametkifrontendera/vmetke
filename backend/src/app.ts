import express from 'express'
import cors from 'cors'
import routes from './routes'

const app = express()
const PORT = process.env.PORT || 5000

app.use(cors({ origin: 'http://localhost:5173' }))
app.use(express.json())
app.use('/api', routes)

app.listen(PORT, () => console.log(`Server on port ${PORT}`))