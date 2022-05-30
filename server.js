require("dotenv").config();

const express = require('express')
const app = express()
const PORT = process.env.PORT || 8000 

//connecting to DB
const {Pool} = require('pg')
const pool = new Pool({
    connectionString: process.env.DATABASE_URL
});
///////////////////


//use built-in express middleware
app.use(express.static("pub"));
app.use(express.json())

/////////////////////////////////


///GET DB/////
app.get("/api/task", async function (req, res) {
    try {
        console.log('server reached')
        const result = await pool.query(`SELECT * FROM task`)
        console.log(result.rows)
        res.json(result.rows)
    } catch (error) {
        res.send(error.message)
    }
})

app.get('/api/task/:id', async function (req, res,) {
    try {
        let id = req.params.id
        const result = await pool.query('SELECT * FROM task WHERE id = $1', [id])
        res.json(result.rows)
    } catch (error) {
        console.log(error.message)
        res.send(error.message)
    }
})

app.post('/api/task', async function (req, res) {
    try {
        console.log(req.body)
        let task_name = req.body.task_name
        await pool.query('INSERT INTO task(task_name)VALUES($1)', [task_name])
        res.json(req.body)
    } catch (error) {
        console.log(error.message)
        res.send(error.message)
    }
})

app.patch('/api/task/:id', async function (req, res,) {
    try {
        let task_name = req.body.task_name
        let id = req.params.id
        
        await pool.query(`UPDATE task SET task_name = $1 WHERE id = $2`,[task_name, id])
        res.json(req.body)
    } catch (error) {
        console.log(error.message)
        res.send(error.message)
    }
} )

app.delete('/api/task/:id', async function (req, res) {
    try {
        let id = req.params.id
        console.log(id)
        await pool.query('DELETE FROM task WHERE id =$1', [id])
        res.json({msg:'user deleted'})
    } catch (error) {
        res.send(error.message)
    }
})


app.listen(PORT, () => {
console.log(`listening on ${PORT}`)
});