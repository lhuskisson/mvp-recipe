require("dotenv").config();
const express = require('express')
const app = express()
const PORT = process.env.PORT || 8000 
const db = require("./db/conn")
const {Pool} = require('pg')
const pool = new Pool({
    user: "leehuskisson",
    password:'',
    host: "localhost",
    database: "recipe_db",
    PORT: 5432
});

pool.connect()

app.use(express.static("public"));
app.use(express.json())

app.listen(PORT, () => {
console.log(`listening on ${PORT}`)
});

app.get("/api/recipe", async function(req, res){
    try {
        const data = await pool.query(`SELECT * FROM recipe`)
        res.json(data.rows)
    } catch (error) {
        console.log(error.message)
        res.send(error.message)
    }
})

app.get('/api/recipe/:id', async function (req, res,) {
    try {
        let id = req.params.id
        const data = await pool.query('SELECT * FROM recipe WHERE id = $1', [id])
        res.json(data.rows)
    } catch (error) {
        console.log(error.message)
        res.send(error.message)
    }
})

app.post('/api/recipe', async function (req, res) {
    try {
        let recipe_name = req.body.recipe_name
        let recipe_ingredients = req.body.recipe_ingredients
        let recipe_instructions = req.body.recipe_instructions
        await pool.query('INSERT INTO recipe (recipe_name, recipe_ingredients, recipe_instructions)VALUES($1, $2, $3)', [recipe_name, recipe_ingredients, recipe_instructions])
        res.json(req.body)
    } catch (error) {
        console.log(error.message)
        res.send(error.message)
    }
})

app.patch('/api/recipe/:id', async function (req, res,) {
    try {
      let recipe_name = req.body.recipe_name
      let recipe_ingredients = req.body.recipe_ingredients
      let recipe_instructions = req.body.recipe_instructions
      let id = req.params.id

        await pool.query(`UPDATE recipe SET recipe_name = $1, recipe_ingredients = $2, recipe_instructions = $3 WHERE id = $4`,[recipe_name, recipe_ingredients, recipe_instructions, id])
        res.json(req.body)
    } catch (error) {
        console.log(error.message)
        res.send(error.message)
    }
} )

app.use((req, res, next) =>{
    res.status(404)
    res.send("not found")
}) 