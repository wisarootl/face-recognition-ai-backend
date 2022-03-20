import express from 'express'
import bcrypt from 'bcrypt-nodejs'
import cors from 'cors'
import knex from 'knex'
import { response } from 'express'

import handleRegister from './controllers/register.js'
import handleSignin from './controllers/signin.js'
import handleProfileGet from './controllers/profile.js'

import image from './controllers/image.js'

const db = knex({
  client: 'pg',
  connection: {
    host: '127.0.0.1',
    // port : 3306,
    port: 5432,
    user: 'postgres',
    password: '12345687',
    database: 'smart-brain'
  }
})

const app = express()

app.use(express.json())

app.use(cors())

app.get('/', (req, res) => {
  res.send('success')
})

app.post('/signin', (req, res) => {
  handleSignin(req, res, db, bcrypt)
})

app.post('/register', (req, res) => {
  handleRegister(req, res, db, bcrypt)
})

app.get('/profile/:id', (req, res) => {
  handleProfileGet(req, res, db)
})

app.put('/image', (req, res) => {
  image.handleImage(req, res, db)
})

app.post('/imageurl', (req, res) => {
  image.handleApiCall(req, res)
})

const PORT = process.env.port || 3000
app.listen(process.env.port, () => {
  console.log(`app is running on port ${process.env.port}`)
})
