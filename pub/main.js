

    const ulArea = $(".task-list")
    //const server = "http://localhost:8000"; 
    const server =  "https://thawing-harbor-45268.herokuapp.com"

    init()
    
    function init() {
        getTaskItem();
        addEventListenerToXBtn();
        addEventListenerToAddTaskBtn();
    }

    ///////////GET///////////////
    async function getTaskItem() {
        const result = await fetch("https://thawing-harbor-45268.herokuapp.com/api/task")
        console.log(result)
        const data = await result.json()
        console.log(data)
        for (let i of data) {
            console.log('in the loop' +i)
            createAndAppendDivTask(i.id, i.task_name)
       }
       console.log(data)
    }

    /////////////////////POST///////////////////
    async function postTaskItem(url = `${server}/api/task`, data = {}) {
        console.log(data)
        const response = await fetch( url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        return response.json()
    }
    /////////////////PATCH/////////////////
    async function patchTaskItem(id) {
        const response = await fetch (`${server}/api/task${id}`, 
        {
            method: 'PUT',
            headers: {
                "Content-Type": 'application/json',
            },
        })
        body: string
    }

    
    ////////DELETE////////////////
    async function deleteTaskItem(id) {
        console.log(id)
        
        const response = await fetch(`${server}/api/task/${id}`, 
        {

            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
        })
        const data = await response.json()
        console.log (data)
    }

    /////////CREATE AND APPEND/////////////////
        function createAndAppendDivTask(taskId, taskName) {
            console.log(taskId)
        const taskDiv = $('<div></div>').addClass('tasks').attr('id', taskId)
        const input = $(`<input type='checkbox' id=box-${taskId} class='md-task'/>`)    
        const li = $('<li></li>').addClass('list-item').text(taskName)
        const divBtn = $('<div></div>').addClass('remove-btn').text('x').attr('id', taskId)
        $(taskDiv).append(input)
        $(taskDiv).append(li)
        $(taskDiv).append(divBtn)
        ulArea.append(taskDiv)
    }

    /////////////ADD EVENT LISTENERS//////////////
    function addEventListenerToAddTaskBtn() {
        $('#add-task-btn').on('click', () => {
            const textInput = $('#task-name').val()
            if (textInput.length === 0) {
                $('.error').show()
                $('.error').text('Nothing is not a task, lazy bones')
            } else {
                let lastTaskId = ulArea.children().last().attr('id')
                if (lastTaskId === undefined) {
                    lastTaskId = 1;
                    $('.error').hide()
                    createAndAppendDivTask(lastTaskId, textInput)
                    postTaskItem('/api/task', {task_name: textInput})
                } else {
                    lastTaskId++;
                    $('.error').hide()
                    createAndAppendDivTask(lastTaskId, textInput)
                    postTaskItem('/api/task', {task_name: textInput})
                }
            }
        })
    }
    
    function addEventListenerToXBtn() {
        ulArea.on('click', (e) => {
            const isXBtn = e.target.getAttribute('class') === 'remove-btn'
            let divId = e.target.getAttribute('id')
            if (isXBtn) {
                const btnId = e.target.getAttribute('id')
                divId = btnId;
                $(`#${divId}`).hide()
                deleteTaskItem(divId)
            }
            console.log(divId)
        })
    }
    













    // date manipulation
    function getDate() { 
        const fullDate = new Date() 
        const year = fullDate.getFullYear();
        const month = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'][fullDate.getMonth()];
        const date = fullDate.getDate();
        const weekDay = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'][fullDate.getDay()];
        const formatted_date = `${month} ${date}, ${year}`
        
     
       
    }