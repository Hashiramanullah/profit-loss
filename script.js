// Arrays to store purchases and sales data
let purchasesData = [];
let salesData = [];
let billData =[];
let costPrice;
let totalProfit=[];
let ToatlSalebill = [];
// Function to handle adding a purchase
function addPurchase() {
    let product = prompt("Enter the name of the purchased item:");
    let price = parseFloat(prompt("Enter the price of the item:"));
    let quantity = parseInt(prompt("Enter the quantity:"));
    costPrice = price;
    if (product && price && quantity) {
        let prices = price * quantity;
        let total = 0;
        
        // Calculate the total purchases
        // for (let purchase of purchasesData) {
        //     total += purchase.prices;
        // }

        // total += prices;

        purchasesData.push({ product,price, prices, quantity});
        updatePurchasesTable();
    }
}


// Function to handle adding a sale
// Function to handle adding a sale
function addSale() {
    let product = prompt("Enter the name of the sold item:");
    let price = parseFloat(prompt("Enter the price of the item:"));
    let quantity = parseInt(prompt("Enter the quantity:"));

    if (product && price && quantity) {
        // Check if the product is available in the purchases data
        let purchasedProduct = purchasesData.find(item => item.product === product);

        if (purchasedProduct) {

            // let costPrice;
            // for( let items of purchasesData){
                    
            //    costPrice = items.prices * quantity;
            // }
            if (purchasedProduct.quantity >= quantity) {
                let sellingPrice = price * quantity;
                let profit1 = price - costPrice;
                let profit = Math.abs(profit1 * quantity);
                totalProfit.push(profit);
                ToatlSalebill.push(sellingPrice);
                salesData.push({ product,price, sellingPrice, quantity, profit, totalProfit });
                updateSalesTable();
                
                purchasedProduct.quantity -= quantity;
                updatePurchasesTable();
            } else {
                alert("Insufficient quantity in stock.");
            }
        } else {
            alert("Product is not available for sale.");
        }
    }
}


let totalBill=1;
let salebill = 0;


function totalsale(){

    salebill=ToatlSalebill.reduce(function(a, b){
    
        return a + b;
    });

    alert(salebill + "Rs");


}



function calculateBill() {
    // Prompt user for bill details
    let electricityBillPercentage = parseFloat(prompt("Enter the percentage of electricity bill:"));
    let labourExpensesPercentage = parseFloat(prompt("Enter the percentage of labour expenses:"));
    let houseExpensesPercentage = parseFloat(prompt("Enter the percentage of house expenses:"));

    // Calculate the bill amounts based on percentages
    
    totalBill = totalBill + (electricityBillPercentage / 100) * totalBill
                          + (labourExpensesPercentage / 100) * totalBill
                          + (houseExpensesPercentage / 100) * totalBill;

    // let grandTotal = 0;
// alert(totalBill);
    // Update the bill table
    billData = [
        { item: "Electricity", percentage: electricityBillPercentage },
        { item: "Labour Expenses", percentage: labourExpensesPercentage },
        { item: "House Expenses", percentage: houseExpensesPercentage },
        { item: "Total Bill", percentage: totalBill.toFixed(2) + "%" }
    ];

    updateBillTable();
}


// Function to update the purchases table
function updatePurchasesTable() {
    let table = document.getElementById('purchasesTable');
    let tbody = table.getElementsByTagName('tbody')[0];
    

    // Clear the existing table rows
    tbody.innerHTML = "";

    // Add new rows based on purchasesData
    for (let i = 0; i < purchasesData.length; i++) {
        let row = tbody.insertRow();
        row.insertCell(0).innerHTML = purchasesData[i].product;
        row.insertCell(1).innerHTML = purchasesData[i].price;
        row.insertCell(2).innerHTML = purchasesData[i].quantity;
        row.insertCell(3).innerHTML = purchasesData[i].prices;
        

    
    }
}

// Function to update the sales table
function updateSalesTable() {
    let table = document.getElementById('salesTable');
    let tbody = table.getElementsByTagName('tbody')[0];

    // Clear the existing table rows
    tbody.innerHTML = "";

    // Add new rows based on salesData
    for (let i = 0; i < salesData.length; i++) {
        let row = tbody.insertRow();
        row.insertCell(0).innerHTML = salesData[i].product;
        row.insertCell(1).innerHTML = salesData[i].price;
        row.insertCell(2).innerHTML = salesData[i].quantity;   
        row.insertCell(3).innerHTML = salesData[i].sellingPrice;
        row.insertCell(4).innerHTML = salesData[i].profit;

    }
}



function updateBillTable() {
    let table = document.getElementById('billTable');
    let tbody = table.getElementsByTagName('tbody')[0];

    // Clear the existing table rows
    tbody.innerHTML = "";

    // Add new rows based on billData
    for (let i = 0; i < billData.length; i++) {
        let row = tbody.insertRow();
        row.insertCell(0).innerHTML = billData[i].item; 
        row.insertCell(1).innerHTML = billData[i].percentage;
    }
}

function grandProfitt(){

    let grandprofit = totalProfit.reduce(function(a, b){
        return a + b;
    })
    

    let tp = totalBill*100; 
    grandprofit = grandprofit-tp;
    alert(grandprofit.toFixed(0) + "Rs");
}



// Add event listeners to the buttons
document.getElementById('addPurchaseButton').addEventListener('click', addPurchase);
document.getElementById('addSaleButton').addEventListener('click', addSale);
document.getElementById('calculateBillButton').addEventListener('click', calculateBill);


// Call the functions to populate the tables initially
updatePurchasesTable();
updateSalesTable();
updateBillTable();




