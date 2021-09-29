const coffees = [
  { name: "Bryggkaffe", price: 20 },
  { name: "Cappucino", price: 30 },
  { name: "Latte", price: 40 },
]
const amountInfo = document.createElement("p")
function productsOfCoffee() {
  const select = document.getElementById("coffee")
  select.innerText = ""
  for (i = 0; i < coffees.length; i++) {
    let opt = document.createElement("option")
    opt.innerText = `${coffees[i].name} - ${countPrice(i)} kr`
    opt.value = i

    select.appendChild(opt)
  }
}

let transactions = []
function addTransaction(id, amount) {
  const price = countPrice(id)
  const name = coffees[id].name
  const sum = amount * price

  transactions.push({ id, name, amount, price, sum })

  return
}

function countPrice(id) {
  const firstDiscountSum = 500
  const secondDiscountSum = 1000
  const firstDiscount = 0.9
  const secoundDiscount = 0.85
  let price = coffees[id].price
  const TotalSpent = getTotalSpent()
  if (TotalSpent >= secondDiscountSum) {
    price = Math.ceil(price * secoundDiscount)
  } else if (TotalSpent >= firstDiscountSum) {
    price = Math.ceil(price * firstDiscount)
  }
  return price
}

function validation(checkCups) {
  const maxCups = 10
  const errorText = document.getElementById("antalError")
  if (checkCups < 0 || checkCups === "0") {
    errorText.innerHTML = "Du måste ha ett possitivt antal koppar"
    errorText.style.color = "red"
    return false
  } else if (checkCups === "") {
    errorText.innerHTML = "Du måste mata in antal"
    errorText.style.color = "red"
  } else if (checkCups > maxCups) {
    errorText.innerHTML = "Du kan inte köpa mer än 10 koppar"
    errorText.style.color = "red"
    return false
  } else {
    errorText.innerHTML = ""
    return true
  }
}

function getTotalSpent() {
  let totalSum = 0
  transactions.forEach((transaction) => {
    totalSum += transaction.sum
  })
  return totalSum
}
function getTotalCups() {
  let totalCups = 0
  transactions.forEach((transaction) => {
    totalCups += parseInt(transaction.amount)
    console.log(totalCups)
  })
  return totalCups
}

function showTransactions() {
  const parentTransaction = document.getElementById("transaction")
  const transactionHeader = document.getElementById("transactionHeader")
  parentTransaction.innerHTML = ""
  transactions.forEach((transaction) => {
    const transactionInfo = document.createElement("p")
    transactionInfo.innerHTML = `Du köpte ${transaction.amount} st 
                  ${transaction.name} för ${transaction.price} 
                  kr styck. Summa: ${transaction.sum}`
    // parentTransaction.appendChild(transactionInfo);
    parentTransaction.prepend(transactionInfo)
    // parentTransaction.insertBefore(transactionInfo, parentTransaction.firstChild);
  })
  if (transactions.length >= 1) {
    transactionHeader.innerHTML = "Dina Transaktioner"
  }
}
function membershipStatus(totalCups) {
  const bronsStatus = 10
  const goldStatus = 30
  const status = document.getElementById("memberstatus")
  if (totalCups < bronsStatus) {
    status.innerText = "Medlemskapsstatus: Brons"
  } else if (totalCups >= bronsStatus && totalCups < goldStatus) {
    status.innerText = "Medlemskapsstatus: Silver"
  } else {
    status.innerText = "Medlemskapsstatus: Guld"
  }
}

function getAmountInfo() {
  const parentAmount = document.getElementById("amount")
  amountInfo.innerHTML = `Du har handlat för ${getTotalSpent()}kr och ${getTotalCups()} koppar`
  parentAmount.appendChild(amountInfo)
}

function onBuyButtonClick() {
  const amountOfCups = document.getElementById("amountOfCups").value
  const coffeeSort = document.getElementById("coffee").value

  if (validation(amountOfCups)) {
    addTransaction(coffeeSort, amountOfCups)
    showTransactions()
    membershipStatus(getTotalCups())
    productsOfCoffee()
    getAmountInfo()
  }

  console.log(transactions)
}
