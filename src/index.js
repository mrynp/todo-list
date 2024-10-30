import "./styles.css";

const todoList = [];
const projects = { Today: todoList };
let currentProject = "Today";

function Todo(title, status = false) {
  this.title = title;
  this.status = status;
}

function addToTodoList(title, status = false) {
  projects[currentProject].push(new Todo(title, status));
  displayTodo();
}

function displayNav() {
  const nav = document.createElement("nav");
  const projectsContainer = document.createElement("div");

  const todoAll = document.createElement("button");
  todoAll.textContent = "All tasks";

  todoAll.addEventListener("click", displayAllTodo);

  const todoToday = document.createElement("button");
  todoToday.textContent = "Today's tasks";

  todoToday.addEventListener("click", () => {
    currentProject = "Today";
    displayTodo();
  });

  const form = document.createElement("form");
  const project = document.createElement("input");
  project.type = "text";
  project.name = "project";
  project.placeholder = "+ New Project";
  project.required = true;

  const addButton = document.createElement("button");
  addButton.type = "submit";
  addButton.textContent = "Add";

  form.appendChild(project);
  form.appendChild(addButton);

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const projectName = formData.get("project");
    if (!projects[projectName]) {
      projects[projectName] = [];
      const projectButton = createProjectButton(projectName);
      projectsContainer.appendChild(projectButton);
    }

    form.reset();
  });

  projectsContainer.appendChild(todoToday);
  nav.appendChild(todoAll);
  nav.appendChild(projectsContainer);
  nav.appendChild(form);

  return nav;
}

function createProjectButton(projectName) {
  const projectButton = document.createElement("button");
  projectButton.textContent = projectName;
  projectButton.className = "project-button";

  projectButton.addEventListener("click", () => {
    currentProject = projectName;
    displayTodo();
  });

  return projectButton;
}

function displayTodoContainer() {
  const todoContainer = document.querySelector(".todo-container");

  const todoHeader = document.createElement("h1");
  todoHeader.textContent = `${currentProject} Todo List`;

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
  const todoHeader = document.querySelector(".todo-container h1");

  todoHeader.textContent = `${currentProject} Todo List`;

  todoListContainer.innerHTML = "";

  projects[currentProject].forEach((todo, index) => {
    const div = document.createElement("div");
    div.className = "todo";

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = todo.status;

    checkbox.addEventListener("change", () => {
      todo.status = checkbox.checked;
      updateTodoList(index, todo.status);
    });

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "delete";
    deleteBtn.className = "delete";

    deleteBtn.addEventListener("click", () => {
      deleteTodo(index);
    });

    const title = document.createElement("p");
    title.className = "todo-title";
    title.textContent = todo.title;

    div.appendChild(checkbox);
    div.appendChild(title);
    div.appendChild(deleteBtn);
    todoListContainer.appendChild(div);
  });
}

function displayAllTodo() {
  const todoListContainer = document.querySelector(".todo-list-container");
  const todoHeader = document.querySelector(".todo-container h1");

  todoHeader.textContent = "All Todos";

  todoListContainer.innerHTML = "";

  for (const [projectName, todos] of Object.entries(projects)) {
    todos.forEach((todo, index) => {
      const div = document.createElement("div");
      div.className = "todo";

      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.checked = todo.status;

      checkbox.addEventListener("change", () => {
        todo.status = checkbox.checked;
        updateTodoList(index, todo.status);
      });

      const deleteBtn = document.createElement("button");
      deleteBtn.textContent = "delete";
      deleteBtn.className = "delete";

      deleteBtn.addEventListener("click", () => {
        deleteTodo(index);
      });

      const title = document.createElement("p");
      title.className = "todo-title";
      title.textContent = todo.title;

      div.appendChild(checkbox);
      div.appendChild(title);
      div.appendChild(deleteBtn);
      todoListContainer.appendChild(div);
    });
  }
}

function updateTodoList(index, status) {
  if (projects[currentProject][index]) {
    projects[currentProject][index].status = status;
  }
}

function deleteTodo(index) {
  projects[currentProject].splice(index, 1);
  displayTodo();
}

function displayTodoApp() {
  const main = document.createElement("main");
  const nav = displayNav();

  const todoContainer = document.createElement("div");
  todoContainer.classList.add("todo-container");

  main.appendChild(nav);
  main.appendChild(todoContainer);

  document.body.appendChild(main);

  displayTodoContainer();
}

displayTodoApp();
addToTodoList("read book", false);
addToTodoList("walk the dog", false);
