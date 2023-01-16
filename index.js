

const product = document.getElementById("product")
const prices = document.querySelector(".prices")
const ii = document.querySelector(".ii")
const btn = document.querySelector("#btn button")
const price = document.getElementById("price")
const tax = document.getElementById("tax")
const ads = document.getElementById("ads")
const discount = document.getElementById("discount")
const total = document.getElementById("total")
const catagery = document.getElementById("catagery")
const count = document.getElementById("count")
const tbody = document.getElementById("tbody")
const del = document.querySelector(".del")
const search = document.getElementById("search")

let updatedEle;

mode = 'create'

let Arr = []

if (localStorage.product) {
  Arr = JSON.parse(localStorage.product)
  ShowDataInPage(Arr)
}




btn.onclick = function () {
  if (catagery.value != '' && price.value != '' && product.value != '') {
    addElementsTOArr(Arr)
    addElementsToLocal(Arr)
    ShowDataInPage(Arr)
    emptyinputs()

  } else {
  }

}
const getTotal = prices.onkeyup = function () {
  if (price.value != "") {
    result = (+price.value + +tax.value + +ads.value) - +discount.value
    total.innerHTML = result
    ii.style.cssText = `background-color:green;`
  } else {
    ii.style.cssText = `background-color:red;`
    total.innerHTML = ''

  }
}

function addElementsTOArr() {
  productData = {

    product: product.value,
    price: price.value,
    tax: tax.value,
    ads: ads.value,
    discount: discount.value,
    total: total.innerHTML,
    catagery: catagery.value,
    count: count.value,

  }
  if (mode == 'create') {

    Arr.push(productData)

  } else {
    mode = "update"

    Arr[updatedEle] = productData
    btn.innerHTML = "create"
    mode = 'create'


  }
}

function addElementsToLocal() {
  localStorage.setItem('product', JSON.stringify(Arr))
}

function getelemntsfromlocaltopage() {
  Arr = JSON.parse(localStorage.product)
}

function emptyinputs() {

  product.value = ''
  price.value = ''
  tax.value = ''
  ads.value = ''
  discount.value = ''
  total.innerHTML = ''
  ii.style.cssText = `background-color:red;`
  catagery.value = ''
  count.value = ''

}

function ShowDataInPage(Arr) {
  tbody.innerHTML = ''

  table = ''
  for (i = 0; i < Arr.length; i++) {
    table += `
<tr>

  <td>${i + 1}</td>
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
    tbody.innerHTML = table
    delAll = document.getElementById('delAll')
    if (Arr.length > 1) {
      delAll.innerHTML = `<button onclick="delAllData()"> Clear (${Arr.length})</button>`
    } else {
      delAll.innerHTML = ''
    }

  }

}


function deleteFromPage(i) {

  Arr.splice(i, 1)

  updateUi()

}


function delAllData() {
  Arr.splice(0)
  localStorage.clear()
  updateUi()
  delAll.innerHTML = ''

}

function updateUi() {
  addElementsToLocal()
  getelemntsfromlocaltopage()
  ShowDataInPage(Arr)
}

function updateData(i) {
  mode = "update"
  product.value = Arr[i].product
  price.value = Arr[i].price
  tax.value = Arr[i].tax
  count.value = Arr[i].count
  ads.value = Arr[i].ads
  discount.value = Arr[i].discount
  catagery.value = Arr[i].catagery


  btn.innerHTML = "update"
  updatedEle = i
  getTotal()
  scroll({
    top: 0,
    behavior: "smooth"
  })
}

let searchMode = 'title';

const tSearch = document.getElementById("tSearch")
const cSearch = document.getElementById("cSearch")

function searchFunction(id) {
  search.value = ''
  ShowDataInPage(Arr)
  if (id == "tSearch") {
    searchMode = 'title'
    search.placeholder = 'Search by Title'

  } else {
    searchMode = 'categry'
    search.placeholder = 'Search by categery'

  }
  search.focus()

}
search.onblur = function () {
  search.placeholder = 'Search'

}


function searchfun(value) {
  tbody.innerHTML = ''
  table = ''
  let searchArr = [];
  if (searchMode == 'title') {
    for (i = 0; i < Arr.length; i++) {
      if (Arr[i].product.toLowerCase().trim().includes(value.toLowerCase().trim())) {
        searchArr.push(Arr[i])

      }
    }
    ShowDataInPage(searchArr)
  } else if (searchMode = 'categry') {
    for (i = 0; i < Arr.length; i++) {
      if (Arr[i].catagery.toLowerCase().trim().includes(value.toLowerCase().trim())) {
        searchArr.push(Arr[i])

      }
    }
    ShowDataInPage(searchArr)

  }
}
