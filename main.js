let title = document.getElementById('title');
let price = document.getElementById('price');
let taxes = document.getElementById('taxes');
let ads = document.getElementById('ads');
let discount = document.getElementById('discount');
let total = document.getElementById('total');
let count = document.getElementById('count');
let category = document.getElementById('category');
let submit = document.getElementById('submit');

let mood = 'create';
let tmp;
// console.log(title,price,taxes,ads,discount,total,count,category,submit);


//gettotal
function getTotal() {
    if (price.value != '') {
        let result = (+price.value) + (+taxes.value) + (+ads.value) - (+discount.value);
        total.innerHTML = result;
        total.style.background = '#040';
    } else {
        total.innerHTML = '';
        total.style.background = '#a00d02'; // Corrected color
    }
}




//create product
let datapro;
if(localStorage.product != null)
{
    datapro = JSON.parse(localStorage.product);
}else{
    datapro = [];
    }

submit.onclick = function() {
    let newpro = {
        title: title.value.toLowerCase(), // Corrected case sensitivity
        price: price.value,
        taxes: taxes.value,
        ads: ads.value,
        discount: discount.value,
        total: total.innerHTML,
        count: count.value,
        category: category.value.toLowerCase(), // Corrected case sensitivity
    }

    if(title.value != '' 
        && price.value != ''
        && category.value != ''
        &&newpro.count < 100){
        if (mood === 'create') {
            if (newpro.count > 1) {
                for (let i = 0; i < newpro.count; i++) {
                    datapro.push(newpro);
                }
            } else {
                datapro.push(newpro);
            }
    } else {
            datapro[tmp] = newpro;
            mood = 'create';
            submit.innerHTML = 'Create';
            count.style.display = 'block';
    }
    clearData()
    }
    
    //save local storage
    localStorage.setItem('product',  JSON.stringify(datapro) );
    //console.log(datapro);
    clearData();
    showData();
}

//clear inputs
function clearData(){
    title.value = '';
    price.value = '';
    taxes.value = '';
    ads.value = '';
    discount.value = '';
    total.innerHTML = '';
    count.value = '';
    category.value = '';
}

//show data
function showData(){
    getTotal()
    let table = '';
    for(let i = 0;i<datapro.length;i++)
    {
        table += 
        `
        <tr>
            <td>${i+1}</td>
            <td>${datapro[i].title}</td>
            <td>${datapro[i].price}</td>
            <td>${datapro[i].taxes}</td>
            <td>${datapro[i].ads}</td>
            <td>${datapro[i].discount}</td>
            <td>${datapro[i].total}</td>
            <td>${datapro[i].category}</td>
            <td><button onclick="updateData(${i})" id="update">update</button></td>
            <td><button onclick="deleteData(${i})" id="delete">delete</button></td>

        </tr>
        `;
    }

    document.getElementById('tbody').innerHTML = table;

    let btnDel = document.getElementById('deleteAll');
    if(datapro.length > 0)
    {
        btnDel.innerHTML = 
        `
       <button onclick="deleteAll()">Delete All (${datapro.length})</button>
        `
    }else{
        btnDel.innerHTML = '';
    }   
}
showData()



//delete
function deleteData(i){
datapro.splice(i,1);
localStorage.product = JSON.stringify(datapro);
showData();

}

//delete all

function deleteAll(){
    localStorage.clear()
    datapro.splice(0)
showData();

}

//update


function updateData(i){
    title.value = datapro[i].title;
    price.value = datapro[i].price;
    taxes.value = datapro[i].taxes;
    ads.value = datapro[i].ads;
    discount.value = datapro[i].discount;
    
    getTotal()
    count.style.display ='none';
    
    category.value = datapro[i].category;

    submit.innerHTML ='update';
    mood = 'update';
    tmp = i;

    scroll({
        top: 0,
        behavior:'smooth',
    })
}





//search
let searchMood = 'title';

function getSearchMood(id) {
    let search = document.getElementById('search');
    if (id == 'searchTitle') {
        searchMood = 'title';
        search.placeholder = 'Search By Title'; // Corrected placeholder case
    } else {
        searchMood = 'category';
        search.placeholder = 'Search By Category'; // Corrected placeholder case
    }
search.focus();
search.value = '';
showData()
}



function searchData(value){
    let table = '';
    if (searchMood === 'title'){

        for(let i =0;i<datapro.length;i++){
            if(datapro[i].title.includes(value.toLowerCase())){
                table += 
                `
                <tr>
                    <td>${i}</td>
                    <td>${datapro[i].title}</td>
                    <td>${datapro[i].price}</td>
                    <td>${datapro[i].taxes}</td>
                    <td>${datapro[i].ads}</td>
                    <td>${datapro[i].discount}</td>
                    <td>${datapro[i].total}</td>
                    <td>${datapro[i].category}</td>
                    <td><button onclick="updateData(${i})" id="update">update</button></td>
                    <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
    
                </tr>
                `;



        }
    }

}else{
    for(let i =0;i<datapro.length;i++){
        if(datapro[i].category.includes(value.toLowerCase())){
            table += 
            `
            <tr>
                <td>${i}</td>
                <td>${datapro[i].title}</td>
                <td>${datapro[i].price}</td>
                <td>${datapro[i].taxes}</td>
                <td>${datapro[i].ads}</td>
                <td>${datapro[i].discount}</td>
                <td>${datapro[i].total}</td>
                <td>${datapro[i].category}</td>
                <td><button onclick="updateData(${i})" id="update">update</button></td>
                <td><button onclick="deleteData(${i})" id="delete">delete</button></td>

            </tr>
            `;



    }
}
}

document.getElementById('tbody').innerHTML = table;

}


//clean data

