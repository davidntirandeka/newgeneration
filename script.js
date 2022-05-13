const main = document.getElementById('main');
const addUserBtn = document.getElementById('add-user');
const doublebtn= document.getElementById('double');
const showmillionaires = document.getElementById('showmillionaires');
const sortbtn = document.getElementById('sort');
const caculatewealthbtn = document.getElementById('calculate-wealth');
const reset = document.getElementById('reset');


let data=[]

getrandomuser();
getrandomuser();
getrandomuser();


//fetc random user and add money  
async function  getrandomuser() {
	const res = await  fetch('https://randomuser.me/api');
    const data = await res.json();

    const user = data.results[0];
// console.log(user)
    const newuser ={
       name: `${user.name.first} ${user.name.last}`,
       money: Math.floor(Math.random() * 1000000)
    };
    addData(newuser);
}

// double eveyones money
function doubleMoney(){
    data = data.map((user) => {
        return { ...user, money: user.money * 2 };
    });

    updateDOM();
} 

//sort users by richest
function sortbyrichest(){
    data.sort((a, b) => b.money - a.money);


    updateDOM();

}

// Filter only millionaires
function handleShowMillionaires() {
  data = data.filter(user => user.money > 1000000);

  updateDOM();
}
//caclulate the total wealth



//add new obj to data arr
function addData(obj) {
    data.push(obj);

    updateDOM();
}


//update DOM
function updateDOM(providedData = data) {
    //clear man div
    main.innerHTML ='<h2><strong>Person</strong>Wealth</h2>';

providedData.forEach(item => {
  const element = document.createElement('div');
  element.classList.add('person');
  element.innerHTML  = `<strong>${item.name}</strong> ${formatMoney(item.money)}`; 
  main.appendChild(element);
}); 
  
// Format number as money - https://stackoverflow.com/questions/149055/how-to-format-numbers-as-currency-string


}
function formatMoney(number) {
  return '$' + number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
}
function caculatewealth(){
  const wealth = data.reduce((acc,user) =>(acc += user.money), 0); 

 const wealthEl = document.createElement('div');
 wealthEl.innerHTML = `<h3>Total Wealth: <strong>${formatMoney(wealth)}</strong></h3>`;
 main.appendChild(wealthEl);


}

//reseting the person
function resetThePerson (){
const resetallEl = document.createElement('div');
resetallEl.innerHTML = `<h2>reset:<strong>reset</strong>`;
}

 
 // format number 
 // Event Listeners
 addUserBtn.addEventListener('click',getrandomuser); 
 doublebtn.addEventListener('click',doubleMoney); 
 sortbtn.addEventListener('click',sortbyrichest); 
 showmillionaires.addEventListener('click',handleShowMillionaires);
caculatewealthbtn.addEventListener('click',caculatewealth);
reset.addEventListener('click',resetThePerson);