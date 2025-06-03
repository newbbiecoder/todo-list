import "./style.css";

const todoContainer = [];


class setTodo {
    myTodos = {};
    constructor(title, description, date, priority) {
        this.title = title;
        this.description = description;
        this.date = date;
        this.priority = priority;
    }

    setTasks() {
        const myTodos = {
            Title: this.title,
            Description: this.description,
            Date: this.date,
            Priority: this.priority,
        };
        todoContainer.push(myTodos);
        return todoContainer;
    }
}

const taskbar = document.querySelector('.taskbar');
const modal = document.getElementById('modal');
const submit = document.querySelector('.submit');
const form = document.querySelector('.form');

const title = document.getElementById('title');
const description = document.getElementById('description');
const date = document.getElementById('date');
const priority = document.getElementById('priority');

function addTasktoDOM(taskSection, task) {
    const todo = new setTodo(title.value, description.value, date.value, priority.value);
    console.log(todo.setTasks());

    const newTask = document.createElement('div');
    newTask.classList.add('new-tasks');
    taskSection.insertBefore(newTask, task);

    const hr = document.createElement('hr');
    taskSection.insertBefore(hr, newTask);

    const checkbox = document.createElement('span');
    checkbox.classList.add('checkbox');

    const newTaskHeader = document.createElement('h3');
    newTaskHeader.classList.add('domHeader');
    newTaskHeader.innerHTML = title.value;

    const newTaskDescription = document.createElement('p');
    newTaskDescription.classList.add('domDescription');
    newTaskDescription.innerHTML = description.value;

    const newTaskWrapper = document.createElement('div');
    newTaskWrapper.appendChild(newTaskHeader);
    newTaskWrapper.appendChild(newTaskDescription);

    const content = document.createElement('div');
    content.classList.add('content');
    content.appendChild(checkbox);
    content.appendChild(newTaskWrapper);
    newTask.appendChild(content);

    const buttons = document.querySelector('.action-buttons');
    const newButtons = document.createElement('div');
    newButtons.innerHTML = buttons.innerHTML;
    newButtons.classList.add('action-buttons');
    newTask.appendChild(newButtons);

    const svg = document.querySelectorAll('.new-tasks > .action-buttons > svg:first-child');
    svg.forEach((select_svg) => {
        select_svg.classList.remove('foolsvg');
    })

}

const addTask = document.querySelector('.add-task');
const addTaskRoutines = document.querySelector('.add-task-routines');
const addTaskInspiration = document.querySelector('.add-task-inspiration');


class eventListeners {
    addTaskEventListeners() {
        const basic_tasks = document.querySelector('.basic-tasks');
        const routines = document.querySelector('.routines');
        const inspiration = document.querySelector('.inspiration');

        function taskSubmit() {
            addTasktoDOM(basic_tasks, addTask);
        }

        function routineSubmit() {
            addTasktoDOM(routines, addTaskRoutines);
        }

        function inspirationSubmit() {
            addTasktoDOM(inspiration, addTaskInspiration);
        }
        function handleSubmit(targetSection) {
            if (title.value === "") return;
            
            if (targetSection === 'basic') taskSubmit();
            else if (targetSection === 'routine') routineSubmit();
            else if (targetSection === 'inspiration') inspirationSubmit();
            
            modal.close();
            form.reset();
        }

        addTask.onclick = function () {
            form.reset();
            modal.showModal();
            

            submit.onclick = function (event) {
                event.preventDefault();
                handleSubmit('basic');
            };
        };

        addTaskRoutines.onclick = function () {
            form.reset();
            modal.showModal();
            

            submit.onclick = function (event) {
                event.preventDefault();
                handleSubmit('routine');
            };
        };

        addTaskInspiration.onclick = function () {
            form.reset();
            modal.showModal();
            

            submit.onclick = function (event) {
                event.preventDefault();
                handleSubmit('inspiration');
            };
        };
    }

    editTaskEventListeners() {
        taskbar.addEventListener('click', (e) => {
            const svg = e.target.closest('svg');
            if (!svg) return;

            if (svg.matches('.action-buttons > svg:first-child')) {
                const edit = e.target;
                const todo = edit.closest('.new-tasks');
                if (!todo) return;

                const domHeader = todo.querySelector('.domHeader');
                const domDescription = todo.querySelector('.domDescription');

                modal.showModal();
                title.value = domHeader.innerHTML;
                description.value = domDescription.innerHTML;
            }
        });
    }

    prankEventListeners(){
        
        taskbar.addEventListener('click', (e) => {
            const svg = e.target.closest('svg');
            if(!svg) return;

            const fool_todo = document.querySelector('.fool');
            console.log(fool_todo)
            if(!fool_todo) return;

            if(fool_todo){
                if(svg.matches('.action-buttons > .foolsvg')){       
                    if(!fool_todo) return;
                    alert("Can't edit this. Reason: Skill issue lol");
                }
            }          
            });
        }
}  

const addTaskListener = new eventListeners();
addTaskListener.addTaskEventListeners();
addTaskListener.editTaskEventListeners();  
addTaskListener.prankEventListeners();