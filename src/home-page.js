import "./style.css";
const todoContainer = [];
class setTodo{
    myTodos = {};
    constructor(title, description, date, priority){
        this.title = title;
        this.description = description;
        this.date = date;
        this.priority = priority;
    }

    setTasks(){
        const myTodos = {
            Title: this.title,
            Description: this.description,
            Date: this.date,
            Priority: this.priority,
        }     
        todoContainer.push(myTodos);
        return todoContainer;
    }
}

const modal = document.getElementById('modal');
const submit = document.querySelector('.submit');

const form = document.querySelector('.form');

const title = document.getElementById('title');
const description = document.getElementById('description');
const date = document.getElementById('date');
const priority = document.getElementById('priority');

function addTasktoDOM(taskSection, task){
    const todo = new setTodo(title.value, description.value, date.value, priority.value);
    console.log(todo.setTasks()); 

    const newTask = document.createElement('div');
    newTask.classList.add('new-tasks');
    taskSection.insertBefore(newTask, task);

    const hr = document.createElement('hr');
    taskSection.insertBefore(hr, newTask);

    const checkbox = document.createElement('span');
    checkbox.classList.add('checkbox');
    newTask.appendChild(checkbox);

    const newTaskHeader = document.createElement('h3');
    newTaskHeader.innerHTML = title.value;

    const newTaskDescription = document.createElement('p');
    newTaskDescription.innerHTML = description.value;

    const newTaskWrapper = document.createElement('div');
    newTaskWrapper.appendChild(newTaskHeader);
    newTaskWrapper.appendChild(newTaskDescription);
    newTask.appendChild(newTaskWrapper);

    const content = document.createElement('div');
    content.classList.add('content');
    newTask.appendChild(content);
    content.appendChild(checkbox);
    content.appendChild(newTaskWrapper);
    

    const buttons = document.querySelector('.action-buttons');
    const newButtons = document.createElement('div');
    newButtons.innerHTML = buttons.innerHTML;
    newButtons.classList.add('action-buttons');
    newTask.appendChild(newButtons);
    
}

const addTask = document.querySelector('.add-task');
const addTaskRoutines = document.querySelector('.add-task-routines');
const addTaskInspiration = document.querySelector('.add-task-inspiration');

function addTaskEventListeners(){
    const basic_tasks = document.querySelector('.basic-tasks');
    const routines = document.querySelector('.routines');
    const inspiration = document.querySelector('.inspiration');

    function taskSubmit(){
        addTasktoDOM(basic_tasks, addTask);
        modal.close();
        form.reset();
    };

    function routineSubmit() {
        addTasktoDOM(routines, addTaskRoutines);           
        modal.close();
        form.reset();
    };

    function inspirationSubmit(){
        addTasktoDOM(inspiration, addTaskInspiration);
        modal.close();
        form.reset();
    };

    addTask.onclick = function() {
        modal.showModal();
        submit.onclick = function(event) {
            if(title.value === ""){
                return;
            }
            taskSubmit();
            event.preventDefault();
        }
    };

    addTaskRoutines.onclick = function() {
        modal.showModal();
        submit.onclick = function(event) {
            if(title.value === ""){
                return;
            }
            routineSubmit();
            event.preventDefault();
        }
    };

    addTaskInspiration.onclick = function() {
        modal.showModal();
        submit.onclick = function(event) {
            if(title.value === ""){
                return;
            }
            inspirationSubmit();
            event.preventDefault();
        }  
    };
}

addTaskEventListeners();