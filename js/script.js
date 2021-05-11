/* TODO */

// Page Elements
const todoInput = document.querySelector('#todo-input')
const todoBody = document.querySelector('.todo-body')
const todoList = document.querySelector('.todos')
const todoCount = document.querySelector('.item-count')
const allBtn = document.querySelector('button.all')
const activeBtn = document.querySelector('button.active')
const completedBtn = document.querySelector('button.completed')
const clearBtn = document.querySelector('button.clear')
let checkboxes;

// Todo List
let allTodos = []

function addTodo(name) {
    const todo = {
        name: name,
        status: 'active',
    }
    allTodos.push(todo)
    updateCount()
    const html = `<div class="todo" data-status="active"><button class="checkbox"></button><p>${name}</p></div>`;
    if(!todoBody.classList.contains('active')) {
        todoBody.classList.add('active')
    }
    todoList.insertAdjacentHTML('beforeend', html);
    checkboxes = document.querySelectorAll('.checkbox')
    checkboxFunctionality()
    dragNDrop()
}

function completeTodo(el) {
    el.setAttribute('data-status', 'completed');
    updateCount()
}

function clearCompleted() {
    const completedTodos = document.querySelectorAll('.todo[data-status="completed"]')
    completedTodos.forEach(completed => {
        completed.parentElement.removeChild(completed)
    })
    allTodos = allTodos.filter(todo => todo.status === 'active')
    updateCount()
}

function updateCount() {
    const activeTodos = allTodos.filter(todo => todo.status === 'active')
    todoCount.textContent = activeTodos.length
}

function checkboxFunctionality() {
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('click', function(e) {
            const todoText = e.target.nextSibling.innerText;
            const todo = allTodos.find(t => t.name === todoText)
            todo.status = 'completed';
            completeTodo(e.target.parentElement)
        })
    })
}

function dragNDrop() {
    const todos = document.querySelector('.todos');
    const sortableList = Sortable.create(todos);
}

function todoEvents() {
    todoInput.addEventListener('keyup', (e) => {
        if(e.key === 'Enter' && e.target.value !== '') {
            if(e.target.value) addTodo(e.target.value)
            e.target.value = ''
        }
    })
    clearBtn.addEventListener('click', function() {
        clearCompleted()
    })
    allBtn.addEventListener('click', function() {
        const todos = document.querySelectorAll('.todo')
        todos.forEach((todo) => todo.style.display = 'flex' )
    })
    activeBtn.addEventListener('click', function() {
        const todos = document.querySelectorAll('.todo')
        todos.forEach(todo => {
            const status = todo.getAttribute('data-status');
            if(status === 'active') { 
                todo.style.display = 'flex';
            } else if(status === 'completed') {
                todo.style.display = 'none';
            }
        })
    })
    completedBtn.addEventListener('click', function() {
        const todos = document.querySelectorAll('.todo')
        todos.forEach(todo => {
            const status = todo.getAttribute('data-status');
            if(status === 'completed') { 
                todo.style.display = 'flex';
            } else if(status === 'active') {
                todo.style.display = 'none';
            }
        })
    })
}

todoEvents()

// Toggle Dark Mode

const lightBtn = document.querySelector('.light-toggle');

lightBtn.addEventListener('click', function() {
    document.querySelector('body').classList.toggle('dark-mode');
})