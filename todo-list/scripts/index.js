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
  }

  createTask(title) {
    this.list.push({
      title,
      isCompleted: false,
      isImportant: false,
      id: this.id++,
    });
    this.allTasksCount++;
    this.activeTasksCount++;
  }

  deleteTaskById(id) {
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
  }

  toggleImportantById(id) {
    if (typeof id !== "number" || !Number.isInteger(id) || id < 0) {
      throw new Error("id должен быть целым неотрицательным числом");
    }
    const task = this.list.find((task) => task.id === id);
    if (!task) {
      throw new Error(`Задача с id ${id} не найдена`);
    }
    task.isImportant = !task.isImportant;
  }

  toggleCompleteById(id) {
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
  }

  calculateCurrentList(currentTab, searchString = "") {
    if (!Object.values(TabStatus).includes(currentTab)) {
      throw new Error(`Недопустимое значение currentTab: ${currentTab}`);
    }
    const lowerSearch = searchString.trim().toLowerCase();

    const filteredList = this.list.filter((task) => {
      let matchesTab = true;
      if (currentTab === TabStatus.COMPLETED) {
        matchesTab = task.isCompleted;
      } else if (currentTab === TabStatus.UNCOMPLETED) {
        matchesTab = !task.isCompleted;
      } else if (currentTab === TabStatus.IMPORTANT) {
        matchesTab = task.isImportant;
      }
      const matchesSearch = task.title.toLowerCase().includes(lowerSearch);
      return matchesTab && matchesSearch;
    });

    this.currentList = filteredList;
    return this.currentList;
  }

  render(container) {
    container.innerHTML = "";
    const template = document.querySelector("#task-template");
    // if (!template) {
    //   const err = new Error("Шаблон для задачи не найден");
    //   console.error(err); // это я записала для проверки кода в псоледующем, а так уберу, хочу оставить только alert, как для пользователя
    //   alert(err.message); // в курсе что можно сделать просто alert("Шаблон для задачи не найден");, но моя цель поработать с error
    //   return;
    // }
    for (let i = 0; i < this.currentList.length; i++) {
      //пробовала через forEach, но что то очень сильно пошло не так,
      // не смогла разобраться, поэтому написала через for, как будто бы для меня так проще,
      // но я знаю
      // что ты скажешь черз массив переписывать, но хотя бы роботоспособность проверь пожалуйста
      const task = this.currentList[i];
      const partTask = template.content.cloneNode(true);
      const liTaskList = partTask.querySelector(".task-list__item");
      const checkboxTaskList = partTask.querySelector(".task-list__checkbox");
      const textTaskList = partTask.querySelector(".task-list__text");
      const starButtonTaskList = partTask.querySelector(".task-list__star");
      if (textTaskList) textTaskList.textContent = task.title;
      if (checkboxTaskList) checkboxTaskList.checked = task.isCompleted;
      if (liTaskList) {
        if (task.isCompleted)
          liTaskList.classList.add("task-list__item_completed");
        if (task.isImportant)
          liTaskList.classList.add("task-list__item_important");
      }
      if (starButtonTaskList && task.isImportant) {
        starButtonTaskList.classList.add("task-list__star_active");
      }

      container.appendChild(partTask);
    }
  }
}

//проверочка, вынесла в отдельную ветку что бы не смешивать с шагом 7
const checkingTaskRendering = new TaskList();
checkingTaskRendering.createTask("Выгулять Шамана");
checkingTaskRendering.createTask("Сделать дз");
checkingTaskRendering.calculateCurrentList(TabStatus.ALL, "");
const container = document.querySelector(".task-list"); 
checkingTaskRendering.render(container);
