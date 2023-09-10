let newTaskDom = document.getElementById("task")
let newListDom = document.getElementById("list")
let existingListItems = newListDom.querySelectorAll('li');
let toastError = document.querySelector(`.toast.error`);
let toastOkay = document.querySelector(`.toast.success`);
let toastTask = document.getElementsByClassName("remaining_tasks");
let toastTaskSuccess = document.getElementsByClassName("tasks");

//Local Storage

let tasksArray = [];

let checkedTasks = [];

// check if there is checked tasks in localstorage
// if yes;
    // get them from localstorage and set checkedTasks.
    // do a for loop on checkedTasks and check the tasks

let tasks = localStorage.getItem('tasks');

if (tasks == null) {

    tasksArray = ["3 Litre Su İç", "En Az 3 Saat Kodlama Yap", "Yemek Yap", "Ödevleri Yap", "50 Sayfa Kitap Oku"]

    localStorage.setItem('tasks', JSON.stringify(tasksArray));
}

tasksArray = JSON.parse(tasks)

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
        
        tasksArray.push(newTaskDom.value);

        localStorage.setItem('tasks', JSON.stringify(tasksArray))

        newTaskDom.value = ""

        $(toastOkay).toast(`show`);

    }

}

// localStorage.getItem(tasksArray);

// existingListItems.innerHTML = tasksArray

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

            //todo: remove from checked tasks if ev.target text is in checked tasks in local storage
        
        } else {
            
            ev.target.classList.add('checked');

            let innerLi = ev.target.childNodes[0]

            console.log(innerLi)

            localStorage.setItem('checkedTasks', JSON.stringify(checkedTasks));
        
        }


        //local
        //const isLiChecked = ev.target.classList.//contains('checked');
        //localStorage.setItem('tasks', JSON.stringify//(tasksArray));

        //console.log(isLiChecked);

        popUp();

    }
    
    
}, false);


//var isCompleted = document.querySelector('ul');
//isCompleted.addEventListener('click', function (ev) {
    //if (ev.target.tagName === 'LI') {

        //ev.target.classList.toggle('checked');

        //popUp();

    //}
    
//}, false);

function popUp() {

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
