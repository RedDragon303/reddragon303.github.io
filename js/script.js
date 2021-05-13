/* TODO */

// Page Elements
const todoInput = document.querySelector("#todo-input");
const todoBody = document.querySelector(".todo-body");
const todoList = document.querySelector(".todos");
const todoCountEl = document.querySelector(".item-count");
const allBtn = document.querySelector("button.all");
const activeBtn = document.querySelector("button.active");
const completedBtn = document.querySelector("button.completed");
const clearBtn = document.querySelector("button.clear");
let checkboxes;

// Empty array for adding todos to
let allTodos = [];

// Show active todo count
const todoCount = () => {
  const activeTodos = allTodos.filter((todo) => todo.status === "active");
  todoCountEl.textContent = activeTodos.length;
};

// Set todo to completed
const completeTodo = (el) => {
  el.setAttribute("data-status", "completed");
  todoCount();
};

// Insert todo into todo list
const insertTodo = (todoName) => {
  const html = `<div class="todo" data-status="active"><button class="checkbox"></button><p>${todoName}</p></div>`;
  todoBody.classList.add("active");
  todoList.insertAdjacentHTML("beforeend", html);
  checkboxes = document.querySelectorAll(".checkbox");
};

// Add click event to each checkbox
const checkboxFunctionality = () => {
  checkboxes.forEach((checkbox) => {
    checkbox.addEventListener("click", function (e) {
      const todoText = e.target.nextSibling.innerText;
      const todo = allTodos.find((t) => t.name === todoText);
      todo.status = "completed";
      completeTodo(e.target.parentElement);
    });
  });
};

// Drag & Drop for todo list (uses Sortable.min.js)
const dragNDrop = () => {
  const todos = document.querySelector(".todos");
  const sortableList = Sortable.create(todos);
};

// Create todo as object and add to allTodos array
const addTodo = (todoName) => {
  const todo = { name: todoName, status: "active" };
  allTodos.push(todo);
  insertTodo(todoName);
  todoCount();
  checkboxFunctionality();
  dragNDrop();
};

// Remove completed todos
const clearCompleted = () => {
  const completedTodos = document.querySelectorAll(
    '.todo[data-status="completed"]'
  );
  completedTodos.forEach((completed) => {
    completed.parentElement.removeChild(completed);
  });
  allTodos = allTodos.filter((todo) => todo.status === "active");
  todoCount();
};

// Add input and other event listeners
const todoEvents = () => {
  todoInput.addEventListener("keyup", (e) => {
    if (e.key === "Enter" && e.target.value !== "") {
      if (e.target.value) addTodo(e.target.value);
      e.target.value = "";
    }
  });
  clearBtn.addEventListener("click", function () {
    clearCompleted();
  });
  allBtn.addEventListener("click", function () {
    const todos = document.querySelectorAll(".todo");
    todos.forEach((todo) => (todo.style.display = "flex"));
  });
  activeBtn.addEventListener("click", function () {
    const todos = document.querySelectorAll(".todo");
    todos.forEach((todo) => {
      const status = todo.getAttribute("data-status");
      todo.style.display = status === "active" ? "flex" : "none";
    });
  });
  completedBtn.addEventListener("click", function () {
    const todos = document.querySelectorAll(".todo");
    todos.forEach((todo) => {
      const status = todo.getAttribute("data-status");
      todo.style.display = status === "completed" ? "flex" : "none";
    });
  });
};

todoEvents();

// Toggle Dark Mode

const lightBtn = document.querySelector(".light-toggle");

lightBtn.addEventListener("click", function () {
  document.querySelector("body").classList.toggle("dark-mode");
});
