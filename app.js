const apiUrl = 'https://jsonplaceholder.typicode.com/todos'

// Get Todos
const getTodos = () => {
    fetch(apiUrl + '?_limit=5')
    .then(res => res.json())
    .then(data => {
        data.forEach(todo => {
            addTodosToDOM(todo)
        })
    })
}

// Show Todos
const addTodosToDOM = (todo) => {
    // Create a new DOM element
    const div = document.createElement('div')
    // Add a text node
    div.appendChild(document.createTextNode(todo.title))
    // Add a specific class
    div.classList.add('todo')
    // Set attribute
    div.setAttribute('data-id', todo.id)
    // Check for todo completed
    if (todo.completed === true) {
        div.classList.add('done')
    }
    // Append to the DOM
    document.getElementById('todo-list').appendChild(div)

}

// Create Todo
const createTodo = (e) => {
    e.preventDefault()
    // Create a variable that represents a new todo
    const newTodo = {
        title: e.target.firstElementChild.value,
        completed: false
    }
    // Make a POST request to JSON API
    fetch(apiUrl, {
        method: 'POST',
        body: JSON.stringify(newTodo),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(res => res.json())
    .then(data => addTodosToDOM(data))
    e.target.firstElementChild.value = ''
}

// Update Todo
const updateTodo = (e) => {
    if (e.target.classList.contains('todo')) {
        e.target.classList.toggle('done')
         updateCompleted(e.target.dataset.id, e.target.classList.contains('todo'))
    }
   
}

// Update Completed
const updateCompleted = (id, completed) => {
    fetch(`${apiUrl}/${id}`, {
        method: 'PUT',
        body: JSON.stringify({
            completed
        })
    })
    .then(res => res.json())
    .then(data => console.log(data))
}

// Remove Todo
const removeTodo = (e) => {
    if (e.target.classList.contains('todo')) {
        const id = e.target.dataset.id
        fetch(`${apiUrl}/${id}`, {
            method: 'DELETE'
        })
        .then(res => res.json())
        .then(() => e.target.remove())
    }
    

}

const init = () => {
    document.addEventListener('DOMContentLoaded', getTodos)
    document.querySelector('#todo-form').addEventListener('submit', createTodo)
    document.querySelector('#todo-list').addEventListener('click', updateTodo)
    document.querySelector('#todo-list').addEventListener('dblclick', removeTodo)
}

init()