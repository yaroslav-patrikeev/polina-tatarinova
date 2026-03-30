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
    this.currentTab = TabStatus.ALL; //какая вкладка (фильтр) выбрана пользователем
    this.searchString = ""; // хранит текст, который пользователь ввёл в поле поиска.
    // При каждом изменении поиска мы обновляем this.searchString и
    // снова пересчитываем список, чтобы оставить
    // только задачи, в названии которых есть эта строка (без учёта регистра).
    this.init();
  }

  createTask(title) {
    console.log(title);
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
    this.render();
  }

  deleteTaskById(id) {
    //Удаляет задачу по её номеру id
    if (typeof id !== "number" || !Number.isInteger(id) || id < 0) {
      throw new Error("id должен быть целым неотрицательным числом");
    }
    // typeof id – узнаёт тип переменной id.
    // Если это не "number" (не число), то условие срабатывает.
    //!Number.isInteger(id) – функция Number.isInteger проверяет,
    //является ли число целым. Если нет, то ! делает true.
    //id < 0 – проверяет, не отрицательное ли число.
    //Если хотя бы одно из этих условий верно, мы выбрасываем ошибку (
    //throw new Error) с текстом. Программа остановится и покажет эту ошибку.
    let deletedTask = null; //Объявляем переменную deletedTask и
    // присваиваем ей значение null. Сюда мы запишем ту задачу,
    // которую удаляем, чтобы потом знать, была ли она выполнена
    this.list = this.list.reduce((acc, task) => {
      //Мы перезаписываем this.list новым массивом,
      // который создаётся с помощью метода reduce, он проходит по
      // каждому элементу массива this.list.
      // У него есть начальное значение –
      // пустой массив [] (это acc – аккумулятор).
      //Для каждой задачи (task) мы смотрим: если task.id === id,
      // значит, это задача, которую надо удалить. Тогда мы записываем её
      // в deletedTask и не добавляем в новый массив. Если task.id не равен id,
      // мы добавляем task в новый массив (acc.push(task)).
      if (task.id === id) {
        deletedTask = task;
      } else {
        acc.push(task);
      }
      return acc;
    }, []);
    if (!deletedTask) {
      throw new Error(`Задача с id ${id} не найдена`);
    } //Если после цикла deletedTask всё ещё null, значит,
    // задача с таким id не была найдена. Выбрасываем ошибку.
    this.allTasksCount--; //Уменьшаем общее количество задач на 1
    if (deletedTask.isCompleted) {
      this.completedTasksCount--;
    } else {
      this.activeTasksCount--;
    } //Если удалённая задача была выполнена,
    // то уменьшаем счётчик выполненных задач.
    // Иначе (если была активной) – уменьшаем счётчик активных задач.
    this.calculateCurrentList();
    this.render();
  }

  toggleImportantById(id) {
    //Переключает важность задачи (если была важная –
    // становится обычной, и наоборот).
    if (typeof id !== "number" || !Number.isInteger(id) || id < 0) {
      throw new Error("id должен быть целым неотрицательным числом");
    }
    const task = this.list.find((task) => task.id === id);
    if (!task) {
      throw new Error(`Задача с id ${id} не найдена`); //Если task не найден (!task значит «если нет задачи»), выбрасываем ошибку.
    }
    task.isImportant = !task.isImportant;
    //Берём свойство isImportant у найденной задачи и меняем на противоположное.
    // ! означает «не». Если было true, станет false. Если было false, станет true
    this.calculateCurrentList();
    this.render();
  }

  toggleCompleteById(id) {
    //Переключает выполненность задачи.
    if (typeof id !== "number" || !Number.isInteger(id) || id < 0) {
      throw new Error("id должен быть целым неотрицательным числом");
    } //проверка правильности фйди что не отрицательное и число
    const task = this.list.find((task) => task.id === id); //Ищем задачу
    if (!task) {
      throw new Error(`Задача с id ${id} не найдена`);
    }
    if (task.isCompleted) {
      task.isCompleted = false;
      this.completedTasksCount--;
      this.activeTasksCount++;
      //Если задача уже выполнена (task.isCompleted === true),
      // то делаем её невыполненной (false),
      // уменьшаем счётчик выполненных и увеличиваем счётчик активных.
    } else {
      task.isCompleted = true;
      this.activeTasksCount--;
      this.completedTasksCount++;
      //сли задача не выполнена, то делаем её выполненной (true),
      //  уменьшаем счётчик активных и увеличиваем счётчик выполненных.
    }
    this.calculateCurrentList();
    this.render();
  }

  calculateCurrentList() {
    //должен отфильтровать список задач по выбранной вкладке и по поиску.
    //  Я в нём использую внутренние свойства объекта:
    // this.currentTab (текущая вкладка) и this.searchString (строка поиска).
    if (!Object.values(TabStatus).includes(this.currentTab)) {
      throw new Error(`Недопустимое значение currentTab: ${this.currentTab}`);
    } //проверяю на всякий на ошибку
    const lowerSearch = this.searchString.trim().toLowerCase(); // тут беру текст поиска
    // (this.searchString), убира. лишние пробелы в начале и конце (.trim()),
    // потом делаю все буквы маленькими (.toLowerCase()). Это нужно, чтобы поиск работал
    // независимо от того, как пользователь набрал:
    //  «Сделать» и «сделать» будут считаться одинаковыми

    const filteredList = this.list.filter((task) => {
      //перебираю каждую задачу что бы решить
      // оставить её или нет
      let matchesTab = true; //«Она подходит по вкладке?». Пока ставлю true – «подходит».
      if (this.currentTab === TabStatus.COMPLETED) {
        //Если выбрана вкладка «Выполненные» (значение COMPLETED), то…
        matchesTab = task.isCompleted; //matchesTab становится равным true,
        // если задача выполнена, и false, если нет.
      } else if (this.currentTab === TabStatus.UNCOMPLETED) {
        //если выбрана вкладка «Активные» (невыполненныеесли выбрана
        // вкладка «Активные» (невыполненные)
        matchesTab = !task.isCompleted; //matchesTab становится противоположным isCompleted.
        // Если задача не выполнена (task.isCompleted === false), то !task.isCompleted даст true
        // КОРОЧЕ: если задача выполнена то оставляю её
      } else if (this.currentTab === TabStatus.IMPORTANT) {
        //если выбрана вкладка «Важные»
        matchesTab = task.isImportant; //matchesTab становится true, если задача важная
        //  (task.isImportant === true), иначе false
      }
      const matchesSearch = task.title.toLowerCase().includes(lowerSearch);
      return matchesTab && matchesSearch;
    });

    this.currentList = filteredList;
    return this.currentList;
  }

  render() {
    // рисует задачи на странице.
    // Он берёт отфильтрованный список this.currentList и создаёт из него HTML-элементы
    this.calculateCurrentList(); // для получения актуального отфильрованного списка
    const container = document.querySelector(".task-list"); //контеёнер куда будем складывать задачи
    container.innerHTML = ""; //очистка контейнера
    const template = document.querySelector("#task-template"); //шаблон задачи
    if (!template) {
      //проверка для разработчика, если вдруг щаблона нет
      const err = new Error("Шаблон для задачи не найден");
      console.error(err);
      return;
    }

    this.currentList.forEach((task) => {
      //перебор каждой задачи
      const partTask = template.content.cloneNode(true);
      const taskItem = partTask.querySelector(".task-list__item");
      const taskCheckbox = partTask.querySelector(".task-list__checkbox");
      const taskText = partTask.querySelector(".task-list__text");
      const taskStarButton = partTask.querySelector(".task-list__star");
      const taskDeleteButton = partTask.querySelector(".task-list__delete");

      taskText.textContent = task.title; //Вставляем название задачи в элемент taskText.
      //  Теперь пользователь видит, что это за задача.
      taskCheckbox.checked = task.isCompleted; //Ставим или убираем галочку в чекбоксе:
      // если задача выполнена (task.isCompleted === true), то галочка будет стоять, иначе – нет.
      taskStarButton.addEventListener("click", () => {
        this.toggleImportantById(task.id);
        console.log(task);
      });
      if (task.isCompleted) {
        //Завершено
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
//отображение в реальном времени
    document.getElementById("total-tasks-count").textContent =
      this.allTasksCount;
    document.getElementById("active-tasks-count").textContent =
      this.activeTasksCount;
    document.getElementById("completed-tasks-count").textContent =
      this.completedTasksCount;
  }

  init() {
    //инициализирую, что бы базовые слушатели события
    const addTaskButton = document.querySelector("#add-task-button");
    const taskInput = document.querySelector("#task-input");
    
     addTaskButton.addEventListener("click", () => {
       const title = taskInput.value.trim();
       if (title === "") {
         alert("Вы не можете добавить пустую задачу");
         return;
       }
       this.createTask(title);
       taskInput.value = "";
     });

    const searchInput = document.querySelector("#task-search-input");
    searchInput.addEventListener("input", (e) => {
      this.searchString = e.target.value;
      this.render();
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
      this.render();
    });
    filterActive.addEventListener("click", () => {
      this.currentTab = TabStatus.UNCOMPLETED;
      setActiveButton(filterActive);
      this.render();
    });
    filterCompleted.addEventListener("click", () => {
      this.currentTab = TabStatus.COMPLETED;
      setActiveButton(filterCompleted);
      this.render();
    });
    filterImportant.addEventListener("click", () => {
      this.currentTab = TabStatus.IMPORTANT;
      setActiveButton(filterImportant);
      this.render();
    });

  }
}

const checkingTaskRendering = new TaskList();
checkingTaskRendering.createTask("Выгулять Шамана");
checkingTaskRendering.createTask("Сделать дз");
checkingTaskRendering.calculateCurrentList(TabStatus.ALL, "");
const container = document.querySelector(".task-list");
checkingTaskRendering.render(container);
