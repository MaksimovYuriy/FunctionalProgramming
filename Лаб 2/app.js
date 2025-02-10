const taskInput = document.getElementById('task-add');
const tasksList = document.getElementById('tasks-list');
const showAllBtn = document.getElementById('all-btn');
const showDoneBtn = document.getElementById('done-btn');
const showNotDoneBtn = document.getElementById('in-progress-btn');

let tasks = []

// Чистые функции для управления списком задач

// Добавление задачи
const addTask = (title) => {
    const newTask = { id: tasks.length + 1, title, done: false }
    tasks = [...tasks, newTask]
    renderTasks()
};

// Удаление задачи
const deleteTask = (taskId) => {
    tasks = tasks.filter(task => task.id !== taskId)
    renderTasks()
};

// Смена статуса задачи
const toggleTaskStatus = (taskId) => {
    tasks = tasks.map(task => {
        if (task.id === taskId) {
            return { ...task, done: !task.done }; // Изменяем статус задачи
        }
        return task
    })
    renderTasks()
};

// Рендеринг задачи - функция высшего порядка
const renderTasks = () => {
    
    tasksList.innerHTML = ''

    tasks.forEach(task => {
        const taskItem = document.createElement('li')
        taskItem.className = 'task'
        
        const checkbox = document.createElement('input')
        checkbox.type = 'checkbox'
        checkbox.checked = task.done
        checkbox.addEventListener('change', () => toggleTaskStatus(task.id))
        
        const label = document.createElement('label')
        label.textContent = task.title
        
        const deleteButton = document.createElement('button')
        deleteButton.textContent = 'X'
        deleteButton.addEventListener('click', () => deleteTask(task.id))
        
        taskItem.appendChild(checkbox)
        taskItem.appendChild(label)
        taskItem.appendChild(deleteButton)
        
        tasksList.appendChild(taskItem)
    });
};

// Назначение прослушивателей нажатий кнопок
// Прослушиватели для удаление и смены статуса устанавливаются при отрисовке списка

// Добавление задачи
document.getElementById('add-task-form').addEventListener('submit', event => {
    event.preventDefault()
    
    if (taskInput.value.trim() !== '') {
        addTask(taskInput.value)
        taskInput.value = ''
    }
});

// Все задачи
showAllBtn.addEventListener('click', () => {
    renderTasks()
});

// Выполненные задачи
showDoneBtn.addEventListener('click', () => {
    filterTasks(task => task.done)
});

// Невыполненные задачи
showNotDoneBtn.addEventListener('click', () => {
    filterTasks(task => !task.done)
});

// Фильтрация - функция высшего порядка
const filterTasks = predicate => {
    const filteredTasks = tasks.filter(predicate)
    tasksList.innerHTML = ''
    filteredTasks.forEach(task => {
        const taskItem = document.createElement('li')
        taskItem.className = 'task'
        
        const checkbox = document.createElement('input')
        checkbox.type = 'checkbox'
        checkbox.checked = task.done
        checkbox.disabled = true
        
        const label = document.createElement('label')
        label.textContent = task.title
        
        const deleteButton = document.createElement('button')
        deleteButton.textContent = 'X'
        deleteButton.style.visibility = 'hidden'
        
        taskItem.appendChild(checkbox);
        taskItem.appendChild(label);
        taskItem.appendChild(deleteButton)
        
        tasksList.appendChild(taskItem)
    });
};