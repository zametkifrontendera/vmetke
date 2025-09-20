import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import routes from './routes/index.js'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

app.use(cors({ origin: 'https://vmetke.ru' }))
app.use(express.json())
app.use('/api', routes)

console.log('Registered routes:')
app._router.stack.forEach((r: any) => {
  if (r.route && r.route.path) {
    console.log(r.route.path, Object.keys(r.route.methods))
  } else if (r.name === 'router') {
    r.handle.stack.forEach((h: any) => {
      console.log(h.route?.path, Object.keys(h.route?.methods || {}))
    })
  }
})


app.listen(PORT, () => console.log(`Server on port ${PORT}`))