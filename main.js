const taskBtnsContainer = document.querySelector(".tasks-btns-container");
const tasksEl = document.querySelector(".tasks");
const removeBtns = document.getElementsByClassName("remove-btn");
const tasksTotalEl = document.getElementById("tasks-total");
const notesSubtitleEl = document.querySelector(".notes-subtitle");
const printBtn = document.getElementById("print-btn");

let tasksNameArr = [];
let tasksPriceArr = [];

// EventListener for tasks buttons container
taskBtnsContainer.addEventListener("click", function (event) {
    if (!event.target.classList.contains("task-btn")) {
        return;
    }
    const taskName = event.target.textContent.split(":")[0];
    const taskPrice = Number(event.target.textContent.split("$")[1]);
    // Prevent task duplicate in the array
    if (tasksNameArr.indexOf(taskName) !== -1) {
        return;
    }
    tasksNameArr.push(taskName);
    tasksPriceArr.push(taskPrice);
    tasksRender(tasksNameArr, tasksPriceArr);
    totalRender();
});

// EventListener for tasks section
tasksEl.addEventListener("click", function (event) {
    if (!event.target.classList.contains("remove-btn")) {
        return;
    }
    const removeBtnIndex = Array.from(removeBtns).indexOf(event.target);
    tasksNameArr.splice(removeBtnIndex, 1);
    tasksPriceArr.splice(removeBtnIndex, 1);
    tasksRender(tasksNameArr, tasksPriceArr);
    totalRender();
});

// Function to render tasks in HTML
function tasksRender(namesArr, pricesArr) {
    let taskHtml = "";
    for (let i = 0; i < namesArr.length; i++) {
        taskHtml += `
        <div class="item">
            <p class="item-name">${namesArr[i]}<span class="remove-btn">Remove</span></p>
            <p>$<span class="item-price">${pricesArr[i]}</span></p>
        </div>
        `;
    }
    tasksEl.innerHTML = `
        <div class="titles">
            <h3 class="title">Task</h3>
            <h3 class="title">Total</h3>
        </div>
        ${taskHtml}
    `;
}

// Function to calculate & render total in HTML
function totalRender() {
    // Calculate the sum of the tasksPriceArr
    const totalPrice = tasksPriceArr.reduce((a, b) => a + b, 0);
    tasksTotalEl.textContent = `$${totalPrice}`;
    tasksTotalEl.classList.add("dark-num");
    notesSubtitleEl.textContent = `We accept cash, credit card, or PayPal`;
    if (totalPrice === 0) {
        tasksTotalEl.classList.remove("dark-num");
        notesSubtitleEl.textContent = "";
    }
}

// EventListener for print button for print & reset invoice
printBtn.addEventListener("click", function () {
    // Hide tasks buttons & submit button from printing area
    taskBtnsContainer.style.display = "none";
    printBtn.style.display = "none";
    window.print();
    // Reset HTML to initial state
    taskBtnsContainer.style.display = "flex";
    printBtn.style.display = "block";
    tasksNameArr = [];
    tasksPriceArr = [];
    tasksRender(tasksNameArr, tasksPriceArr);
    totalRender();
});
