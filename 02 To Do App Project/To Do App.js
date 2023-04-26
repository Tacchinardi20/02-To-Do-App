// Getting All Required Elements
const inputBox = document.querySelector(".inputField input");
const addBtn = document.querySelector(".inputField button");
const todoList = document.querySelector(".todoList");
const deleteAllBtn = document.querySelector(".footer button");

inputBox.onkeyup = () => {
    let userData = inputBox.value; // Getting User Entered Value

    if (userData.trim() !=0) { // If User Values Aren't Only
        addBtn.classList.add("active"); // Active the Add Button
    } else {
        addBtn.classList.remove("active"); // Active the Remove Button
    }

}

    showTasks(); // Calling showTasks Function

// If User Click on the Add Button
addBtn.onclick = () => {
    let userData = inputBox.value; // Getting User Entered Value
    let getLocalStorage = localStorage.getItem("New Todo"); // Getting Local Storage

    if (getLocalStorage == null) { // If Local Storage is Null
        listArr = []; // Creating Blank Array
    } else {
        listArr = JSON.parse(getLocalStorage); // Transforming JSON String Into a JS Object
    }

    listArr.push(userData); // Pushing or Adding User Data
    localStorage.setItem("New Todo", JSON.stringify(listArr)); // Transforming JS Object Into a JSON String

    showTasks(); // Calling showTasks Function

    addBtn.classList.remove("active"); // Inactive the Remove Button
}

// Function to Add Task List Inside ul
function showTasks() {
    let getLocalStorage = localStorage.getItem("New Todo"); // Getting Local Storage

    if (getLocalStorage == null) { // If Local Storage is Null
        listArr = []; // Creating Blank Array
    } else {
        listArr = JSON.parse(getLocalStorage); // Transforming JSON String Into a JS Object
    }

    const pendingNumb = document.querySelector(".pendingNumb");

    pendingNumb.textContent = listArr.length; // Passing the Length Value in PendingNumb

    if (listArr.length > 0) {
        deleteAllBtn.classList.add("active"); // Active the Clear All Button
    } else {
        deleteAllBtn.classList.remove("active"); // Inactive the Clear All Button
    }

    let newLiTag = '';

    listArr.forEach((element, index) => {
        newLiTag += `<li>${element}<span onclick="deleteTask(${index})"><i class="fas fa-trash"></i></span></li>`;
    });

    todoList.innerHTML = newLiTag; // Adding New li Tag Inside ul Tag
    inputBox.value = ""; // Once Task Added, Leave the Input Field Blank
}

// Delete Task Function
function deleteTask(index) {
    let getLocalStorage = localStorage.getItem("New Todo");

    listArr = JSON.parse(getLocalStorage);
    listArr.splice(index, 1); // Delete or Remove the Particular Indexed li

    // After Delete the li Again, Update the Local Storage
    localStorage.setItem("New Todo", JSON.stringify(listArr)); // Transforming JS Object Into a JSON String

    showTasks(); // Calling showTasks Function
}

// Delete All Tasks Function
deleteAllBtn.onclick = () => {
    listArr = []; // Creating Blank Array

    // After Delete All Tasks Again, Update the Local Storage
    localStorage.setItem("New Todo", JSON.stringify(listArr)); // Transforming JS Object Into a JSON String

    showTasks(); // Calling showTasks Function
}