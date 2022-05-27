const list = document.querySelector('#list')
const btn = document.querySelector('#btn')

addListeners()

function addListeners() {
    window.addEventListener('load', getRecipe)
}

async function getRecipe() {
    const result = await fetch('http://localhost:8000/api/recipe')
    const data = await result.json()
    console.log(data)
    createRecipe(data)
    
}

function createRecipe (arr) {
    arr.forEach((elem) => {
        createOneRecipe(elem)
    })
}

function createOneRecipe(elem) {
    const div = document.createElement('div')
    const div2 = document.createElement('div')
    const div3 = document.createElement('div')
    div.textContent = elem.recipe_name
    div2.textContent = elem.recipe_ingredients
    div3.textContent = elem.recipe_instructions
    div.className = 'listItem'
    div.id = elem.id
    
    addEventListenerToOneRecipe(div)
    appendListItemToList(div)
    appendListItemToList(div2)
    appendListItemToList(div3)
}

function appendListItemToList(div) {
    var list = document.querySelector('#list')
    list.append(div)
}
function addEventListenerToOneRecipe(div) {
    div.addEventListener('click', getOneRecipe)
}

async function getOneRecipe(e) {
    const result = await fetch (`http://localhost:8000/api/recipe/${e.target.id}`)
    const data = await result.json()
    console.log(data)
}
