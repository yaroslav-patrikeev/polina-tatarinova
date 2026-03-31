const TabStatus = Object.freeze({
  ALL: "ALL", 
  COMPLETED: "COMPLETED", 
  UNCOMPLETED: "UNCOMPLETED", 
  IMPORTANT: "IMPORTANT", 
});

class TaskList {
  constructor() {
    this.list = []; 
    this.id = 0; 
    this.currentList = []; 
    this.allTasksCount = 0; 
    this.activeTasksCount = 0; 
    this.completedTasksCount = 0; 
    this.currentTab = TabStatus.ALL;
    this.searchString = ""; 
    this.init();
  }

  #createTask(title) {
    this.list.push({
      title, 
      isCompleted: false, 
      isImportant: false, 
      id: this.id++, 
    });
    this.allTasksCount++; 
    this.activeTasksCount++; 
    this.#render();
  }

  #deleteTaskById(id) {
    if (typeof id !== "number" || !Number.isInteger(id) || id < 0) {
      throw new Error("id должен быть целым неотрицательным числом");
    }
    let deletedTask = null; 
    this.list = this.list.reduce((acc, task) => {
      if (task.id === id) {
        deletedTask = task;
      } else {
        acc.push(task);
      }
      return acc;
    }, []);
    if (!deletedTask) {
      throw new Error(`Задача с id ${id} не найдена`);
    } 
    this.allTasksCount--; 
    if (deletedTask.isCompleted) {
      this.completedTasksCount--;
    } else {
      this.activeTasksCount--;
    } 
    this.#calculateCurrentList();
    this.#render();
  }

  #toggleImportantById(id) {
    if (typeof id !== "number" || !Number.isInteger(id) || id < 0) {
      throw new Error("id должен быть целым неотрицательным числом");
    }
    const task = this.list.find((task) => task.id === id);
    if (!task) {
      throw new Error(`Задача с id ${id} не найдена`); 
    }
    task.isImportant = !task.isImportant;
    this.#calculateCurrentList();
    this.#render();
  }

  #toggleCompleteById(id) {
    if (typeof id !== "number" || !Number.isInteger(id) || id < 0) {
      throw new Error("id должен быть целым неотрицательным числом");
    } 
    const task = this.list.find((task) => task.id === id); 
    if (!task) {
      throw new Error(`Задача с id ${id} не найдена`);
    }
    if (task.isCompleted) {
      task.isCompleted = false;
      this.completedTasksCount--;
      this.activeTasksCount++;
    } else {
      task.isCompleted = true;
      this.activeTasksCount--;
      this.completedTasksCount++;
    }
    this.#calculateCurrentList();
    this.#render();
  }

  #calculateCurrentList() {
    if (!Object.values(TabStatus).includes(this.currentTab)) {
      throw new Error(`Недопустимое значение currentTab: ${this.currentTab}`);
    } 
    const lowerSearch = this.searchString.trim().toLowerCase(); 

    const filteredList = this.list.filter((task) => {
      let matchesTab = true; 
      if (this.currentTab === TabStatus.COMPLETED) {
        matchesTab = task.isCompleted; 
      } else if (this.currentTab === TabStatus.UNCOMPLETED) {
        matchesTab = !task.isCompleted; 
      } else if (this.currentTab === TabStatus.IMPORTANT) {
        matchesTab = task.isImportant; 
      }
      const matchesSearch = task.title.toLowerCase().includes(lowerSearch);
      return matchesTab && matchesSearch;
    });

    this.currentList = filteredList;
    return this.currentList;
  }

  #render() {
    this.#calculateCurrentList(); 
    const container = document.querySelector(".task-list"); 
    container.innerHTML = ""; 
    const template = document.querySelector("#task-template"); 
    if (!template) {
      const err = new Error("Шаблон для задачи не найден");
      console.error(err);
      return;
    }

    this.currentList.forEach((task) => {
      const partTask = template.content.cloneNode(true);
      const taskItem = partTask.querySelector(".task-list__item");
      const taskCheckbox = partTask.querySelector(".task-list__checkbox");
      const taskText = partTask.querySelector(".task-list__text");
      const taskStarButton = partTask.querySelector(".task-list__star");
      const taskDeleteButton = partTask.querySelector(".task-list__delete");

      taskText.textContent = task.title; 
      taskCheckbox.checked = task.isCompleted;
      taskStarButton.addEventListener("click", () => {
        this.toggleImportantById(task.id);
      });
      if (task.isCompleted) {
        taskItem.classList.add("task-list__item_completed");
        taskText.classList.add("task-list__text_deletable");
      }
      if (task.isImportant) {
        taskStarButton.classList.add("task-list__star_active");
      }

      taskCheckbox.addEventListener("change", () => {
        this.toggleCompleteById(task.id);
      });

      taskDeleteButton.addEventListener("click", () => {
        this.deleteTaskById(task.id);
      });
      container.appendChild(partTask);
    });
    document.getElementById("total-tasks-count").textContent =
      this.allTasksCount;
    document.getElementById("active-tasks-count").textContent =
      this.activeTasksCount;
    document.getElementById("completed-tasks-count").textContent =
      this.completedTasksCount;
  }

  init() {
    const addTaskButton = document.querySelector("#add-task-button");
    const taskInput = document.querySelector("#task-input");
    
     addTaskButton.addEventListener("click", () => {
       const title = taskInput.value.trim();
       if (title === "") {
         alert("Вы не можете добавить пустую задачу");
         return;
       }
       this.№(title);
       taskInput.value = "";
     });

    const searchInput = document.querySelector("#task-search-input");
    searchInput.addEventListener("input", (e) => {
      this.searchString = e.target.value;
      this.#render();
    });

    const filterAll = document.getElementById("filter-all-button");
    const filterActive = document.getElementById("filter-active-button");
    const filterCompleted = document.getElementById("filter-completed-button");
    const filterImportant = document.getElementById("filter-important-button");

    function setActiveButton(activeBtn) {
      [filterAll, filterActive, filterCompleted, filterImportant].forEach(
        (btn) => {
          btn.classList.remove("status-buttons__button_active");
        },
      );
      activeBtn.classList.add("status-buttons__button_active");
    }
    filterAll.addEventListener("click", () => {
      this.currentTab = TabStatus.ALL;
      setActiveButton(filterAll);
      this.#render();
    });
    filterActive.addEventListener("click", () => {
      this.currentTab = TabStatus.UNCOMPLETED;
      setActiveButton(filterActive);
      this.#render();
    });
    filterCompleted.addEventListener("click", () => {
      this.currentTab = TabStatus.COMPLETED;
      setActiveButton(filterCompleted);
      this.#render();
    });
    filterImportant.addEventListener("click", () => {
      this.currentTab = TabStatus.IMPORTANT;
      setActiveButton(filterImportant);
      this.#render();
    });

  }
}

const checkingTaskRendering = new TaskList();
checkingTaskRendering.#createTask("Выгулять Шамана");
checkingTaskRendering.#createTask("Сделать дз");
checkingTaskRendering.calculateCurrentList(TabStatus.ALL, "");
const container = document.querySelector(".task-list");
checkingTaskRendering.render(container);
