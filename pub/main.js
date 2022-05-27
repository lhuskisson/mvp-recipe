const listmainpage = document.querySelector('#mainpage')
const createbtn = document.querySelector('#createbtn')
const updatebtn = document.querySelector('#updatebtn')
const deletebtn = document.querySelector('#deletebtn')
const title = document.querySelector('#titlecontainer')
const instructions = document.querySelector('#instructionscontainer')

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


//======Display Recipes on Page======//
function createOneRecipe(elem) {
    const div = document.createElement('div')
    const div2 = document.createElement('div')
    const div3 = document.createElement('div')
    div.textContent = elem.recipe_name
    div2.textContent = elem.recipe_ingredients
    div3.textContent = elem.recipe_instructions
    div.className = 'result'
    div.id = elem.id
    div2.classList.add(elem.id)
    div3.classList.add(elem.id)
    div2.classList.add('hide')
    div3.classList.add('hide')
    div.addEventListener('click', () => {
        let showinstructions = document.querySelector('#instructionscontainer')
        for (let i = 0; i < showinstructions.length; i++) {
            let current = showinstructions[i]
            current.classList.remove('hide')
            console.log(current[i])
        }
        
    })

    addEventListenerToOneRecipe(div)
    title.appendChild(div)
    instructions.appendChild(div2)
    instructions.appendChild(div3)
}
///==========Not sure what this is doing right now========//
function addEventListenerToOneRecipe(div) {
    div.addEventListener('click', getOneRecipe)
    console.log('I dont know what this is doing')
}

//=======Display One Recipe========//
async function getOneRecipe(e) {
    const result = await fetch (`http://localhost:8000/api/recipe/${e.target.id}`)
    const data = await result.json()
    console.log(data)
}




//===========Update Recipe==========//

function updateRecipe() {

}


//==========Delete Recipe=======//


/*
function appendListItemToList(div) {
    var list = document.querySelector('#list')
    list.append(div)
}*/