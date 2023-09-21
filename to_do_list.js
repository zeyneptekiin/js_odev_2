let newTaskDom = document.getElementById("task")
let newListDom = document.getElementById("list")
let existingListItems = newListDom.querySelectorAll('li');
let toastError = document.querySelector(`.toast.error`);
let toastOkay = document.querySelector(`.toast.success`);
let toastTask = document.getElementsByClassName("remaining_tasks");
let toastTaskSuccess = document.getElementsByClassName("tasks");

//Local Storage

let tasksArray = [];

let checkedTasksArray = [];

let checkedTasks = localStorage.getItem('checkedTasks');

//}

// check if there is checked tasks in localstorage
// if yes;
// get them from localstorage and set checkedTasks.
// do a for loop on checkedTasks and check the tasks

let tasks = localStorage.getItem('tasks');

if (tasks == null) {

    tasksArray = ["3 Litre Su İç", "En Az 3 Saat Kodlama Yap", "Yemek Yap", "Ödevleri Yap", "50 Sayfa Kitap Oku"]

    localStorage.setItem('tasks', JSON.stringify(tasksArray));
}

tasksArray = JSON.parse(tasks);

for (i = 0; i < tasksArray.length; i++) {

    let li = document.createElement(`li`);
    li.innerHTML = tasksArray[i]
    newListDom.appendChild(li);

    var myNodelist = document.getElementsByTagName("LI");
    var span = document.createElement("SPAN");
    var txt = document.createTextNode("\u00D7");
    span.className = "close";
    span.appendChild(txt);
    myNodelist[i].appendChild(span);

}

checkedTasksArray = JSON.parse(checkedTasks);

tasksArray = JSON.parse(tasks);

//Checking 


for (var i = 0; i < tasksArray.length; i++) {
  var currentItem = tasksArray[i];

  var taskElements = document.getElementsByTagName("LI");
  
  
  if (checkedTasksArray.includes(currentItem) == true) {
    
    taskElements[i].classList.add("checked");
   
  }
 
}

// Sayfa yüklendiğinde işaretlenmiş görevlere CSS uygulama




// adding "" || "     " character

function newElement() {
    if (newTaskDom.value.trim() === "") {
        $(toastError).toast(`show`);
    }
    else {
        let li = document.createElement(`li`);
        li.innerHTML = newTaskDom.value;
        newListDom.appendChild(li);

        var myNodelist = document.getElementsByTagName("LI");
        var span = document.createElement("SPAN");
        var txt = document.createTextNode("\u00D7");
        span.className = "close";
        span.appendChild(txt);
        myNodelist[i].appendChild(span);

        console.log(typeof newTaskDom)

        tasksArray.push(newTaskDom.value);

        localStorage.setItem('tasks', JSON.stringify(tasksArray))

        newTaskDom.value = ""

        $(toastOkay).toast(`show`);

    }

}

newListDom.addEventListener('click', function deleteElement(event) {
    if (event.target.tagName === 'SPAN') {

        parent = event.target.parentElement

        event.target.remove()

        taskText = parent.innerHTML

        parent.remove()

        tasksArray = tasksArray.filter(function (task) {
            return task !== taskText
        })

        localStorage.setItem('tasks', JSON.stringify(tasksArray))

    }
})

// Pop-up

var isCompleted = document.querySelector('ul');
isCompleted.addEventListener('click', function (ev) {
    if (ev.target.tagName === 'LI') {

        if (ev.target.classList.contains('checked')) {

            ev.target.classList.remove('checked');

            let innerLi = ev.target.childNodes[0];

            let innerLiText = ev.target.childNodes[0].nodeValue;

            if (checkedTasksArray.includes(innerLiText) == true) {

                checkedTasksArray = checkedTasksArray.filter(function (item) {
                    return item !== innerLiText
                })

                localStorage.setItem('checkedTasks', JSON.stringify(checkedTasksArray));

            }


            //checkedTasksArray = checkedTasksArray.filter(function (checkedTasks) {
            //  return checkedTasksArray !== checkedTasksArrayText
            //})

            //todo: remove from checked tasks if ev.target text is in checked tasks in local storage

        } else {

            ev.target.classList.add('checked');

            let innerLi = ev.target.childNodes[0];

            let innerLiText = ev.target.childNodes[0].nodeValue;

            if (checkedTasksArray.includes(innerLiText) == false) {

                checkedTasksArray.push(innerLiText);

            }

            localStorage.setItem('checkedTasks', JSON.stringify(checkedTasksArray));

        }

        toast();

    }


}, false);


//var isCompleted = document.querySelector('ul');
//isCompleted.addEventListener('click', function (ev) {
//if (ev.target.tagName === 'LI') {

//ev.target.classList.toggle('checked');

//popUp();

//}

//}, false);

function toast() {

    let Items = document.getElementsByClassName("checked")

    let checkedItems = Items.length

    let taskLenght = tasksArray.length

    if (checkedItems == tasksArray.length) {

        $(toastTaskSuccess).toast(`show`);

    } else {

        let remaining_tasks = (tasksArray.length - checkedItems);

        document.getElementById("remaining_tasks").innerHTML = `${remaining_tasks} görevin kaldı!!!`;

        $(toastTask).toast(`show`);
    }

}
