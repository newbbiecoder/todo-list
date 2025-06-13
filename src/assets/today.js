const today = document.querySelector('.today');

let todayPage = document.createElement('div');
const taskbar = document.querySelector('.taskbar');

const todayHeading = document.createElement('div');
todayHeading.classList.add('todayHeading');

function showToday() {
    
        todayPage.classList.add('todayContainer');
        taskbar.appendChild(todayPage);

        const date = new String(Date());
        let reverseDateMonth = date.substring(4, 10);
        let dateMonth = reverseDateMonth.split(' ').reverse().join(' ');
        let day = date.substring(0, 4);

        todayPage.appendChild(todayHeading);
        
        const newTasks = document.querySelectorAll('.new-tasks');

        newTasks.forEach((tasks) => {
            const selectDate = tasks.querySelector('.domDate');
            const selectDateMonth = selectDate.innerHTML.substring(0, 6);

            if (selectDateMonth == dateMonth) {
                todayHeading.innerHTML = `${selectDateMonth} ‧ Today ‧ ${day}`;

                const hr = document.createElement('hr');
                todayPage.appendChild(hr);

                let cloneNewTask = tasks.cloneNode(true);

                const actionButtons = cloneNewTask.querySelector('.action-buttons');
                if (actionButtons !== null) {
                    cloneNewTask.removeChild(actionButtons);
                }

                todayPage.appendChild(cloneNewTask);
                todayPage.style.display = "flex";
            }
        })  
}

function closeToday() {
    todayPage.style.display = "none";
    todayPage.innerHTML = '';
    today.style.backgroundColor = "antiquewhite";
}

export { showToday, closeToday };