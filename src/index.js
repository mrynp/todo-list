import "./styles.css";

const todoList = [];

function Todo(title, status = false) {
  this.title = title;
  this.status = status;
}

function addToTodoList(title, status) {
  todoList.push(new Todo(title, status));
  displayTodo();
}

function displayNav() {
  const nav = document.createElement("nav");

  const todoAll = document.createElement("button");
  todoAll.textContent = "All tasks";

  const todoToday = document.createElement("button");
  todoToday.textContent = "Today's tasks";

  nav.appendChild(todoAll);
  nav.appendChild(todoToday);

  return nav;
}

function displayTodoContainer() {
  const todoContainer = document.createElement("div");
  todoContainer.classList.add("todo-container");

  const todoHeader = document.createElement("h1");
  todoHeader.textContent = "Todo Today";

  const form = document.createElement("form");
  const todoTitle = document.createElement("input");
  todoTitle.type = "text";
  todoTitle.name = "title";
  todoTitle.placeholder = "Add a to-do";
  todoTitle.required = true;

  const addButton = document.createElement("button");
  addButton.type = "submit";
  addButton.textContent = "Add";

  form.appendChild(todoTitle);
  form.appendChild(addButton);

  const todoListContainer = document.createElement("div");
  todoListContainer.classList.add("todo-list-container");

  todoContainer.appendChild(todoHeader);
  todoContainer.appendChild(todoListContainer);
  todoContainer.appendChild(form);

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const title = formData.get("title");
    const status = false;

    addToTodoList(title, status);
    form.reset();
  });
  return todoContainer;
}

function displayTodo() {
  const todoListContainer = document.querySelector(".todo-list-container");
  todoListContainer.innerHTML = "";

  todoList.forEach((todo, index) => {
    const div = document.createElement("div");
    div.className = "todo";

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = todo.status;

    checkbox.addEventListener("change", () => {
      todo.status = checkbox.checked;
      updateTodoList(index, todo.status);
      console.log(`Todo "${todo.title}" status: ${todo.status}`);
    });
    const title = document.createElement("p");
    title.className = "todo-title";
    title.textContent = todo.title;

    div.appendChild(checkbox);
    div.appendChild(title);
    todoListContainer.appendChild(div);
  });
}

function updateTodoList(index, status) {
  if (todoList[index]) {
    todoList[index].status = status;
  }
}

function displayTodoApp() {
  const main = document.createElement("main");
  const nav = displayNav();
  const todoContainer = displayTodoContainer();

  main.appendChild(nav);
  main.appendChild(todoContainer);

  document.body.appendChild(main);
}

displayTodoApp();
addToTodoList("read book", false);
addToTodoList("walk the dog", false);
