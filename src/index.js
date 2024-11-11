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
  if (currentProject === "All Tasks" && projects["Today"]) {
    projects["Today"].push(new Todo(title, status));
  }

  displayTodo();
}

function setActiveButton(button) {
  document
    .querySelectorAll(".all-button, .today-button, .project-button")
    .forEach((btn) => {
      btn.classList.remove("active");
    });
  button.classList.add("active");
}

function displayNav() {
  const nav = document.createElement("nav");
  const projectsContainer = document.createElement("div");

  const todoAll = document.createElement("button");
  todoAll.className = "all-button";
  todoAll.textContent = "All tasks";

  todoAll.addEventListener("click", () => {
    setActiveButton(todoAll);
    displayAllTodo();
  });

  const todoToday = document.createElement("button");
  todoToday.className = "today-button active";
  todoToday.textContent = "Today's tasks";

  todoToday.addEventListener("click", () => {
    setActiveButton(todoToday);
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
  addButton.textContent = "add";
  addButton.style.display = "none";

  project.addEventListener("input", () => {
    if (project.value.trim()) {
      addButton.style.display = "block";
      project.style.borderBottom = "1px solid black";
    } else {
      addButton.style.display = "none";
      project.style.borderBottom = "none";
    }
  });

  form.appendChild(project);
  form.appendChild(addButton);

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const projectName = capitalizeFirstLetter(formData.get("project"));
    if (!projects[projectName]) {
      projects[projectName] = [];
      const projectButton = createProjectButton(projectName);
      projectsContainer.appendChild(projectButton);
    }
    addButton.style.display = "none";
    project.style.borderBottom = "none";
    form.reset();
  });

  projectsContainer.appendChild(todoToday);
  nav.appendChild(todoAll);
  nav.appendChild(projectsContainer);
  nav.appendChild(form);

  return nav;
}

function createProjectButton(projectName) {
  const projectContainer = document.createElement("div");
  projectContainer.className = "project-container";

  const projectButton = document.createElement("button");
  projectButton.textContent = projectName;
  projectButton.className = "project-button";

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "delete";
  deleteBtn.className = "delete delete-project";
  deleteBtn.style.display = "none";

  projectContainer.addEventListener("mouseover", () => {
    deleteBtn.style.display = "block";
  });

  projectContainer.addEventListener("mouseleave", () => {
    deleteBtn.style.display = "none";
  });

  projectButton.addEventListener("click", () => {
    setActiveButton(projectButton);
    currentProject = projectName;
    displayTodo();
  });

  deleteBtn.addEventListener("click", () => {
    delete projects[projectName];

    if (currentProject === projectName) {
      currentProject = "Today";
      displayTodo();
    }

    projectContainer.remove();
  });

  projectContainer.appendChild(projectButton);
  projectContainer.appendChild(deleteBtn);

  return projectContainer;
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}

function displayTodoContainer() {
  const todoContainer = document.querySelector(".todo-container");

  const todoHeader = document.createElement("h1");
  todoHeader.textContent = `${currentProject} Todo List`;

  const form = document.createElement("form");
  const todoTitle = document.createElement("input");
  todoTitle.type = "text";
  todoTitle.name = "title";
  todoTitle.placeholder = "+ Add a to do";
  todoTitle.required = true;

  const addButton = document.createElement("button");
  addButton.type = "submit";
  addButton.textContent = "add";
  addButton.style.display = "none";

  todoTitle.addEventListener("input", () => {
    if (todoTitle.value.trim()) {
      addButton.style.display = "block";
      todoTitle.style.borderBottom = "1px solid black";
    } else {
      addButton.style.display = "none";
      todoTitle.style.borderBottom = "none";
    }
  });

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
    addButton.style.display = "none";
    todoTitle.style.borderBottom = "none";
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

    const checkboxWrapper = document.createElement("div");
    checkboxWrapper.className = "checkbox-wrapper-62";
    checkboxWrapper.innerHTML = `
      <input type="checkbox" class="check" id="check-${todo.title}-${index}" ${
      todo.status ? "checked" : ""
    } />
      <label for="check-${todo.title}-${index}" class="label">
        <svg width="43" height="43" viewBox="0 0 90 90">
          <rect x="30" y="20" width="50" height="50" stroke="black" fill="none" />
          <g transform="translate(0,-952.36218)">
            <path d="m 13,983 c 33,6 40,26 55,48" stroke="black" stroke-width="3" class="path1" fill="none" />
            <path d="M 75,970 C 51,981 34,1014 25,1031" stroke="black" stroke-width="3" class="path1" fill="none" />
          </g>
        </svg>
      </label>
    `;
    const checkbox = checkboxWrapper.querySelector(".check");
    checkbox.addEventListener("change", () => {
      updateTodoList(index, checkbox.checked);
    });

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "delete";
    deleteBtn.className = "delete";
    deleteBtn.style.display = "none";

    deleteBtn.addEventListener("click", () => {
      deleteTodo(index);
    });

    div.addEventListener("mouseover", function () {
      deleteBtn.style.display = "block";
    });
    div.addEventListener("mouseleave", function () {
      deleteBtn.style.display = "none";
    });

    const title = document.createElement("p");
    title.className = "todo-title";
    title.textContent = todo.title;

    div.appendChild(checkboxWrapper);
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

      const checkboxWrapper = document.createElement("div");
      checkboxWrapper.className = "checkbox-wrapper-62";
      checkboxWrapper.innerHTML = `
      <input type="checkbox" class="check" id="check-${projectName}-${index}" ${
        todo.status ? "checked" : ""
      } />
      <label for="check-${projectName}-${index}" class="label">
        <svg width="43" height="43" viewBox="0 0 90 90">
          <rect x="30" y="20" width="50" height="50" stroke="black" fill="none" />
          <g transform="translate(0,-952.36218)">
            <path d="m 13,983 c 33,6 40,26 55,48" stroke="black" stroke-width="3" class="path1" fill="none" />
            <path d="M 75,970 C 51,981 34,1014 25,1031" stroke="black" stroke-width="3" class="path1" fill="none" />
          </g>
        </svg>
      </label>
    `;

      const checkbox = checkboxWrapper.querySelector(".check");
      checkbox.addEventListener("change", () => {
        updateTodoList(index, checkbox.checked, projectName);
      });

      const deleteBtn = document.createElement("button");
      deleteBtn.textContent = "delete";
      deleteBtn.className = "delete";
      deleteBtn.style.display = "none";

      deleteBtn.addEventListener("click", () => {
        deleteTodo(index, projectName);
        displayAllTodo();
      });

      div.addEventListener("mouseover", function () {
        deleteBtn.style.display = "block";
      });
      div.addEventListener("mouseleave", function () {
        deleteBtn.style.display = "none";
      });

      const title = document.createElement("p");
      title.className = "todo-title";
      title.textContent = todo.title;

      div.appendChild(checkboxWrapper);
      div.appendChild(title);
      div.appendChild(deleteBtn);

      todoListContainer.appendChild(div);
    });
  }
}

function updateTodoList(index, status, projectName = currentProject) {
  if (projects[projectName] && projects[projectName][index]) {
    projects[projectName][index].status = status;
  }
}

function deleteTodo(index, projectName = currentProject) {
  if (projects[projectName]) {
    projects[projectName].splice(index, 1);
  }
  if (projectName === currentProject) {
    displayTodo();
  }
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
