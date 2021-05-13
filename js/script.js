/* TODO */

// Page Elements
const todoInput = document.querySelector("#todo-input");
const todoBody = document.querySelector(".todo-body");
const todoList = document.querySelector(".todos");
const todoCountEl = document.querySelector(".item-count");
const tabBtns = document.querySelectorAll(".tab-btns button");
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

// Event listeners
todoInput.addEventListener("keyup", (e) => {
  if (e.key === "Enter" && e.target.value !== "") {
    addTodo(e.target.value);
    e.target.value = "";
  }
});

clearBtn.addEventListener("click", clearCompleted);

tabBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    let show, hide;
    if (btn.classList.contains("all")) {
      show = document.querySelectorAll(".todo");
    } else if (btn.classList.contains("active")) {
      show = document.querySelectorAll('.todo[data-status="active"]');
      hide = document.querySelectorAll('.todo[data-status="completed"]');
    } else if (btn.classList.contains("completed")) {
      show = document.querySelectorAll('.todo[data-status="completed"]');
      hide = document.querySelectorAll('.todo[data-status="active"]');
    }
    show.forEach((el) => {
      el.style.display = "flex";
    });
    hide.forEach((el) => {
      el.style.display = "none";
    });
  });
});

todoEvents();

// Toggle Dark Mode

const lightBtn = document.querySelector(".light-toggle");

lightBtn.addEventListener("click", function () {
  document.querySelector("body").classList.toggle("dark-mode");
});
