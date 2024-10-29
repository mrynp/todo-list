import "./styles.css";

const todoList = [];

function Todo(title, status) {
  this.title = title;
  this.status = status;
}

function addToTodoList(title, status) {
  todoList.push(new Todo(title, status));
  displayTodo;
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

function displayTodo() {
  const todoContainer = document.createElement("div");
  todoContainer.classList.add("todo-container");

  const todoTitle = document.createElement("h1");
  todoTitle.textContent = "Todo Today";

  const todoListContainer = document.createElement("div");
  todoListContainer.classList.add("todo-list-container");
  todoListContainer.innerHTML = "";

  todoList.forEach((todo, index) => {
    const div = document.createElement("div");
    div.className = "todo";
    div.innerHTML = `<p class="todo-title">${todo.title}</p>`;

    todoListContainer.appendChild(div);
  });

  todoContainer.appendChild(todoTitle);
  todoContainer.appendChild(todoListContainer);

  return todoContainer;
}

function displayTodoApp() {
  const main = document.createElement("main");
  const nav = displayNav();
  const todoContainer = displayTodo();

  main.appendChild(nav);
  main.appendChild(todoContainer);

  document.body.appendChild(main);
}

addToTodoList("read book", false);
addToTodoList("walk the dog", false);
displayTodoApp();
