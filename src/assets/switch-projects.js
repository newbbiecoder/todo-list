const taskbar = document.querySelector('.taskbar');
var uniqueId;

function showProjects(newTask,addTaskListener,targetClick){
    // let selectProjectContainer = document.getElementById(uniqueId);
    const newProjectContainer = document.createElement('div');
    newProjectContainer.classList.add('newProjectContainer');
    
    uniqueId = crypto.randomUUID();
    newProjectContainer.id = uniqueId;
    taskbar.appendChild(newProjectContainer);

    const newProjectHeader = document.createElement('h1');
    newProjectHeader.innerHTML = newTask.innerHTML;

    newProjectContainer.prepend(newProjectHeader);

    const addTaskButton = document.querySelector('.basic-tasks > .add-task');
    const cloneAddTaskButton = addTaskButton.cloneNode(true);
    cloneAddTaskButton.classList.remove('add-task');
    cloneAddTaskButton.classList.add('add-project');

    newProjectContainer.appendChild(cloneAddTaskButton);
    addTaskListener.addTaskEventListeners(newProjectContainer, cloneAddTaskButton);
    targetClick.disabled = true;
    newProjectContainer.style.display = "flex";
}

function closeProjects(targetClick){
    let heading = document.querySelector('.newProjectContainer > h1');
    if(heading != null) heading.remove();

    let addProjectButton = document.querySelector('.newProjectContainer > .add-project');
    if(addProjectButton != null) addProjectButton.remove();

    let selectNewProject = document.querySelectorAll('.newProjectContainer');
    selectNewProject.forEach((selectProject) => {
        selectProject.style.display = "none";
    })

    const selectProjectName = document.querySelectorAll('.newProject');
    selectProjectName.forEach((selectProject) => {
        selectProject.disabled = false;
    })
}

export {showProjects, closeProjects};