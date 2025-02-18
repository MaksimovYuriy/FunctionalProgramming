// Определение кнопок

const task_input = document.getElementById('task-input')

const task_list = document.getElementById('task-list')

const all_tasks_btn = document.getElementById('all-btn')
const completed_tasks_btn = document.getElementById('completed-btn')
const in_progress_tasks_btn = document.getElementById('in-progress-btn')

// Все задачи

let tasks = []

// Основные методы

const add_task = (title) => {
    const new_task = { id: tasks.length + 1, title: title, status: false }
    tasks = [...tasks, new_task]
    render_tasks()
}

const delete_task = (id) => {
    tasks = tasks.filter(task => task.id !== id)
    render_tasks()
}

const change_task_status = (id) => {
    tasks = tasks.map(task => {
        if(task.id === id){
            return { ...task, status: !task.status }
        }
        return task
    })
    render_tasks()
}

const render_tasks = (predicate = () => true) => {
    task_list.innerHTML = ''

    tasks.forEach(task => {
        if(predicate(task)){
            const taskItem = document.createElement('li')
            taskItem.className = 'task'
            
            const checkbox = document.createElement('input')
            checkbox.type = 'checkbox'
            checkbox.checked = task.status
            checkbox.addEventListener('change', () => change_task_status(task.id))
            
            const label = document.createElement('label')
            label.textContent = task.title
            
            const deleteButton = document.createElement('button')
            deleteButton.textContent = 'X'
            deleteButton.addEventListener('click', () => delete_task(task.id))
            
            taskItem.appendChild(checkbox)
            taskItem.appendChild(label)
            taskItem.appendChild(deleteButton)
            
            task_list.appendChild(taskItem)
        }
    })
}

// Прослушиватели

document.getElementById('task-form').addEventListener('submit', event => {
    event.preventDefault()
    if(task_input.value.trim() !== ''){
        add_task(task_input.value)
        task_input.value = ''
    }
})

all_tasks_btn.addEventListener('click', event => {
    render_tasks()
})

completed_tasks_btn.addEventListener('click', event => {
    render_tasks(task => task.status === true)
})

in_progress_tasks_btn.addEventListener('click', event => {
    render_tasks(task => task.status === false)
})


