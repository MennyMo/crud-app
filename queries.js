/* We’ll use the node-postgres module to create a pool of connections. 
Therefore, we don’t have to open and close a client each time we make a query.
  */

const { password } = require('pg/lib/defaults')

const Pool = require('pg').Pool
const pool = new Pool({
  user: 'molly',
  host: 'localhost',
  database: 'quidvisdb',
  password: 'Eniayewu77',
  port: 5432,
})

//Creating routes for CRUD operations

//GET all users

const getUsers = (request, response) => {
    pool.query('SELECT * FROM peeps ORDER BY id ASC', (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  }

//GET a single user by ID

const getUserById = (request, response) => {
    const id = parseInt(request.params.id)
  
    pool.query('SELECT * FROM peeps WHERE id = $1', [id], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  }

  //POST a new user

  const createUser = (request, response) => {
    const { name, email, password } = request.body
  
    pool.query('INSERT INTO peeps (name, email, password) VALUES ($1, $2, $3) RETURNING *', [name, email, password], (error, results) => {
      if (error) {
        throw error
      }
      response.status(201).send(`User added with ID: ${results.rows[0].id}`)
    })
  }

//update data in an existing user

const updateUser = (request, response) => {
    const id = parseInt(request.params.id)
    const { name, email, password } = request.body
  
    pool.query(
      'UPDATE peeps SET name = $1, email = $2, password = $3 WHERE id = $4',
      [name, email, password, id],
      (error, results) => {
        if (error) {
          throw error
        }
        response.status(200).send(`User modified with ID: ${id}`)
      }
    )
  }

  //DELETE a user

  const deleteUser = (request, response) => {
    const id = parseInt(request.params.id)
  
    pool.query('DELETE FROM peeps WHERE id = $1', [id], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`User deleted with ID: ${id}`)
    })
  }

//Since we’re using the ES6 syntax, we can write getUsers instead of getUsers:getUsers and so on...
  module.exports = {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
  }