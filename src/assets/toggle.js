import { today, showHome, closeHome } from "../home-page";
import { showToday, closeToday } from "./today";
function hideAllViews(){
    closeHome();
    closeToday();
}

function resetAllStyles(){
    today.style.backgroundColor = "transparent";
}

export default function navigateTo(page){
    hideAllViews();
    resetAllStyles();

    switch(page){
        case 'home':
            showHome();
            break;
        case 'today':
            showToday();
            break;
    }
}