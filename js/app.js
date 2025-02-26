// import sqlite3 from 'sqlite3';
// import {open} from 'sqlite';

// async function createAndPopulateTable () {
//     const db = await open({
//         filename: "./database/data.db",
//         drive: 'sqlite3',
//     })
// }



const monthNames = [];
    
    monthNames[1]= "Janeiro"
    monthNames[2]= "Fevereiro",
    monthNames[3]= "Março",
    monthNames[4]= "Abril",
    monthNames[5]= "Maio",
    monthNames[6]= "Junho",
    monthNames[7]= "Julho",
    monthNames[8]= "Agosto",
    monthNames[9]= "Setembro",
    monthNames[10]= "Outubro",
    monthNames[11]= "Novembro",
    monthNames[12]= "Dezembro";


const calendar = document.getElementById("date");

const currentDate = new Date();

const day = String(currentDate.getDate()).padStart(2, "0");
const month = Number(currentDate.getMonth());
const year = currentDate.getFullYear();

const date = `${day} de ${monthNames[month+1]} de ${year}`;

calendar.innerHTML = date;

//active the menu
const menu = document.getElementById("menu");
const opnMenu = document.getElementById("open");
const clsMenu = document.getElementById("close");

opnMenu.addEventListener("click", function() {
    menu.style.display = "flex";
})

clsMenu.addEventListener("click", function() {
    menu.style.display = "none";
})

//block related to the current balance
// var defaultBalance = 0;
// localStorage.setItem("totalBalance", defaultBalance);

var balanceValue = document.getElementById("balanceValue");

var balance = parseFloat(localStorage.getItem("totalBalance")) - parseFloat(localStorage.getItem("totalExpense"));

var totalReceipts = document.getElementById("salary");

window.addEventListener("load", () => {
    if (localStorage.getItem("totalBalance") === null || localStorage.getItem("totalBalance") === 0) {
        balanceValue.innerHTML = `R$0,00`
    } else if (localStorage.getItem("totalExpense") === null) {
        balanceValue.innerHTML = `R$${localStorage.getItem("totalBalance")}`;

        totalReceipts.innerHTML = `R$${localStorage.getItem("currentTotalReceipt")}`;

        // console.log(typeof(balance))
        // console.log(localStorage.getItem("totalReceipt"))

        // console.log(typeof(localStorage.getItem("totalExpense")))
        console.log(localStorage.getItem("totalExpense"))
        console.log(localStorage.getItem("totalBalance"))
    } else {
        balanceValue.innerHTML = `R$${balance.toFixed(2).replace(".", ",")}`;
    }

    if (localStorage.getItem("totalReceipt") === null) {
        totalReceipts.innerHTML = `R$0,00`;
    } else {
        totalReceipts.innerHTML = `R$${localStorage.getItem("totalReceipt")}`;
    }
}) 

const addReceipts = document.getElementById("edit");
const receiptsPopup = document.getElementById("receiptsPopupArea");

addReceipts.addEventListener("click", function() {
    receiptsPopup.style.display = "flex";
});

const closeReceiptPopup = document.getElementById("closeReceiptPopup");

closeReceiptPopup.addEventListener("click", function() {
    receiptsPopup.style.display = "none";
})

const sendNewReceipt = document.getElementById("addReceipt");
    
sendNewReceipt.addEventListener("click", function() {
    
    let receiptInput = document.getElementById("receiptInput");
    let requiredInput = document.getElementById("required");
    
    if (receiptInput.value === "") {
        receiptInput.style.outline = "1px solid red";
        requiredInput.style.display = "flex";
    } else {
        let receiptValue = document.getElementById("receiptInput").value;

        console.log(typeof(receiptValue))

        var switchingSymbol = receiptValue.replace(",", ".");
        var convertingReceipt = parseFloat(switchingSymbol);

        var currentBalanceExist = localStorage.getItem("totalBalance");
        var currentReceipt = localStorage.getItem("totalReceipt");

        if (currentBalanceExist === null) {
            localStorage.setItem("totalBalance", convertingReceipt);
        } else {
            var currentTotalBalance = parseFloat(localStorage.getItem("totalBalance"));
            
            currentTotalBalance += convertingReceipt;

            localStorage.setItem("totalBalance", currentTotalBalance);
        }

        if (currentReceipt === null) {
            localStorage.setItem("totalReceipt", convertingReceipt);
        } else {
            var currentTotalReceipt = parseFloat(localStorage.getItem("totalReceipt"));

            currentTotalReceipt += convertingReceipt;

            localStorage.setItem("totalReceipt", currentTotalBalance);
        }

        balanceValue.innerHTML = `R$${localStorage.getItem("totalBalance")}`;
        totalReceipts.innerHTML = `R$${localStorage.getItem("totalReceipt")}`;
        
        location.reload();

        receiptsPopup.style.display = "none";
    }
})

//block related to the current spending
var spendingValue = document.getElementById("spendingValue");
var spend = localStorage.getItem("totalExpense");

// spend.toFixed(".", ",")

if (spend === " " || spend === null) {
    spendingValue.innerHTML = `R$0,00`;
} else {
    spendingValue.innerHTML = `R$${spend.replace(".", ",")}`;
}

//format the background color based on the current spending value

let spending = document.getElementById("spending");

if (spend <= 450) {
    spending.style.backgroundColor = "#87BBA2";
} else if (spend <= 650) {
    spending.style.backgroundColor = "#FFF07C";
} else {
    spending.style.backgroundColor = "#E3655B"
}

//block realted to show the detailment os the balance
var detBtn = document.getElementById("showDetails");
var verDet = document.getElementById("details");

detBtn.addEventListener("click", function() {

    if (verDet.style.display = "none") {
        verDet.style.display = "flex";
        detBtn.style.display = "none";
    }
})

var lessDet = document.getElementById("lessDetails");

lessDet.addEventListener("click", function() {

    if (verDet.style.display = "block") {
        console.log("Abriu")
        verDet.style.display = "none";
        detBtn.style.display = "block";
    }
})

