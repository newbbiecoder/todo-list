let todayOpened = false;

const todayPage = document.createElement('div');
const taskbar = document.querySelector('.taskbar');

const todayHeading = document.createElement('div');
todayHeading.classList.add('todayHeading');

function showToday(){
    if(!todayOpened){

        console.log("Today opened!");
        todayPage.classList.add('todayContainer');
        taskbar.appendChild(todayPage);

        const date = new String(Date());
        let reverseDateMonth = date.substring(4,10);
        let dateMonth = reverseDateMonth.split(' ').reverse().join(' ');
        let day = date.substring(0,4);
               
        if(!todayPage.contains(todayHeading)){
            todayPage.appendChild(todayHeading);
        }      
        
        const newTasks = document.querySelectorAll('.new-tasks');
        
        console.log(newTasks);
        newTasks.forEach((tasks) => {
            const selectDate = tasks.querySelector('.domDate');
            const selectDateMonth = selectDate.innerHTML.substring(0,6);
            
            console.log(tasks);
            if(selectDateMonth == dateMonth && !todayPage.contains(tasks)){
                todayHeading.innerHTML = `${selectDateMonth} ‧ Today ‧ ${day}`;

                const hr = document.createElement('hr');
                todayPage.appendChild(hr);
                
                let cloneNewTask = tasks.cloneNode(true);
                
                console.log(cloneNewTask);
                console.log(todayPage.contains(cloneNewTask));

                const actionButtons = cloneNewTask.querySelector('.action-buttons');
                if(actionButtons !== null){
                    cloneNewTask.removeChild(actionButtons);
                }  

                const selectTask = document.querySelector('.taskbar > .todayContainer > .new-tasks:nth-child(2n+1)');
                if(selectTask != null){
                    if(selectTask.innerHTML != cloneNewTask.innerHTML) todayPage.appendChild(cloneNewTask);
                }                   
            }                      
        })      
    }
    todayPage.style.display = "flex";
}

function closeToday(){
    todayPage.style.display = "none";
    todayOpened = false;
}

export {showToday, closeToday};