const apiUrl = 'https://jsonplaceholder.typicode.com/todos'

// Get Todos from JSON placeholder
const getTodos = () => {
    fetch(apiUrl + '?_limit=5')
    .then(res => res.json())
    .then(data => {
        // Display todos in the UI
        data.forEach((todo) => addTodoToDom(todo))
    })
}

// Add Todo to DOM
const addTodoToDom = (todo) => {
    // Create a new element
    const div = document.createElement('div')
    // Add a text node
    div.appendChild(document.createTextNode(todo.title))
    // Add a specific class
    if (todo.completed === true) {
        div.classList.add('done')
    } 
    // Append to DOM
    document.getElementById('todo-list').appendChild(div)
}

// Create Todo
const createTodo = (e) => {
    e.preventDefault()
    const newTodo = {
        title: e.target.firstElementChild.value,
        completed: false
    }
    // Make POST request to JSON placeholder to post the todo
    fetch(apiUrl, {
        method: 'POST',
        body: JSON.stringify(newTodo),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(res => res.json())
    .then(data => {
        addTodoToDom(data)
        e.target.firstElementChild.value = ''
    })
}

const init = () => {
    document.addEventListener('DOMContentLoaded', getTodos)
    document.getElementById('todo-form').addEventListener('submit', createTodo)
}

init()