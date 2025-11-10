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
  search(keyword) {
    return this.tasks.filter((c) =>
      c.task.description.includes(keyword)
    );
  }

  status(check) {
    return this.tasks.filter((c) => c.task.status === check);
  }

  priority(level) {
    return this.tasks.filter((c) => c.task.priority === level);
  }

  getFilteredTasks() {
    return this.tasks.filter((c) => {
      const t = c.task;
      const matchSearch =this.searchKeyword === "" || t.title.includes(this.searchKeyword) || t.description.includes(this.searchKeyword);
      const matchStatus = this.statusFilter === "all" || t.status === this.statusFilter;
      const matchPriority = this.priorityFilter === "all" || t.priority === this.priorityFilter;

      return matchSearch && matchStatus && matchPriority;
    });
  }

  addTask(title, description, category, status, priority) {
    const newTask = { task: { title, description, category, status, priority } };
    this.tasks.push(newTask);
    return newTask;
  }

  getTasks() {
    return this.tasks;
  }
}

class renderManager {

  renderHeading() {
    return `<div class="heading"><h2>Task Manager</h2></div>`;
  }

  renderContainer() {
    return `<div class="container">
      <div class="child"><p>TOTAL TASK</p><h1 id="total">0</h1></div>
      <div class="child"><p>COMPLETE</p><h1 id="complete">0</h1></div>
      <div class="child"><p>PENDING</p><h1 id="pending">0</h1></div>
      <div class="child"><p>HIGH PRIORITY</p><h1 id="heat">0</h1></div>
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
        </div>
        <div id="task-list-output"></div>
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
          <div class="child-tag">${category}</div>
          <div class="child-tag child-color-${priority}">${priority}</div>
          <div class="child-tag">${status}</div>
        </div>
      </div>`;
  }
   mainRender(taskManager) {
    document.getElementById("app-root").innerHTML =
      this.renderHeading() +
      this.renderContainer() +
      this.renderForm() +
      this.renderTaskFilter();
  
  
    const filteredTasks = taskManager.getFilteredTasks();
    this.renderList(filteredTasks);
  }

  renderList(filteredTasks) {
    const output = document.getElementById("task-output");
    output.innerHTML = filteredTasks
      .map((value) => this.renderTaskList(value.task))
      .join("");
  }

}

class TaskController {
  constructor(taskManager) {
    this.taskManager = taskManager;
  }
addtask(title,description,category,priority){
    this.taskManager.addTask(title,description,category,priority)
    this.renderList(this.taskManager.getFilteredTasks());
  }
}
const controller = new TaskController(manager);

