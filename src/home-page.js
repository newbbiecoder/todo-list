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
const addProjectModal = modal.cloneNode(true);
const submit = document.querySelector('.submit');
const form = document.querySelector('.form');

const title = document.getElementById('title');
const description = document.getElementById('description');
const date = document.getElementById('date');
const priority = document.getElementById('priority');

let storeTodo;

function setDate(valueArr){

    let domDate = valueArr[0];
    let domTime = valueArr[1];

    domDate = domDate.substring(5);
    domDate = domDate.split("-").reverse().join('-');

    let month = domDate.substring(3);

    let newDate = domDate.split('-');

    switch(month){
        case "01":
            month = "Jan";
            break;
        case "02":
            month = "Feb";
            break;
        case "03":
            month = "Mar";
            break;
        case "04":
            month = "Apr";
            break;
        case "05":
            month = "May";
            break;
        case "06":
            month = "Jun";
            break;
        case "07":
            month = "Jul";
            break;
        case "08":
            month = "Aug";
            break;
        case "09":
            month = "Sep";
            break;
        case "10":
            month = "Oct";
            break;
        case "11":
            month = "Nov";
            break;
        case "12":
            month = "Dec";
            break;
    }

    const finalDate = newDate[0] + " " + month;
    return finalDate + " " + domTime;
}

function setPriority(input_value){
    const priority1 = document.getElementById('priority1');
    const priority2 = document.getElementById('priority2');
    const priority3 = document.getElementById('priority3');
    const priority4 = document.getElementById('priority4');

    if(priority.value == "priority1"){    
        input_value.style.backgroundColor = "#faeceb";
        input_value.style.border = "3px solid #d24940";
        priority1.selected = true;
    }

    if(priority.value == "priority2"){    
        input_value.style.backgroundColor = "#fdf3e6";
        input_value.style.border = "3px solid #ec9018";
        priority2.selected = true;
    }

    if(priority.value == "priority3"){    
        input_value.style.backgroundColor = "#e9f0fc";
        input_value.style.border = "3px solid #387ce2";
        priority3.selected = true;
    }
    
    if(priority.value == "priority4"){
        input_value.style.backgroundColor = "transparent";
        input_value.style.border = "2px solid black";
        priority4.selected = true;
    }
}
function addTasktoDOM(taskSection, task) {
    const todo = new setTodo(title.value, description.value, date.value, priority.value);
    storeTodo = todo;
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
    
    let valueArr = date.value.split("T");

    const newTaskDate = document.createElement('p');
    newTaskDate.classList.add('domDate');
    newTaskDate.innerHTML = setDate(valueArr);

    if(newTaskDate.innerHTML == "  undefined") newTaskDate.innerHTML = "";

    setPriority(checkbox);

    const newTaskWrapper = document.createElement('div');
    newTaskWrapper.appendChild(newTaskHeader);
    newTaskWrapper.appendChild(newTaskDescription);
    newTaskWrapper.appendChild(newTaskDate);

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

    // Remove foolsvg class from new tasks for edit button
    const svg = document.querySelectorAll('.new-tasks > .action-buttons > svg:first-child');
    svg.forEach((select_svg) => {
        select_svg.classList.remove('foolsvg');
    })

    // Remove foolsvg2 class from new tasks for delete button
    const svg2 = document.querySelectorAll('.new-tasks > .action-buttons > svg:nth-child(2)');
    svg2.forEach((select_svg2) => {
        select_svg2.classList.remove('foolsvg2');
    })

    const deleteButton = document.querySelectorAll('.new-tasks > .action-buttons > svg:last-child');
    deleteButton.forEach((selectDelete) => {
        selectDelete.classList.add('delete');
    })
}


const addTask = document.querySelector('.add-task');
const addTaskRoutines = document.querySelector('.add-task-routines');
const addTaskInspiration = document.querySelector('.add-task-inspiration');


class eventListeners {
    addTaskEventListeners(newProjectContainer, cloneAddTaskButton) {
        // const addProjects = document.querySelector('.add-project');

        const basic_tasks = document.querySelector('.basic-tasks');
        const routines = document.querySelector('.routines');
        const inspiration = document.querySelector('.inspiration');
        // const newProjectContainer = document.querySelector('.newProjectContainer');

        function taskSubmit() {
            addTasktoDOM(basic_tasks, addTask);
        }

        function routineSubmit() {
            addTasktoDOM(routines, addTaskRoutines);
        }

        function inspirationSubmit() {
            addTasktoDOM(inspiration, addTaskInspiration);
        }

        function newProjectSubmit(){
            addTasktoDOM(newProjectContainer, cloneAddTaskButton);
        }
        function handleSubmit(targetSection) {
            if (title.value.trim().length === 0){
                alert("Enter Title to proceed");
                return;
            };
            
            if (targetSection === 'basic') taskSubmit();
            else if (targetSection === 'routine') routineSubmit();
            else if (targetSection === 'inspiration') inspirationSubmit();
            else if (targetSection === 'addProject') newProjectSubmit();
            
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

        if(cloneAddTaskButton != null){
            cloneAddTaskButton.onclick = function () {
                form.reset();
                modal.showModal();
                
                submit.onclick = function (event) {
                    event.preventDefault();
                    handleSubmit('addProject');
                };
            };
        }      
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
                const domDate = todo.querySelector('.domDate');

                const domCheckbox = todo.querySelector('.checkbox');
                console.log(domCheckbox);

                modal.showModal();
                title.value = domHeader.innerHTML;
                description.value = domDescription.innerHTML;
                date.value = storeTodo.date;
                priority.value = storeTodo.priority;
                
                submit.onclick = function(event) {
                    event.preventDefault();
                    domHeader.innerHTML = title.value;
                    domDescription.innerHTML = description.value;
                    domDate.innerHTML = setDate(date.value.split("T"));
                    if(domDate.innerHTML == "  undefined") domDate.innerHTML = "";
                    setPriority(domCheckbox);
                    modal.close();
                }
            }
        });
    }

    deleteTaskEventListeners(){
        taskbar.addEventListener('click', (e) => {
            const svg = e.target.closest('svg');
            if(!svg) return;

            if(svg.matches('.action-buttons > .delete')) {
                const edit = e.target;       
                const todo = edit.closest('.new-tasks');

                const hr = todo.previousSibling;
                hr.remove();
                if(!todo) return;

                todo.remove();            
            }
        })
    }

    prankEventListeners(){       
        taskbar.addEventListener('click', (e) => {
            const svg = e.target.closest('svg');
            if(!svg) return;

            const fool_todo = document.querySelector('.fool');
            if(!fool_todo) return;

            if(fool_todo){
                if(svg.matches('.action-buttons > .foolsvg')){       
                    if(!fool_todo) return;
                    alert("Can't edit this. Reason: Skill issue lol");
                }
                if(svg.matches('.action-buttons > .foolsvg2')){
                    if(!fool_todo) return;
                    alert("Can't delete this. Reason: Hight level skill issue");
                }
            }          
            });
        }
    
    closeEventListener(){
        const close = document.querySelector('.header > svg');
        close.addEventListener('click', () => {
            modal.close();
        })
    }
}
class addProject{
    
    projectIcon = document.querySelector('.projects > svg');

    header = document.querySelector('.header');
    projectHeader = this.header.cloneNode(true);
    
    addProjectEventListener(){
        document.body.appendChild(addProjectModal)
        document.querySelector('dialog:nth-child(3)').id = 'addProjectModal';

        let formAddProject = document.querySelector('#addProjectModal > .form');       

        this.projectIcon.addEventListener('click', () => {      
            let createForm = document.createElement('form');
            createForm.action = "dialog";
            createForm.classList.add('addTaskForm');
            addProjectModal.appendChild(createForm);    

            if(formAddProject != null) formAddProject.remove();
            
            let addTaskHeader = document.querySelector('#addProjectModal > .header:nth-child(1)');
            if(addTaskHeader != null) addTaskHeader.remove();
            createForm.appendChild(this.projectHeader);

            let headerContent = document.querySelector('#addProjectModal > form > .header > p');
            headerContent.innerHTML = "Add Project";

            let closeAddTask = document.querySelector('#addProjectModal > form > .header > svg');

            const label = document.createElement('label');
            createForm.appendChild(label);
            label.textContent = "Project Name";

            const labelInput = document.createElement('input');
            labelInput.type = "text";
            labelInput.name = "projectName";
            labelInput.id = "projectName";
            labelInput.placeholder = "New Project";
            labelInput.required = true;
            label.appendChild(labelInput);

            let submitAddTask = document.createElement('button');
            submitAddTask.type = "submit";
            submitAddTask.textContent = "Submit";
            submitAddTask.classList.add('submitAddTask');
            addProjectModal.appendChild(submitAddTask);

            submitAddTask.onclick = function(event){
                if (labelInput.value.trim().length === 0){
                    alert("Enter Project Name to proceed");
                    return;
                };
                form.reset();
                event.preventDefault();
                addProjectModal.close();

                const myProjects = document.querySelector('.my-projects');

                let newProject = document.createElement('button');
                newProject.classList.add('newProject');
                newProject.innerHTML = `# &nbsp;&nbsp; ${labelInput.value}`;
                myProjects.appendChild(newProject);

                const addTaskListener = new eventListeners();

                newProject.addEventListener('click', (e) => {
                    let targetClick = e.target;
                    console.log(targetClick);
                    navigateTo('projects',newProject, addTaskListener, targetClick);
                    
                })
            
                addProjectModal.innerHTML = '';
            }

            addProjectModal.showModal();

            closeAddTask.addEventListener('click', () => {          
                addProjectModal.close();
                addProjectModal.innerHTML = '';
            })                    
        }) 
    }
}

let homeOpened = false;
const allHomeTodo = document.querySelectorAll('.home-todo')

function showHome(){
    if(!homeOpened){
        const addProjectListener = new addProject();
        addProjectListener.addProjectEventListener();

        const addTaskListener = new eventListeners();
        addTaskListener.addTaskEventListeners();
        addTaskListener.editTaskEventListeners();  
        addTaskListener.prankEventListeners();
        addTaskListener.deleteTaskEventListeners();
        addTaskListener.closeEventListener();

        homeOpened = true;     
    }
    allHomeTodo.forEach((homeTodo) => {
        homeTodo.style.display = "flex";
    })
}

function closeHome(){
    allHomeTodo.forEach((homeTodo) => {
        homeTodo.style.display = "none";
    })
}

const homeProject = document.querySelector('.homeProject');
const today = document.querySelector('.today');

export {showHome, closeHome, today};

import navigateTo from "./assets/toggle";
navigateTo('home');

homeProject.addEventListener('click', () => {
    navigateTo('home');
})

today.addEventListener('click', () => {
    navigateTo('today');
    today.style.backgroundColor = "antiquewhite";
})