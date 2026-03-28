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
}
