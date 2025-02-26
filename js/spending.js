//open or close the expenses details popup;
let popup = document.getElementById("popupArea")
let openPopup = document.getElementById("new-expense");
let closePopup = document.getElementById("cancel");

function clearForm () {
    var input = document.querySelectorAll("#newExpense input");
    var select = document.querySelectorAll("#newExpense select");

    input.forEach (input => {
        if (input.value != " ") {
            input.value = " ";
        }
    })

    select.forEach (option => {
        if (option.value != "select") {
            option.value = "select"
        }
    }) 
}

function opnPop() {
    clearForm();

    popup.style.display = "flex";
}

openPopup.addEventListener("click", function() {
    clearForm();

    popup.style.display = "flex";
})

closePopup.addEventListener("click", function() {
    clearForm();

    popup.style.display = "none";
})

//Form validation 

// var defaultSpending = 0;
// localStorage.setItem("totalExpense", defaultSpending);

var totalExpense = 0;
// localStorage.setItem("totalExpense", totalExpense);

var showExpense = document.getElementById("total");

//will load all previous content everytime that the window is updated;
var expDefaultArea = document.getElementById("expensesDash");

window.addEventListener("load", function() {
    //if the localstorage is empty, the return will be "[object HTMLUListElement]", so the "if" verify it and, if true, will return nothing;
    if (localStorage.getItem("calendar") == "[object HTMLUListElement]") {
        expDefaultArea.innerHTML = " ";
    } else {
        expDefaultArea.innerHTML = localStorage.getItem("calendar");

        if (localStorage.getItem("totalExpense") === null) {
            showExpense.innerHTML = `R$0,00`
        } else {
            showExpense.innerHTML = `R$${localStorage.getItem("totalExpense")}`;
        }
    }
})

// window.addEventListener("load", () => {
//     localStorage.clear("calendar");
//     localStorage.clear("totalExpense");
// })


var monthList = [];
localStorage.setItem("monthList", JSON.stringify(monthList));

function addExpense () {
    let expenseName = document.getElementById("expense-name").value;
    let expenseDate = document.getElementById("expense-date").value;
    let expenseMonth = document.getElementById("month").value;
    let expenseCategory = document.getElementById("expense-category").value;
    let paymentMethod = document.getElementById("payment-method").value;
    let expensePrice = document.getElementById("expense-price").value;
    
    var switchingSymbol = expensePrice.replace(",", ".");
    var converting = parseFloat(switchingSymbol);

    var totalExist = localStorage.getItem("totalExpense")

    if (totalExist === null) {
        totalExpense += converting
        localStorage.setItem("totalExpense", totalExpense);
    } else {
        var currentTotal = parseFloat(localStorage.getItem("totalExpense"));

        currentTotal += converting;

        localStorage.setItem("totalExpense", currentTotal);
    }
    

    //shows the total expense on the respective block formated;
    var format = totalExpense.toFixed(2).replace(".", ",")
    showExpense.innerHTML = `R$${localStorage.getItem("totalExpense")}`;

    //get the expense dash;
    const expenseArea = document.getElementById("expensesDash");
    
    //Add the current month block;
    const monthBlock = document.getElementById("currentMonth");
    
    const currentMonth = () => {   
        const newCurrentMonth = document.createElement("H1");
        newCurrentMonth.id = "currentMonth";
        newCurrentMonth.innerHTML = expenseMonth;

        expenseArea.appendChild(newCurrentMonth);

        monthList.push(expenseMonth);  
    }

    var calendarExist = localStorage.getItem("calendar");

    if (calendarExist === null) {
        currentMonth();
    }  else if (!localStorage.getItem(("calendar")).includes(expenseMonth)) {
        currentMonth();
    }
    const newExpenseBlock = document.createElement("UL");
    const listItem = document.createElement("LI");
    const newTable = document.createElement("TABLE");
    
    const title = document.createElement("TR");

    title.innerHTML = `
    <th>Descri.:</th>
    <th>Dia:</th>
    <th>Tipo:</th>
    <th>Pgto.:</th>
    <th>Valor:</th>
    `;
    
    // Create the content for the new table row
    const row = document.createElement("TR");

    row.innerHTML = `
    <td>${expenseName}</td>
    <td>${expenseDate}</td>
    <td>${expenseCategory}</td>
    <td>${paymentMethod}</td>
    <td>R$${expensePrice}</td>
`;
    newTable.appendChild(title);
    // Add the row to the table
    newTable.appendChild(row);

    // Add the table to the list item
    listItem.appendChild(newTable);

    // Add the list item to the new expense block
    newExpenseBlock.appendChild(listItem);

    // Append the new expense block to the expense area
    expenseArea.appendChild(newExpenseBlock);

    var convertingObj = expenseArea.outerHTML;
    
    localStorage.setItem("calendar", convertingObj);
}

let sendForm = document.getElementById("send");

sendForm.addEventListener("click", function() {
    var input = document.querySelectorAll("#newExpense input");
    var select = document.querySelectorAll("#newExpense select");

    function warningPopup () {
        var closeWarningPopup = document.getElementById("closeWarnPop");
        var warningPopup = document.getElementById("warningPopupArea");
    
        warningPopup.style.display = "flex";
    
        closeWarningPopup.addEventListener("click", () => {
            warningPopup.style.display = "none";
        })
    }

    input.forEach (input => {
        if (input.value === " ") {
            warningPopup();
        }
    })

    select.forEach (option => {
        if (option.value === "select") {
            warningPopup();
        }
    }) 

    if (
        Array.from(input).every(input => input.value.trim() !== "") && 
        Array.from(select).every(option => option.value !== "select")
    ) {
        addExpense()
        popup.style.display = "none";
    }
    // Closes the popup after adding the expense
})

// !!!ATENTION!!!

// the function below has been temporarily disabled until the incompatibility is resolved

// const createCalendar = document.getElementById("newPeriod");

// createCalendar.addEventListener("click", function() {
//     const generalArea = document.getElementById("principal");

//     const detArea = document.createElement("DIV");
//     detArea.classList.add("det-area");

//     const totalArea = document.createElement("DIV");
//     totalArea.classList.add("total-area");

//     const totalTitle = document.createElement("H1");
//     totalTitle.innerHTML = 'Gasto'

//     const total = document.createElement("P");
//     total.id = "total";

//     const calendar = document.createElement("DIV");
//     calendar.classList.add("calendar");

//     const calendarTitle = document.createElement("H1");
//     calendarTitle.innerHTML = "Fevereiro";

//     const divisor = document.createElement("DIV");
//     divisor.classList.add("divisor")

//     const addNewExpense = document.createElement("BUTTON");
//     addNewExpense.id = "new-expense";
//     addNewExpense.setAttribute('onclick', 'opnPop()');
//     addNewExpense.innerHTML = "+ Adicionar gasto";

//     detArea.appendChild(totalArea);

//     totalArea.appendChild(totalTitle);
//     totalArea.appendChild(total);
//     total.innerHTML = `R$${totalExpense}`;

//     detArea.appendChild(calendar);
//     calendar.appendChild(calendarTitle);
//     generalArea.appendChild(detArea);

//     calendar.appendChild(addNewExpense);
    
//     detArea.appendChild(divisor);


//     // addExpense();
// })



// let n = 5;

// const numbers = [0, 1, 4, 5]

// console.log(numbers.find((x) => x === n));