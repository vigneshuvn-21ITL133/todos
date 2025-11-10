class TaskManager {
  constructor() {
    this.tasks = [
      {
        task: {
          title: "hospital",
          description: "High fever",
          category: "health",
          status: "complete",
          priority: "high"
        }
      },
      {
        task: {
          title: "front-end work",
          description: "today going to finish the front-end task",
          category: "work",
          status: "pending",
          priority: "medium"
        }
      },
      {
        task: {
          title: "study for exam",
          description: "study the chapter and 1-12",
          category: "learning",
          status: "complete",
          priority: "low"
        }
      },
      {
        task: {
          title: "travelling",
          description: "travelling to tamilnadu to kerala",
          category: "travel",
          status: "pending",
          priority: "high"
        }
      }
    ];

    this.searchKeyword = "";
    this.statusFilter = "all";
    this.priorityFilter = "all";
  }

  getFilteredTasks() {
    return this.tasks.filter((c) => {
      const t = c.task;
      const matchSearch =
        this.searchKeyword === "" ||
        t.title.toLowerCase().includes(this.searchKeyword.toLowerCase()) ||
        t.description.toLowerCase().includes(this.searchKeyword.toLowerCase());
      const matchStatus =
        this.statusFilter === "all" || t.status === this.statusFilter;
      const matchPriority =
        this.priorityFilter === "all" || t.priority === this.priorityFilter;

      return matchSearch && matchStatus && matchPriority;
    });
  }

  addTask(title, description, category, status, priority) {
    const newTask = { task: { title, description, category, status, priority } };
    this.tasks.push(newTask);
    return newTask;
  }
}

class RenderManager {
  renderHeading() {
    return `<div class="heading"><h2>Task Manager</h2></div>`;
  }

  renderContainer(total, complete, pending, highPriority) {
    return `
      <div class="container">
        <div class="child"><p>TOTAL TASKS</p><h1 id="total" style="color:blue; font-size:30px">${total}</h1></div>
        <div class="child"><p>COMPLETE</p><h1 id="complete" style="color:green; font-size:30px">${complete}</h1></div>
        <div class="child"><p>PENDING</p><h1 id="pending"   style="color:orange; font-size:30px">${pending}</h1></div>
        <div class="child"><p>HIGH PRIORITY</p><h1 id="high" style="color:red; font-size:30px">${highPriority}</h1></div>
      </div>`;
  }

  renderForm() {
    return `
      <div class="form-container">
        <h1 style="padding-left: 60px;">Add new Task</h1>
        <form id="form-input">
          <div class="child1">
            <label>Task Title</label>
            <input type="text" id="title" required>
            <label>Category</label>
            <select id="category">
              <option value="learning">learning</option>
              <option value="health">health</option>
              <option value="work">work</option>
              <option value="personal">personal</option>
            </select>
          </div>
          <div class="description">
            <label>Description</label>
            <input type="text" id="description">
          </div>
          <div class="child2">
            <label>Priority</label>
            <select id="add-priority">
              <option value="high">high</option>
              <option value="medium">medium</option>
              <option value="low">low</option>
            </select>
            <label>Status</label>
            <select id="status">
              <option value="pending">pending</option>
              <option value="complete">complete</option>
            </select>
          </div>
          <div class="submit-form">
            <button class="btn1" id="btn-add">Add task</button>
          </div>
        </form>
      </div>`;
  }

  renderTaskFilter() {
    return `
      <div class="task-list">
        <h2>Tasks</h2>
        <div class="task-filter">
          <input type="text" placeholder="search task..." id="search">
          <label>Status:</label>
          <select id="status-filter">
            <option value="all">All</option>
            <option value="pending">Pending</option>
            <option value="complete">Complete</option>
          </select>
          <label>Priority:</label>
          <select id="priority-filter">
            <option value="all">All</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
          <button id="btn-filter" class="btn1">Filter</button>
        </div>
        <div id="task-output"></div>
      </div>`;
  }

  renderTaskList(taskObj) {
    const { title, description, category, priority, status } = taskObj;
    const colorClass =
      priority === "high"
        ? "list-red"
        : priority === "medium"
        ? "list-orange"
        : "list-green";

    return `
      <div class="list-item ${colorClass}">
        <h3>${title}</h3>
        <p>${description}</p>
        <div class="tags1">
          <div class="child-tag ">${category}</div>
          <div class="child-tag child-color-${priority}">${priority}</div>
          <div class="child-tag">${status}</div>
        </div>
      </div>`;
  }

  mainRender(filteredTasks) {
    const renderedList = filteredTasks.map((list) => this.renderTaskList(list.task)).join("");


    const total = filteredTasks.length;
    const complete = filteredTasks.filter((count) => count.task.status === "complete").length;
    const pending = filteredTasks.filter((count) => count.task.status === "pending").length;
    const highPriority = filteredTasks.filter((count) => count.task.priority === "high").length;

    const ui =
      this.renderHeading() +
      this.renderContainer(total, complete, pending, highPriority) +
      this.renderForm() +
      this.renderTaskFilter() +
      renderedList;

    document.getElementById("app-root").innerHTML = ui;
  }
}

class TaskController {
  constructor(taskManager, renderManager) {
    this.taskManager = taskManager;
    this.renderManager = renderManager;
  }

  addTask(title, description, category, status, priority) {
    this.taskManager.addTask(title, description, category, status, priority);
    const filteredTasks = this.taskManager.getFilteredTasks();
    this.renderManager.mainRender(filteredTasks);
    // new UIController(this); 
  }

  filterTasks(searchKeyword, statusFilter, priorityFilter) {
    this.taskManager.searchKeyword = searchKeyword;
    this.taskManager.statusFilter = statusFilter;
    this.taskManager.priorityFilter = priorityFilter;

    const filteredTasks = this.taskManager.getFilteredTasks();
    this.renderManager.mainRender(filteredTasks);
    // new UIController(this); 
    }
}

const taskManager = new TaskManager();
const renderManager = new RenderManager();
const controller = new TaskController(taskManager, renderManager);
const filteredTasks = taskManager.getFilteredTasks();
renderManager.mainRender(filteredTasks);

class UIController {
  constructor(controller) {
    this.controller = controller;

    const addBtn = document.getElementById("btn-add");
    const filterBtn = document.getElementById("btn-filter");

    if (addBtn) {
      addBtn.addEventListener("click", (event) => {
        event.preventDefault();
        this.handleAddtask();
      });
    }

    if (filterBtn) {
      filterBtn.addEventListener("click", (event) => {
        event.preventDefault();
        this.handleFiltertasks();
      });
    }
  }

  handleAddtask() {
    const title = document.getElementById("title").value.trim();
    const category = document.getElementById("category").value;
    const description = document.getElementById("description").value.trim();
    const priority = document.getElementById("add-priority").value;
    const status = document.getElementById("status").value;

    this.controller.addTask(title, description, category, status, priority);
    document.getElementById("form-input").reset();
  }

  handleFiltertasks() {
    const searchKeyword = document.getElementById("search").value.trim();
    const statusFilter = document.getElementById("status-filter").value;
    const priorityFilter = document.getElementById("priority-filter").value;

    this.controller.filterTasks(searchKeyword, statusFilter, priorityFilter);
  }
}


new UIController(controller);
