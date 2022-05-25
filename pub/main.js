const list = document.querySelector('#list')
const btn = document.querySelector('#btn')

addListeners()

function addListeners() {
    btn.addEventListener('click', getRecipe)
}

async function getRecipe() {
    const result = await fetch('http://localhost:8000/api/recipe')
    const data = await result.json()
    createRecipes(data)
}


