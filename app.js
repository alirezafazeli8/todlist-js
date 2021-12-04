"use strict";

const todosForm = document.getElementById("todos-form");
const todosContainer = document.getElementById("todos-container");
const todosInput = document.getElementById("input-task");
const keyOfLocal = `todo-list-local-key=[1638620398927]`;
const todos = [];
const allTodos = JSON.parse(localStorage.getItem(keyOfLocal));

deleteTodos();

todosContainer.addEventListener("change", function (e) {
  compeleteTask(e.target);
});

if (allTodos) {
  allTodos.forEach((item) => {
    todos.push(item);
    renderHTML(item);
  });
}

document.querySelectorAll(".todosContainer").forEach((value) => {
  const getAll = todos
    .filter((item) => value.id == item.id)
    .forEach((all) => {
      switch (all.compelete) {
        case true:
          value.style.backgroundColor = "green";
          value.querySelector("input[type='checkbox']").checked = true;
          break;

        case false:
          value.style.backgroundColor = "yellow";
          value.querySelector("input[type='checkbox']").checked = false;
          break;
      }
    });
});

const returnTheValueOfKey = function (key) {
  return JSON.parse(localStorage.getItem(key));
};

todosForm.addEventListener("submit", function (e) {
  e.preventDefault();

  renderTasks(todosInput.value);
});

function renderTasks(inputvalue) {
  if (inputvalue === "") return;

  const taskObject = {
    name: inputvalue,
    id: new Date().valueOf(),
    compelete: false,
  };

  todosInput.value = "";
  todos.push(taskObject);
  renderHTML(taskObject);
  saveToLocal();
}

function renderHTML(obj) {
  const HTML = `
        <div id="${obj.id}" class="todosContainer">
            <p>${obj.name}</p>
            <input type="checkbox">
            <hr>
            <button class="remove-button">delete</button>
        </div>
    `;

  todosContainer.insertAdjacentHTML("afterbegin", HTML);
}

function deleteTodos() {
  todosContainer.addEventListener("click", (e) => {
    if (e.target.classList.contains("remove-button")) {
      const container = e.target.parentElement;
      const indexOfTarget = todos.findIndex(
        (value) => value.id == container.id
      );
      todos.splice(indexOfTarget, 1);
      container.remove();
      saveToLocal();
    }
  });
}

function compeleteTask(target) {
  const checkbox = target;
  const container = checkbox.parentElement;
  const indexOfTarget = todos.findIndex((value) => value.id == container.id);

  switch (checkbox.checked) {
    case true:
      container.style.backgroundColor = "green";
      todos[indexOfTarget].compelete = true;
      break;

    case false:
      container.style.backgroundColor = "yellow";
      todos[indexOfTarget].compelete = false;
      break;

    default:
      saveToLocal();
  }
}

function saveToLocal() {
  localStorage.setItem(keyOfLocal, JSON.stringify(todos));
}
