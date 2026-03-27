 git commit -m "feature/PTATARINOVA-6 Подключить JS. Добавить в html контейнер для задач + template задачи"

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
//то что ниже мне дипсик сделал я код просто закинула туда и
// попросила проверку мне написать, что бы время сэкономить,
// до этого по отдельности проверяла, а это что бы красиво было

// ПРОВЕРКА РАБОТЫ
const taskList = new TaskList();

console.log("Начальное состояние:");
console.log("allTasksCount:", taskList.allTasksCount);
console.log("activeTasksCount:", taskList.activeTasksCount);
console.log("completedTasksCount:", taskList.completedTasksCount);
console.log("---");

// Создаем 3 задачи
taskList.createTask("Задача 1");
taskList.createTask("Задача 2");
taskList.createTask("Задача 3");

console.log("После создания 3 задач:");
console.log("allTasksCount:", taskList.allTasksCount);
console.log("activeTasksCount:", taskList.activeTasksCount);
console.log("completedTasksCount:", taskList.completedTasksCount);
console.log("Список задач:", taskList.list);
console.log("---");

// Переключаем выполнение через toggleCompleteById
taskList.toggleCompleteById(0);
console.log("После toggleCompleteById(0) (задача 1 стала выполненной):");
console.log("allTasksCount:", taskList.allTasksCount);
console.log("activeTasksCount:", taskList.activeTasksCount);
console.log("completedTasksCount:", taskList.completedTasksCount);
console.log("Задача 1 выполнена:", taskList.list[0].isCompleted);
console.log("---");

// Переключаем обратно через toggleCompleteById
taskList.toggleCompleteById(0);
console.log(
  "После повторного toggleCompleteById(0) (задача 1 стала невыполненной):",
);
console.log("allTasksCount:", taskList.allTasksCount);
console.log("activeTasksCount:", taskList.activeTasksCount);
console.log("completedTasksCount:", taskList.completedTasksCount);
console.log("---");

// Переключаем выполнение у задачи 2
taskList.toggleCompleteById(1);
console.log("После toggleCompleteById(1) (задача 2 стала выполненной):");
console.log("activeTasksCount:", taskList.activeTasksCount);
console.log("completedTasksCount:", taskList.completedTasksCount);
console.log("---");

// Переключаем важность
taskList.toggleImportantById(2);
console.log("После toggleImportantById(2) (задача 3 стала важной):");
console.log("Задача 3 важная:", taskList.list[2].isImportant);
console.log("---");

// Удаляем задачу
taskList.deleteTaskById(1);
console.log("После deleteTaskById(1) (удаляем задачу 2):");
console.log("allTasksCount:", taskList.allTasksCount);
console.log("activeTasksCount:", taskList.activeTasksCount);
console.log("completedTasksCount:", taskList.completedTasksCount);
console.log("Оставшиеся задачи:", taskList.list);
console.log("---");

// Проверяем calculateCurrentList
console.log("=== Проверка фильтрации ===");
console.log("Все задачи:", taskList.calculateCurrentList(TabStatus.ALL));
console.log("Выполненные:", taskList.calculateCurrentList(TabStatus.COMPLETED));
console.log(
  "Невыполненные:",
  taskList.calculateCurrentList(TabStatus.UNCOMPLETED),
);
console.log("Важные:", taskList.calculateCurrentList(TabStatus.IMPORTANT));
console.log(
  "Поиск 'задача':",
  taskList.calculateCurrentList(TabStatus.ALL, "задача"),
);
