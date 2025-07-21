// create user tasks array
let taskArray = [];

// create task array item with id, name, priority, importance, complete, and date
function addTask() {
    let id = idCounter();
    let taskName = document.getElementById("taskName").value.trim();
    let pIndex = document.getElementById("priority").selectedIndex;
    let taskPriority = document.getElementById("priority").options[pIndex].value;
    let taskImportance = document.getElementById("important").checked;
    let taskComplete = false;
    let taskDate = new Date();
    
    let taskItem = {id: id, name: taskName, priority: taskPriority, 
    isImportant: taskImportance, isCompleted: taskComplete, date: taskDate}

    taskArray.push(taskItem);
    console.log(JSON.stringify(taskArray));
    displayTasks();

}

// create counter for id attribute 
let count = 0;
function idCounter(){
    count++;
    return count
}

// create functin to display task list 
function displayTasks(){
    let taskList = "";
    for (let i = 0; i < taskArray.length; i++){
        let task = taskArray[i];
        
        // create variables to determine which CSS class to apply
        let completedClass = task.isCompleted ? "completed" : "";
        let importantClass = task.isImportant ? "important" : "";
        let taskClass = `${completedClass} ${importantClass}`;

        // create html to display each item in the task array
        taskList += `<div class="${taskClass}">
            ${task.name}&ensp;&ensp;Priority: ${task.priority}&ensp;&ensp; 
            ${task.date.toLocaleString()}&ensp;&ensp; 
            <label>Complete 
                <input type="checkbox" 
                class="completeCheckbox" 
                data-id="${task.id}" 
                ${task.isCompleted ? "checked" : ""}>
            </label>&ensp;&ensp;
            <button class="deleteButton" data-id="${task.id}">Delete Task</button> <hr>
        </div>`;

    document.getElementById("taskmanager").innerHTML = taskList;

    // display notes when the task list is not empty
    let note = `<h5>Use the Complete checkbox and Delete button to manage your task list.</h5>`
    if (taskList != "") {
        document.getElementById("notes").innerHTML = note;
    }
    }

    // attach event listeners to update array
    let checkboxes = document.querySelectorAll(".completeCheckbox");
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener("change", () => {
            let id = parseInt(checkbox.getAttribute("data-id"));
            let task = taskArray.find(t => t.id === id);
            if (task) {
                task.isCompleted = checkbox.checked;
                console.log(JSON.stringify(taskArray));
                displayTasks();
            }
        });
    });

    // attach event listener for delete button
    document.querySelectorAll(".deleteButton").forEach(button => {
        button.addEventListener("click", () => {
            let id = parseInt(button.getAttribute("data-id"));
            taskArray = taskArray.filter(task => task.id !== id);
            console.log(JSON.stringify(taskArray));
            displayTasks();
        });
    });

}

// add tasks to task view array
document.getElementById("submit").addEventListener("click", addTask);

