import { today, showHome, closeHome } from "../home-page";
import { showToday, closeToday } from "./today";
import { showProjects, closeProjects } from "./switch-projects";
function hideAllViews(){
    closeHome();
    closeToday();
    closeProjects();
}

function resetAllStyles(){
    today.style.backgroundColor = "transparent";
}

export default function navigateTo(page,newTask,addTaskListener,targetClick){
    hideAllViews();
    resetAllStyles();

    switch(page){
        case 'home':
            today.style.backgroundColor = "";
            showHome();
            break;
        case 'today':
            showToday();
            break;
        case 'projects':
            showProjects(newTask,addTaskListener,targetClick);
            break;
    }
}