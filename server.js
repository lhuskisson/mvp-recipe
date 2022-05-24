require("dotenv").config();
const express = require('express')
const app = express()
const PORT = process.env.PORT || 8000 
const db = require("./db/conn")

app.use(express.static("public"));
app.use(express.json())

app.listen(PORT, () => {
console.log(`listening on ${PORT}`)
});

app.get("/recipe", async function(req, res){
    try {
        const data = await pool.query(`SELECT * FROM recipe`)
        res.json(data.rows)
    } catch (error) {
        console.log(error.message)
        res.send(error.message)
    }
})

app.get('/recipe/:id', async function (req, res, next) {
    try {
        let id = req.params.id
        const data = await pool.query('SELECT * FROM recipe WHERE id = $1', [id])
        res.json(data.rows)
    } catch (error) {
        console.log(error.message)
        res.send(error.message)
    }
})

app.post('/recipe', async function (req, res) {
    try {
        let recipe_name = req.body.name
        let recipe_ingredients = req.body.ingredients
        let recipe_instructions = req.body.instructions
        await pool.query('INSERT INTO recipe (recipe_name, recipe_ingredients, recipe_instructions)VALUES($1, $2, $3)', [recipe_name, recipe_ingredients, recipe_instructions])
        res.json(req.body)
    } catch (error) {
        console.log(error.message)
        res.send(error.message)
    }
})

app.patch('/recipe/:id', async function (req, res, next) {
    try {
      let recipe_name = req.body.name
      let recipe_ingredients = req.body.ingredients
      let recipe_instructions = req.body.instructions
      let id = req.params.id

        await pool.query(`UPDATE recipe SET recipe_name = $1, recipe_ingredients = $2, recipe_instructions = $3 WHERE id = $4`,[recipe_name, recipe_ingredients, recipe_instructions, id])
        res.json(req.body)
    } catch (error) {
        console.log(error.message)
        res.send(error.message)
    }
} )

app.delete('/recipe/:id', async function (req, res, next) {
    try {
        let id = req.params.id
        let data = await pool.query("DELETE FROM recipe WHERE recipe_id = $1", [id])
        if (data.rowCount === 0) {
            return next()
        }
        res.send(`${id} was deleted`)

    } catch (error) {
        console.log(error.message)
        res.send(error.message)
    }
})
app.use((req, res, next) =>{
    res.status(404)
    res.send("not found")
}) 