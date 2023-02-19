const express = require('express')
const bodyParser = require('body-parser') //built in bodyParser middleware. 
const app = express()
const port = 3000
const db = require('./queries')

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

app.get('/', (request, response) => {
  response.json({ info: 'Node.js, Express, and Postgres API' })
})

app.get('/peeps', db.getUsers)
app.get('/peeps/:id', db.getUserById)
app.post('/peeps', db.createUser)
app.put('/peeps/:id', db.updateUser)
app.delete('/peeps/:id', db.deleteUser)

//setting the app to listen on the port you set.
app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})




