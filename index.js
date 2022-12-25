

product=document.getElementById("product")
prices=document.querySelector(".prices")
ii=document.querySelector(".ii")
btn=document.getElementById("btn")
price=document.getElementById("price")
tax=document.getElementById("tax")
ads=document.getElementById("ads")
discount=document.getElementById("discount")
total=document.getElementById("total")
catagery=document.getElementById("catagery")
count=document.getElementById("count")
tbody=document.getElementById("tbody")
del=document.querySelector(".del")
search=document.getElementById("search")

let m;
mode='create'

    Arr=[]

if(localStorage.product){
  Arr=JSON.parse(localStorage.product)
  ShowDataInPage()
}




btn.onclick =function(){
if(catagery.value !=''&&price.value!=''&&product.value!='' ){
  addElementsTOArr(Arr)
addElementsToLocal(Arr)
ShowDataInPage()
emptyinputs()

}else{
  
}

}
getTotal=prices.onkeyup=function(){
  if(price.value!=""){
    result=(+price.value+ +tax.value+ +ads.value)- +discount.value
    total.innerHTML=result
    ii.style.cssText=`background-color:green;`
  }else{
    ii.style.cssText=`background-color:red;`
    total.innerHTML=''

  }
}

function addElementsTOArr(){
  productData={

    product: product.value,
    price:price.value,
    tax:tax.value,
    ads:ads.value,
    discount:discount.value,
    total:total.innerHTML,
    catagery:catagery.value,
    count:count.value,

  }
  if(mode=='create'){
    if(productData.count>1){
    for(i=0;i< count.value;i++){
      Arr.push(productData)

    }

    }else{
      Arr.push(productData)
  }
}else{
  mode="update"

Arr[m]=productData
btn.innerHTML="create"
count.style.cssText=`display:block;`
mode='create'


}}
  
function addElementsToLocal(){
  localStorage.setItem('product',JSON.stringify(Arr))
}

function getelemntsfromlocaltopage(){
  Arr=JSON.parse(localStorage.product)
}

function emptyinputs(){

 product.value=''
  price.value=''
  tax.value=''
  ads.value=''
  discount.value=''
 total.innerHTML=''
 ii.style.cssText=`background-color:red;`
 catagery.value=''
 count.value=''

}

function ShowDataInPage(){
  tbody.innerHTML=''

  table=''
  for(i=0;i<Arr.length;i++){
table +=`
<tr>

  <td>${i+1}</td>
  <td>${Arr[i].product}</td>
  <td>${Arr[i].price}</td>
  <td>${Arr[i].tax}</td>
  <td>${Arr[i].ads}</td>
  <td>${Arr[i].discount}</td>
  <td>${Arr[i].total}</td>   
  <td>${Arr[i].catagery}</td>
  <td>${Arr[i].count}</td>
  <td><button onclick="updateData(${i})">update</button></td>
  <td><button onclick="deleteFromPage(${i})">del</button></td>
</tr>`    
tbody.innerHTML=table 
delAll=document.getElementById('delAll')
if(Arr.length >1){
  delAll.innerHTML=`<button onclick="delAllData()">del All (${Arr.length})</button>`
}else{
  delAll.innerHTML=''
}

}

}


function deleteFromPage(i){

 Arr.splice(i,1)
  
refreshafterdelete()

}


function delAllData(){
  Arr.splice(0)
 localStorage.clear()
 refreshafterdelete()
 delAll.innerHTML=''

}

function refreshafterdelete(){
  addElementsToLocal() 
  getelemntsfromlocaltopage()
  ShowDataInPage()
}

function updateData(i){
mode="update"
product.value=Arr[i].product
price.value=Arr[i].price
tax.value=Arr[i].tax
ads.value=Arr[i].ads
discount.value=Arr[i].discount
catagery.value=Arr[i].catagery

count.style.cssText=`display:none;`
btn.innerHTML="update"
m=i
getTotal()
  scroll({
    top:0,
    behavior:"smooth"
  })
}

searchMode='title'

tSearch=document.getElementById("tSearch")
cSearch=document.getElementById("cSearch")

function searchFunction(id){
search.value=''
ShowDataInPage(Arr)
  if(id=="tSearch"){
    searchMode='title'
    search.placeholder='Search by Title'

  }else{
    searchMode='categry'
    search.placeholder='Search by categery'

  }
  search.focus()

}
search.onblur=function(){
  search.placeholder='Search'

}
function searchfun(value){
  tbody.innerHTML=''
  table=''
  if(    searchMode=='title'  ){
for(i=0;i<Arr.length;i++) {
if( Arr[i].product.toLowerCase().trim().includes(value.toLowerCase().trim())){
  table +=`
<tr>

  <td>${i+1}</td>
  <td>${Arr[i].product}</td>
  <td>${Arr[i].price}</td>
  <td>${Arr[i].tax}</td>
  <td>${Arr[i].ads}</td>
  <td>${Arr[i].discount}</td>
  <td>${Arr[i].total}</td>   
  <td>${Arr[i].catagery}</td>
  <td>${Arr[i].count}</td>
  <td><button onclick="updateData(${i})">update</button></td>
  <td><button onclick="deleteFromPage(${i})">del</button></td>
</tr>`    
tbody.innerHTML=table

}
}}else if( searchMode='categry'){ 
  for(i=0;i<Arr.length;i++) {
    if( Arr[i].catagery.toLowerCase().trim().includes(value.toLowerCase().trim()))
 { table +=`
<tr>

  <td>${i+1}</td>
  <td>${Arr[i].product}</td>
  <td>${Arr[i].price}</td>
  <td>${Arr[i].tax}</td>
  <td>${Arr[i].ads}</td>
  <td>${Arr[i].discount}</td>
  <td>${Arr[i].total}</td>   
  <td>${Arr[i].catagery}</td>
  <td>${Arr[i].count}</td>
  <td><button onclick="updateData(${i})">update</button></td>
  <td><button onclick="deleteFromPage(${i})">del</button></td>
</tr>`    
tbody.innerHTML=table
  

 }
 }
  }
}
