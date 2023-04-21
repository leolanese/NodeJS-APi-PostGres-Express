// Configure PostgreSQL connection
const Pool = require('pg').Pool
const pool = new Pool({
  user: 'leolanese',
  host: 'localhost',
  database: 'postgres',
  password: 'admin',
  port: 5432,
})

/**
  // Creating routes for CRUD operations

    GET: / | displayHome()
    GET: /users | getUsers()
    GET: /users/:id | getUserById()
    POST: /users | createUser()
    PUT: /users/:id | updateUser()
    DELETE: /users/:id | deleteUser()

    Examples:
    GET
    http://localhost:3000/
    http://localhost:3000/users
    http://localhost:3000/users/1

    POST
    To test this, you can use a tool like Postman, curl, or any other 
    API client to send a POST request to http://localhost:3000/users
    with a JSON payload containing a name and email field into body:
    {
        "name": "John Doe",
        "email": "john.doe@example.com"
    }

*/

const displayHome = (request, response) => {
    response.json({ info: 'Node.js, Express, and Postgres API up and running' })
}

const getUsers = (request, response) => {
    pool.query('SELECT * FROM users ORDER BY id ASC', (err, results) => {
      if (err) {
        throw error
      }
      response.status(200).json(results.rows)
    })
}

const getUserById = (request, response) => {
    const id = parseInt(request.params.id)
  
    pool.query('SELECT * FROM users WHERE id = $1', [id], (err, results) => {
      if (err) {
        throw err
      }
      response.status(200).json(results.rows)
    })
}

const createUser = (request, response) => {
    const { name, email } = request.body
  
    pool.query('INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *', [name, email], (err, results) => {
      if (err) {
        throw err
      }
      response.status(201).send(`User added with ID: ${results.rows[0].id}`)
    })
}

const updateUser = (request, response) => {
    const id = parseInt(request.params.id)
    const { name, email } = request.body
  
    pool.query(
      'UPDATE users SET name = $1, email = $2 WHERE id = $3',
      [name, email, id],
      (err, results) => {
        if (err) {
          throw err
        }
        response.status(200).send(`User modified with ID: ${id}`)
      }
    )
}

const deleteUser = (request, response) => {
    const id = parseInt(request.params.id)

    pool.query('DELETE FROM users WHERE id = $1', [id], (err, results) => {
        if (err) {
           throw err
        }
        response.status(200).send(`User deleted with ID: ${id}`)
    })
}

module.exports = {
    displayHome,
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
}

