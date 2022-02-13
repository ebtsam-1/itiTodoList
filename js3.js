let theInput = document.querySelector(".add-task input");
theAddBtn = document.querySelector(".add-task .plus");
taskContainer = document.querySelector(".tasks-content");
noTasksMsg = document.querySelector(".no-tasks");
tasksCount = document.querySelector(".tasks-count span");
CompletedContainer = document.getElementById('completed-task');
tasksCompleted = document.querySelector(".tasks-completed span");




let myTasksArray = [];

let myCompletedtasks = [];


//  Array of tasks filling from locala storage
if (localStorage.getItem("StoredTasks"))
{
    myTasksArray = JSON.parse(localStorage.getItem("StoredTasks"));
    
}
//  Array of completed tasks filling from locala storage
if (localStorage.getItem("completedTasks"))
{
    myCompletedtasks = JSON.parse(localStorage.getItem("completedTasks"));
    
}

console.log(myTasksArray)
console.log(myCompletedtasks)

window.onload = function () {
    theInput.focus();
}

theAddBtn.onclick = function () {
    if (theInput.value == "") {
        console.log("no value")
    }
    else {
        arrayAdding(theInput.value);
        console.log(myTasksArray);
      
        theInput.value = "";
        theInput.focus();
    }
}

//   Adding to array of tasks

function arrayAdding(taskContent) {

    let task = {
        id: Date.now(),
        content: taskContent,
        completed: false
    }

    myTasksArray.push(task);
    domAdding(myTasksArray);
    LocalStorageArray(myTasksArray);
}

// Adding to the page from the array of tasks
function domAdding(myTasksArray) {
    noTasksMsg.remove();
    document.getElementById('tasks-content').innerHTML = " ";

    for (let i = 0; i < myTasksArray.length; i++) {
        myNewTask = document.createElement("span");
        myNewTaskText = document.createTextNode(myTasksArray[i].content);
        let deleteBtn = document.createElement("span");
        let deleteBtnText = document.createTextNode("Delete");

        myNewTask.className = "task-box";
        if (myTasksArray[i].completed) {
            myNewTask.className = "task-box finished"
        }
        myNewTask.setAttribute("data-id", myTasksArray[i].id);
        myNewTask.appendChild(myNewTaskText);
        deleteBtn.classList.add("delete");
        deleteBtn.appendChild(deleteBtnText);
        myNewTask.appendChild(deleteBtn);

        document.getElementById('tasks-content').appendChild(myNewTask);
    }
}
let card = `

 <h2>Hello</h2>
 <div>Hello</div>

`

// Local Storage functions

// Setting
function LocalStorageArray(myTasksArray) {
    window.localStorage.setItem("StoredTasks", JSON.stringify(myTasksArray));
}
// Getting
function getStoredTasks() {
    if (localStorage.getItem("StoredTasks")) {
        let locaStoredTasks = JSON.parse(localStorage.getItem("StoredTasks"));

        domAdding(locaStoredTasks)
    }
}
getStoredTasks()


// Delete elements 

taskContainer.addEventListener('click', function (e) {

    // delete task
    if (e.target.className == 'delete') {

        myTasksArray = myTasksArray.filter((ele)=>{
            return ele.id != e.target.parentNode.dataset.id
        })
        console.log(myTasksArray);
        LocalStorageArray(myTasksArray)
        e.target.parentNode.remove();
        
    }

    //finsh task
    if (e.target.classList.contains('task-box')) {
        e.target.classList.toggle('finished');

        for(let i = 0; i < myTasksArray.length; i++)
        {
            if(myTasksArray[i].id == e.target.dataset.id)
            {
              if(myTasksArray[i].completed == false)
              {
                myTasksArray[i].completed = true;
                myCompletedtasks.push(myTasksArray[i]);
                console.log(myCompletedtasks)
                completedStorage(myCompletedtasks)
                domCompletedAdding(myCompletedtasks)
              }
              else
              {
                myTasksArray[i].completed = false
              }
              
            }
            
        }
        console.log(myTasksArray) 
        LocalStorageArray(myTasksArray)
        
    }

   
})


// Completed tasks local storage

function completedStorage(myCompletedtasks){
    window.localStorage.setItem('completedTasks',JSON.stringify(myCompletedtasks));
}

//  Adding to completed tasks div from completed tasks array
function domCompletedAdding(myCompletedtasks){
    document.getElementById('completed-task').innerHTML = " ";

    myCompletedtasks.forEach((ele)=>{
        let myNewCompletedTask = document.createElement("span");
        let myNewCompletedTaskText = document.createTextNode(ele.content);

        myNewCompletedTask.classList.add("completed-task-box");
        myNewCompletedTask.appendChild(myNewCompletedTaskText);
        myNewCompletedTask.setAttribute("data-id", ele.id);
        let deleteBtn = document.createElement("span");
        let deleteBtnText = document.createTextNode("Delete");
        deleteBtn.classList.add("delete");
        deleteBtn.appendChild(deleteBtnText);
        myNewCompletedTask.appendChild(deleteBtn);

        document.getElementById('completed-task').appendChild(myNewCompletedTask);
    })
}

// hsn.iti.tasks@gmail.com

// get Comleted tasks From Storage
function getComletedFromStorage()
{
    let completedStoredTasks = JSON.parse(localStorage.getItem('completedTasks'));
    domCompletedAdding(completedStoredTasks)
}

getComletedFromStorage();

// completed tasks remove

taskContainerArray = Array.from(document.querySelectorAll(".tasks-content > span")) ;

console.log(taskContainerArray);
CompletedContainer.addEventListener('click', function (e) {

    // delete task
    if (e.target.className == 'delete') {

        myTasksArray = myTasksArray.filter((ele)=>{
            return ele.id != e.target.parentNode.dataset.id
        })
        console.log(myTasksArray);
        LocalStorageArray(myTasksArray)

        myCompletedtasks = myCompletedtasks.filter((ele)=>{
            return ele.id != e.target.parentNode.dataset.id
        })
        console.log(myCompletedtasks);
        completedStorage(myCompletedtasks);
        e.target.parentNode.remove();
        
    }

  
    //Re adding the completed tast to incompleted tasks
    if (e.target.classList.contains('completed-task-box')) {
        e.target.classList.toggle('remove');
        

        myCompletedtasks = myCompletedtasks.filter((ele)=>{
            return ele.id != e.target.dataset.id
        })
        console.log(myCompletedtasks);
        completedStorage(myCompletedtasks)

        
        for(let i = 0; i < myTasksArray.length; i++)
        {
            if(myTasksArray[i].id == e.target.dataset.id)
            {
              if(myTasksArray[i].completed == true)
              {
                myTasksArray[i].completed = false;
              }
              else
              {
                myTasksArray[i].completed = true;
              }
              
            }
            
        }
        console.log(myTasksArray) 
        LocalStorageArray(myTasksArray)
        
        for (let i = 0; i < taskContainerArray.length; i++)
        {
            if(e.target.innerText == taskContainerArray[i].innerText)
            {
                taskContainerArray[i].classList.toggle("finished");
            }
        }
        
    }

   
})

