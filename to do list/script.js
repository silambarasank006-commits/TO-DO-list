document.addEventListener("DOMContentLoaded",()=> {
    const storetasks = JSON.parse(localStorage.getItem('tasks'))
    if(storetasks){
        storetasks.forEach((task)=> tasks.push(task))
        updateTasksList();
        updateStats();
    }
})
let tasks = [];

const savetasks = () => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}
const addTask = () => {
    const taskInput = document.getElementById('taskInput');
    const text = taskInput.value.trim();
    if (text) {
        tasks.push({text: text, completed: false});
        updateTasksList()
         updateStats;
         taskInput.value='';
         savetasks();
    }    
};
const toggletaskcomplete = (index)=>{
    tasks[index].completed = !tasks[index].completed;
    console.log({tasks})
    updateTasksList();
     updateStats()
     savetasks();
};
const deleteTask = (index)=>{
    tasks.splice(index,1);
    updateTasksList();
     updateStats();
     savetasks();
};
const editTask = (index)=> {
    const taskInput = document.getElementById('taskInput')
    taskInput.value = tasks[index].text
    tasks.splice(index,1)
    updateTasksList();
     updateStats();
     savetasks();
};
const updateStats = ()=> {
    const completedTasks = tasks.filter(tasks => tasks.completed).length
    const totalTask = tasks.length
    const progress = (completedTasks/totalTask)*100
    const bar = document.getElementById('progress')
    bar.style.width = `${progress}%`;
    document.getElementById('numbers').innerText=`${completedTasks} / ${totalTask}`

    if(tasks.length && completedTasks === totalTask) {
        blastconfetti();

    }
}

const updateTasksList = ()=>{
    const tasklist = document.getElementById('tasklist') 
    tasklist.innerHTML='';

    tasks.forEach((task,index) => {
        const listItem = document.createElement('li')

        listItem.innerHTML=`
        <div class="taskItem">
             <div class="task ${task.completed ? 'completed': '' }">
              <input type="checkbox" class="checkbox" ${task.completed ?'checked':""} />
              <p>${task.text}</p>
            </div>
        <div class="icons">
        <img src="image/edit-file.png" onClick="editTask(${index})" />
        <img src="image/trash-can.png" onClick="deleteTask(${index})" />
       </div>
    </div>
    `;
    listItem.addEventListener('change',()=> toggletaskcomplete(index));
      tasklist.append(listItem);

    });
}
document.getElementById('newtask').addEventListener('click', function(e){e.preventDefault()
addTask();
});

const blastconfetti = ()=>{
    confetti({
  particleCount: 100,
  spread: 70,
  origin: { y: .6 }
});
};
