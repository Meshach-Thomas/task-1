const balance= document.querySelector("#balance");
const inc_amt = document.querySelector("#inc-amt");
const exp_amt = document.querySelector("#exp-amt");
const trans= document.querySelector("#trans");
const form = document.querySelector("#form");
const description = document.querySelector("#desc");
const amount= document.querySelector("#amount");



// local storage

const localStorageTrans = JSON.parse(localStorage.getItem("trans"));
let transactions =localStorage.getItem("trans") !==null? localStorageTrans :[];

 function loadTransactionDetails(transaction) {
    const sign = transaction.amount <0 ? "-" : "+";
    const item = document.createElement("li");
    item.classList.add(transaction.amount < 0 ? "exp" : "inc");
    item.innerHTML = `${transaction.description}
    <span>${sign} ${Math.abs(transaction.amount)}</span>
    <button class="btn-del" onclick="removetrans (${transaction.id}) ">x</button>`;

    trans.appendChild(item);
 } 
 function removetrans(id){
    if (confirm("are you want to delete transation")){
        transactions=transactions.filter((transactions) => transactions.id !=id);
   config();
   updatelocalStorage();
    }
        else{
            return;
        
    }

 }
//  this is for income and expenses
 function updateAmount(){
    const amounts = transactions.map((transactions) => (transactions.amount));
    const total = amounts.reduce((acc,item) => (acc += item),0).toFixed(2);
    balance.innerHTML=`₹ ${total}`;

    const income = amounts.filter((item) => item >0).reduce((acc,item) => (acc += item),0).toFixed(2);
    inc_amt.innerHTML=`₹ ${income}`;

    const expenses = amounts.filter((item) => item <0).reduce((acc,item) => (acc += item),0).toFixed(2);
    exp_amt.innerHTML=`₹ ${Math.abs(expenses)}`;
 }

 function config() {
   // tis for empty the transation details in html
trans.innerHTML = "";
transactions.forEach(loadTransactionDetails);
updateAmount();
 }
// for button 
 function addTransation(e) {
   e.preventDefault();
   
   if (description.value.trim()== ""|| amount.value.trim()=="" )
      {
      alert("please enter description and amount");
      
   }

      else{
         const transaction ={
            id: uniqueId(),
         description: description.value,
         amount: +amount.value,
      };
         transactions.push(transaction);
         loadTransactionDetails(transaction);
         // clear the value
         description.value = "";
         amount.value = "";
         updateAmount();
         updatelocalStorage();
      }
   
 }

 function uniqueId(){
   return Math.floor(Math.random() * 10000000);
 }

 form.addEventListener("submit", addTransation);

window.addEventListener("load", function () {
config();
});


function updatelocalStorage(){
   localStorage.setItem("trans",JSON.stringify(transactions));
}