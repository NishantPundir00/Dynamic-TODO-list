showtask();

let addtaskinput = document.getElementById("addtaskinput");
let priority = document.getElementById("Priority");
let addtaskbtn = document.getElementById("addtaskbtn");

 
//Add task function

function addTask(){
    let priorityColor;
    addtaskinputval = addtaskinput.value;
    priorityval = priority.value;
    // set Priority Color
    if(priorityval == "High"){
        priorityColor = "#d9534f";
    }else if(priorityval == "Medium"){
        priorityColor = "#f0ad4e";
    }else {
        priorityColor = "#5cb85c";
    }
    if(addtaskinputval.trim()!=0){
        let webtask = localStorage.getItem("localtask");
    if(webtask == null){
        taskobj = [];
    }else{
        taskobj = JSON.parse(webtask);
    }
    taskobj.push({
        task: addtaskinputval,
        taskPriority: priorityval,
        pcolor: priorityColor
    });
    localStorage.setItem("localtask", JSON.stringify(taskobj));
    addtaskinput.value="";
    }else{
        alert("Enter your Task")
    }
    
    showtask();
}

// add task button

addtaskbtn.addEventListener("click", addTask);

// add task by enter



//Show Function

function showtask(){
    let webtask = localStorage.getItem("localtask");
    if(webtask == null){
        taskobj = [];
    }else{
        taskobj = JSON.parse(webtask);
    }
    let html = ""; 
    let addedtasklist = document.getElementById("addedtasklist");
    taskobj.forEach((item, index) => {
        html += `<tr>
                    <th class="serial-number">${index+1}</th>
                    <td class="task" style="background:${item.pcolor}">${item.task}</td>
                    <td class="edit " onclick="edittask(${index})"><button style="background:transparent" class="text-primary"><i class="fa fa-edit"></i>Edit</button></td>
                    <td class="delete" onclick="deleteitem(${index})"><button style="background:transparent" class="text-danger"><i class="fa fa-trash"></i>Delete</button></td>
                </tr>`;
    });  
    addedtasklist.innerHTML = html;
}

// Edit Task Function 

function edittask(index){
    let saveindex = document.getElementById("saveindex");
    let addtaskbtn = document.getElementById("addtaskbtn");
    let savetaskbtn = document.getElementById("savetaskbtn");
    saveindex.value = index;
    let webtask = localStorage.getItem("localtask");
    let taskobj = JSON.parse(webtask);
    addtaskinput.value = taskobj[index].task;
    addtaskbtn.style.display="none";
    savetaskbtn.style.display="block";
}

// Save Task 
let savetaskbtn = document.getElementById("savetaskbtn");
savetaskbtn.addEventListener("click", function(){
    let addtaskbtn = document.getElementById("addtaskbtn");
    let webtask = localStorage.getItem("localtask");
    let taskobj = JSON.parse(webtask);
    let saveindex = document.getElementById("saveindex").value;
    taskobj[saveindex].task = addtaskinput.value;
    savetaskbtn.style.display="none";
    addtaskbtn.style.display="block";
    localStorage.setItem("localtask", JSON.stringify(taskobj));
    addtaskinput.value="";
    showtask();
})

// Delete Task

function deleteitem(index){
    let webtask = localStorage.getItem("localtask");
    let taskobj = JSON.parse(webtask);
    taskobj.splice(index, 1);
    localStorage.setItem("localtask", JSON.stringify(taskobj));
    showtask();
}

//Delete all Task

let deleteallbtn = document.getElementById("deleteallbtn");
deleteallbtn.addEventListener("click", function(){
    let webtask = localStorage.getItem("localtask");
    let taskobj = JSON.parse(webtask);
    let savetaskbtn = document.getElementById("savetaskbtn");
    let addtaskbtn = document.getElementById("addtaskbtn");
    if(webtask == null){
        taskobj = [];
    }else{
        taskobj = JSON.parse(webtask);
        taskobj = [];
    }
    savetaskbtn.style.display="none";
    addtaskbtn.style.display="block";
    localStorage.setItem("localtask", JSON.stringify(taskobj));
    showtask();
})

// searchlist
let searchtextbox = document.getElementById("searchtextbox");
searchtextbox.addEventListener("input", function(){
    let trlist = document.querySelectorAll("tr");
    Array.from(trlist).forEach(function(item){
        let searchedtext = item.getElementsByTagName("td")[0].innerText;
        let searchtextboxval = searchtextbox.value;
        let re = new RegExp(searchtextboxval, "gi");
        if(searchedtext.match(re)){
            item.style.display="block";
        }else{
            item.style.display="none";
        }
    })
})

//Filter Part
let filtHigh = document.getElementById("High");
let filtMedium = document.getElementById("Medium");
let filtLow = document.getElementById("Low");
let filtAll = document.getElementById("All");


// Hight Filter
filtHigh.addEventListener("click", function(){
    let trlist = document.querySelectorAll("tr");
    let webtask = localStorage.getItem("localtask");
    let taskobj = JSON.parse(webtask);
    taskobj.forEach((item, index) => {
        if(item.taskPriority == "High"){
            trlist[index].style.display="block";
        }else{
            trlist[index].style.display="none";
        }
    });
   
})

// Medium Filter
filtMedium.addEventListener("click", function(){
    let trlist = document.querySelectorAll("tr");
    let webtask = localStorage.getItem("localtask");
    let taskobj = JSON.parse(webtask);
    taskobj.forEach((item, index) => {
        if(item.taskPriority == "Medium"){
            trlist[index].style.display="block";
        }else{
            trlist[index].style.display="none";
        }
    });  

})

// Low Filter
filtLow.addEventListener("click", function(){
    let trlist = document.querySelectorAll("tr");
    let webtask = localStorage.getItem("localtask");
    let taskobj = JSON.parse(webtask);
    taskobj.forEach((item, index) => {
        if(item.taskPriority == "Low"){
            trlist[index].style.display="block";
        }else{
            trlist[index].style.display="none";
        }
    });  
    
})

// All Filter
filtAll.addEventListener("click", function(){
    let trlist = document.querySelectorAll("tr");
    let webtask = localStorage.getItem("localtask");
    let taskobj = JSON.parse(webtask);
    taskobj.forEach((item, index) => {
            trlist[index].style.display="block";
    });
})
