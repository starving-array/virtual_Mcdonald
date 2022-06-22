// virtualMenu
// virtual key array found from localStore

setTimeout(function () {
  iterateKeyMaster(masterDatabaseMacdonalsKey);
}, 100);

function iterateKeyMaster(dataKey) {
  dataKey.forEach(function (keyElement) {
    //  keyelement will use to get data
    // keyelement bavarage, breakfast ...

    eachCatagory(keyElement);
  });
}
//iterate and use this as key
function eachCatagory(key) {
  let objArr = MasterDatabaseMacdonals[key]; // one full catagory array
  // create box with partion ==>row =>menu
  // data through array stored in objArr
  rowCreate(objArr, "virtualMenu"); // objArr=> total array in bevarage...
  rowCreate2(objArr, "quickPop");
}
//box create
function rowCreate(objArr, appendKey) {
  let rowDiv = document.createElement("div");
  rowDiv.setAttribute("class", "rowDisplayDiv");

  objArr.forEach(function (obj) {
    boxElementTop(rowDiv, obj);
    // rowDiv.append(elem)
  });
  document.getElementById(appendKey).append(rowDiv);
}

function boxElementTop(rowDiv, { productImage, productName, productPrice }) {
  let box = document.createElement("div");
  box.setAttribute("class", "boxProductDisplay");

  let imageBox = document.createElement("div");
  imageBox.setAttribute("class", "imageBoxMenu");
  let image = document.createElement("img");
  image.src = productImage;
  imageBox.append(image);

  let info = document.createElement("div");
  info.setAttribute("class", "menuDisplayInfo");
  let nameSpan = document.createElement("span");
  nameSpan.innerText = productName;
  let priceSpan = document.createElement("span");
  priceSpan.setAttribute("class", "priceSpanViewProduct");
  priceSpan.innerText = `$${productPrice}`;
  info.append(nameSpan, priceSpan);

  box.append(imageBox, info);
  //   console.log(productName)
  rowDiv.append(box);
}

//  counter

//  cart

// quickButton

//box create
function rowCreate2(objArr, appendKey) {
  let rowDiv = document.createElement("div");
  rowDiv.setAttribute("class", "rowDisplayDiv");
  objArr.forEach(function (obj) {
    quickButtonMenu(rowDiv, obj);
    // rowDiv.append(elem)
  });
  document.getElementById(appendKey).append(rowDiv);
}
function quickButtonMenu(
  rowDiv,
  { productImage, productName, productId, productPrice }
) {
  let box = document.createElement("div");
  box.setAttribute("class", "boxProductDisplay");

  let imageBox = document.createElement("div");
  imageBox.setAttribute("class", "imageBoxMenu");
  let inputCheck = document.createElement("input");
  inputCheck.type = "checkbox";
  // inputCheck.checked = false;

  inputCheck.setAttribute("class", "inputCheck");
  // addeventListner

  let image = document.createElement("img");
  image.src = productImage;
  imageBox.append(inputCheck, image);

  let info = document.createElement("div");
  info.setAttribute("class", "menuDisplayInfo");
  let nameSpan = document.createElement("span");
  nameSpan.innerText = productName;
  let priceSpan = document.createElement("span");
  priceSpan.innerText = `$${productPrice}`;
  priceSpan.setAttribute("class", "priceSpanViewProduct");

  info.append(nameSpan, priceSpan);

  box.append(imageBox, info);
  //   console.log(productName)
  rowDiv.append(box);

  box.addEventListener("click", function () {
    // console.log(productName, productImage, productPrice, productId);
    addToCart(productName, productImage, productPrice, productId);
    // inputCheck.checked = true;
  });
}

// cart view
let cartWindow = document.getElementById("cartView");

let orderprocess = []; //store all the data one by one for a customer
// add to cart will continue push data in the array
function addToCart(productName, productImage, productPrice, productId) {
  let order = { productName, productImage, productPrice, productId };
  orderprocess.push(order);
  // show data to cart here
  showToCart(order);
  // productid willbe use for quantity purpose in future
}

// order checkout view row creation ================================
// order checkout view row creation ================================
function showToCart(obj) {
  let boxRow = document.createElement("div");
  boxRow.setAttribute("class", "cartRowView");

  let image = document.createElement("img");
  image.src = obj.productImage;

  let productName = document.createElement("span");
  productName.innerText = obj.productName;

  let productPrice = document.createElement("span");
  productPrice.innerText = obj.productPrice;

  boxRow.append(image, productName, productPrice);
  cartWindow.append(boxRow);
}

// order place for one customer;
let orderPlace = document.getElementById("orderAdd"); // order place button
orderPlace.style.cursor = "pointer";
orderPlace.addEventListener("click", function () {
  // order wont happen if selection is null
  if (orderprocess.length > 0) {
    orderPlaceToProceed(orderprocess); // wrapping the order for one customer
    // clear orderprocess storage arr=[]
    orderprocess = [];
    // clear the selected options=> unchecked
    // checked option unchecked ==================================
    // document.querySelectorAll(".inputCheck").forEach(function (a) {
    //   // console.log((a.checked = false));
    // });
  }
});

//to display

let counter = document.getElementById("counterViewAppend"); // inset horizontal aray here with accept button
let statusvieworder = document.getElementById("statusAppend");
let orderNoAppend = document.getElementById("orderNoAppend");

let counterDisplayArray = []; // this array will display

/// order processing ========================================>
// setTimeout one by one========================================>
function orderPlaceToProceed(arr) {
  // [{}{}{}{}]
  pushOrderOnebyOne(arr); // set Time out
}

function pushOrderOnebyOne(arr) {
  counterDisplayArray.push(arr);
  // console.log(counterDisplayArray);
  // counterDisplayArray => [[{},{}],[{}]]

  let counterNo = counterDisplayArray.length;
  // horizonntal main box
  // counter no
  let counterNobox = document.createElement("div");
  let counterNoSpan = document.createElement("span");
  counterNoSpan.innerText = counterNo;
  counterNobox.append(counterNoSpan);
  orderNoAppend.append(counterNobox);

  // image box
  let couterRow = document.createElement("div");
  couterRow.setAttribute("class", "counterRow");

  // innner image box
  let imageQueue = document.createElement("div");
  imageQueue.setAttribute("class", "imageQueue");

  couterRow.append(imageQueue);

  counter.append(couterRow);
  // push the data to local storage now
  // msg display on checkout window
  thanksForOrderMsg(counterNo);

  // order status msg
  let msg = document.createElement("span");
  msg.innerText = "Processing";
  msg.setAttribute("class", "pending");
  statusvieworder.append(msg);

  // orderStatus("Processing"); // processing msgs

  setTimeout(function () {
    cartWindow.innerHTML = "";
  }, 5000);

  // create an array || box div
  let max = -Infinity;
  arr.forEach(function (elem, index) {
    // elem => productImage, productName, productId, productPrice
    let timeToPreparegET = timeToPrepare();
    if (max < timeToPreparegET) {
      max = timeToPreparegET;
    }
    // console.log(timeToPreparegET);

    setTimeout(function () {
      pushDataTocounter(imageQueue, elem);
    }, timeToPreparegET);
    // order ready msg puch after last order process
    if (index == arr.length - 1) {
      setTimeout(function () {
        msg.innerText = "Order Ready";
        msg.removeAttribute("class");
        msg.setAttribute("class", "ready");
      }, max);
    }
  });
}

// thanks for ordering, your order ID=
function thanksForOrderMsg(counterNo) {
  let msg = `Thanks for ordering`;
  let counterMsg = `Your order no ${counterNo}`;
  cartWindow.innerHTML = "";
  let msgInfoThanks = document.createElement("div");
  msgInfoThanks.setAttribute("id", "msgInfoThanks");
  let msg1 = document.createElement("span");
  let msg2 = document.createElement("span");
  msg1.innerText = msg;
  msg2.innerText = counterMsg;
  msgInfoThanks.append(msg1, msg2);
  cartWindow.append(msgInfoThanks);
}

function pushDataTocounter(div, obj) {
  let image = document.createElement("img");
  image.src = obj.productImage;
  div.append(image);
}

// random time // no recheck need here
function timeToPrepare() {
  let tm = Math.ceil(Math.random() * 5);
  return tm * 1000;
}
