require("dotenv").config();
const express = require('express')
const app = express()
const PORT = process.env.PORT || 8000 
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

app.get("/recipe", async function(req, res){
    try {
        const data = await pool.query(`SELECT * FROM recipe`)
        res.json(data.rows)
    } catch (error) {
        console.log(error.message)
        res.send(error.message)
    }
})

app.use((req, res, next) =>{
    res.status(404)
    res.send("not found")
}) 