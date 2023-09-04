let newTaskDom = document.getElementById("task")
let newListDom = document.getElementById("list")
let existingListItems = newListDom.querySelectorAll('li');
let toastError = document.querySelector(`.toast.error`);
let toastOkay = document.querySelector(`.toast.success`);

// Close button x

var myNodelist = document.getElementsByTagName("LI");
var i;
for (i = 0; i < myNodelist.length; i++) {
    var span = document.createElement("SPAN");
    var txt = document.createTextNode("\u00D7");
    span.className = "close";
    span.appendChild(txt);
    myNodelist[i].appendChild(span);
}

//Checked Symbols

var list = document.querySelector('ul');
list.addEventListener('click', function (ev) {
    if (ev.target.tagName === 'LI') {
        ev.target.classList.toggle('checked');
    }
}, false);

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
        var i;
        for (i = 0; i < myNodelist.length; i++) {
            var span = document.createElement("SPAN");
            var txt = document.createTextNode("\u00D7");
            span.className = "close";
            span.appendChild(txt);
            myNodelist[i].appendChild(span);
        }

        $(toastOkay).toast(`show`);

    }
    newTaskDom.value = ""
}

newListDom.addEventListener('click', function deleteElement(event) {
    if (event.target.tagName === 'SPAN') {
        event.target.parentElement.remove()
    }
})
