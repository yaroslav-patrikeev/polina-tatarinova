const TabStatus = Object.freeze({
  //объект который хранит
  // название вкладок(фильтров), Object.freeze делает
  // его неизменяемым
  ALL: "ALL", //это значит: положи в коробку вещь
  //  с названием ALL и значением (ВСЕ: "ВСЕ")
  COMPLETED: "COMPLETED", //вещь с названием COMPLETED
  // и значением "COMPLETED" (ЗАВЕРШЕНО: "ЗАВЕРШЕНО")
  UNCOMPLETED: "UNCOMPLETED", //вещь с названием UNCOMPLETED
  //  и значением "UNCOMPLETED" (НЕЗАВЕРШЕННЫЙ: "НЕЗАВЕРШЕННЫЙ")
  IMPORTANT: "IMPORTANT", //вещь с названием IMPORTANT и
  // значением "IMPORTANT" (ВАЖНО: "ВАЖНЫЙ")
});

class TaskList {
  constructor() {
    this.list = []; //пустой массив
    this.id = 0; // счётчик, который даёт каждой новой
    //  задаче уникальный номер.
    //  Первая задача получит id = 0, вторая id = 1 и так далее
    this.currentList = []; //он будет хранить только те задачи,
    // которые мы сейчас показываем
    // на экране (после фильтрации и поиска).
    //  Пока пустой (Текущий список)
    this.allTasksCount = 0; //Свойство, которое будет считать
    // общее количество задач. Пока ноль. (Количество всех задач)
    this.activeTasksCount = 0; //(Количество активных задач)
    //Количество активных (невыполненных) задач. Пока ноль.
    this.completedTasksCount = 0; //Количество выполненных задач.
    //  Пока ноль.(Завершенное количество задач)
  }

  createTask(title) {
    //Он принимает один параметр – title (текст новой задачи).
    this.list.push({
      //метод массивов, который
      // добавляет новый элемент в конец массива
      title, //Первое свойство объекта: title – это ключ,
      //  а значение берётся из параметра title.
      //  То есть мы записываем в задачу тот текст, который передали в метод
      isCompleted: false, //Свойство isCompleted означает
      //«выполнена ли задача». Сначала она не выполнена, поэтому false
      isImportant: false, // «важная ли задача». Сначала не важная, false
      id: this.id++, //уникальный номер. Мы присваиваем
      // ему текущее значение this.id (сейчас 0), а потом this.id++ увеличивает this.id на 1.
      // То есть после создания первой задачи this.id станет 1.
    });
    this.allTasksCount++; //Увеличиваем общее количество задач на 1
    this.activeTasksCount++; //Увеличиваем количество активных задач на 1
    //  (новая задача активна, потому что она не выполнена).
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
    if (deletedTask.isCompleted) {
      this.completedTasksCount--;
    } else {
      this.activeTasksCount--;
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
    //почему бы не хранить в самом и вызов рэндера
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

  render() {
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
      taskText.textContent = task.title;
      taskCheckbox.checked = task.isCompleted;
      if (task.isCompleted) {
        taskItem.classList.add("task-list__item_completed");
      }
      if (task.isImportant) {
        taskItem.classList.add("task-list__item_important");
      }
      if (taskStarButton && task.isImportant) {
        taskStarButton.classList.add("task-list__star_active");
      }

      container.appendChild(partTask);
    });
  }
}

const checkingTaskRendering = new TaskList();
checkingTaskRendering.createTask("Выгулять Шамана");
checkingTaskRendering.createTask("Сделать дз");
checkingTaskRendering.calculateCurrentList(TabStatus.ALL, "");
const container = document.querySelector(".task-list");
checkingTaskRendering.render(container);
