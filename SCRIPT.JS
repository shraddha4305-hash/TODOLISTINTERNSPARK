
// ================= ELEMENTS =================

const startBtn = document.getElementById("startBtn");

const welcomePage = document.getElementById("welcomePage");

const app = document.getElementById("app");


const taskInput = document.getElementById("taskInput");

const addBtn = document.getElementById("addBtn");

const taskList = document.getElementById("taskList");


const time = document.getElementById("time");

const date = document.getElementById("date");


const searchInput = document.getElementById("searchInput");


const totalTasks = document.getElementById("totalTasks");

const completedTasks = document.getElementById("completedTasks");

const pendingTasks = document.getElementById("pendingTasks");


const emptyState = document.getElementById("emptyState");




// ================= WELCOME PAGE =================


startBtn.addEventListener("click",()=>{


    welcomePage.style.display="none";

    app.classList.remove("hidden");


});




// ================= CLOCK =================


function updateClock(){


    let now = new Date();


    let hours = now.getHours();

    let minutes = now.getMinutes();

    let seconds = now.getSeconds();


    let ampm = hours >=12 ? "PM":"AM";


    hours = hours % 12;

    hours = hours ? hours : 12;


    minutes = minutes <10 ? "0"+minutes : minutes;

    seconds = seconds <10 ? "0"+seconds : seconds;



    time.innerHTML =
    `${hours}:${minutes}:${seconds} ${ampm}`;



    let days=[
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
    ];


    let months=[
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
    ];


    date.innerHTML =
    `${days[now.getDay()]}, 
    ${now.getDate()} 
    ${months[now.getMonth()]} 
    ${now.getFullYear()}`;



}


setInterval(updateClock,1000);

updateClock();







let tasks = JSON.parse(localStorage.getItem("tasks")) || [];





// ================= ADD TASK =================


function addTask(){


    let text = taskInput.value.trim();



    if(text===""){

        alert("Please enter a task!");

        return;

    }



    let task={


        id:Date.now(),

        text:text,

        completed:false,

        created:new Date().toLocaleTimeString()


    };



    tasks.push(task);



    saveTasks();


    taskInput.value="";



    displayTasks();


}




addBtn.addEventListener(
"click",
addTask
);




taskInput.addEventListener(
"keypress",
(e)=>{


    if(e.key==="Enter"){

        addTask();

    }


});







// ================= DISPLAY TASKS =================


function displayTasks(filter=""){


    taskList.innerHTML="";



    let filtered =
    tasks.filter(task=>
    task.text.toLowerCase()
    .includes(filter.toLowerCase()));



    filtered.forEach(task=>{



        let li=document.createElement("li");



        li.innerHTML=`

        <div>


        <h3 class="${task.completed ? "completed":""}">
        ${task.text}
        </h3>


        <small>
        Added: ${task.created}
        </small>


        </div>



        <div>


        <button onclick="completeTask(${task.id})">
        ✔
        </button>


        <button onclick="editTask(${task.id})">
        ✏
        </button>


        <button onclick="deleteTask(${task.id})">
        🗑
        </button>


        </div>

        `;



        taskList.appendChild(li);



    });



    updateStats();


}







// ================= COMPLETE =================


function completeTask(id){


    tasks =
    tasks.map(task=>{


        if(task.id===id){

            task.completed=!task.completed;

        }


        return task;


    });



    saveTasks();

    displayTasks();


}







// ================= DELETE =================


function deleteTask(id){


    tasks =
    tasks.filter(task=>
    task.id!==id);



    saveTasks();


    displayTasks();


}







// ================= EDIT =================


function editTask(id){


    let task =
    tasks.find(task=>
    task.id===id);



    let updated =
    prompt(
    "Edit your task",
    task.text
    );



    if(updated!==null && updated.trim()!==""){


        task.text=updated.trim();


        saveTasks();


        displayTasks();


    }



}







// ================= SEARCH =================


searchInput.addEventListener(
"input",
()=>{


    displayTasks(
    searchInput.value
    );


});








// ================= LOCAL STORAGE =================


function saveTasks(){


    localStorage.setItem(
    "tasks",
    JSON.stringify(tasks)
    );


}








// ================= STATISTICS =================


function updateStats(){



    let completed =
    tasks.filter(task=>
    task.completed).length;



    totalTasks.innerHTML =
    tasks.length;



    completedTasks.innerHTML =
    completed;



    pendingTasks.innerHTML =
    tasks.length-completed;



    if(tasks.length===0){

        emptyState.style.display="block";

    }

    else{

        emptyState.style.display="none";

    }



}






// INITIAL LOAD


displayTasks();