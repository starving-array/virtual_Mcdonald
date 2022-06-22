// [
//   {
//     key: { productName: value, productImage: "value", id: assign, price: val },
//   },
//   {
//     key: { productName: value, productImage: "value", id: assign, price: val },
//   },
// ];

// database
let MasterDatabaseMacdonals =
  JSON.parse(localStorage.getItem("masterDatabaseMacdonals")) || {};

//key
let masterDatabaseMacdonalsKey =
  JSON.parse(localStorage.getItem("masterDatabaseKey")) || [];

class Product {
  constructor(productName, productImage, productId, productPrice) {
    this.productName = productName;
    this.productImage = productImage;
    this.productId = productId;
    this.productPrice = productPrice;
  }
}

function getId() {
  let id = new Date();
  id = id.getTime() + 1;
  return id;
}

function getPrice(val) {
  let price = Math.ceil(Math.random() * val);
  return price;
}

// structure
// array>obj.key>obj.key>array>objects==================>
// Masterobj>obj.key>array>objects==================>
function addDataToDatabase(data1, data2, keyName) {
  let value = [];
  data1.forEach(function (elem, index) {
    // product details
    let productName = data1[index];
    let productImage = data2[index];
    let id = getId();
    let price = getPrice(10);

    let product = new Product(productName, productImage, id, price);

    value.push(product);
  });
  // let obj = {};
  // obj[keyName] = value;
  // MasterDatabaseMacdonals.push(obj);
  MasterDatabaseMacdonals[keyName] = value;
  // key push
  masterDatabaseMacdonalsKey.push(keyName);
  localStorage.setItem(
    "masterDatabaseKey",
    JSON.stringify(masterDatabaseMacdonalsKey)
  );
  // data pushing in local store
  localStorage.setItem(
    "masterDatabaseMacdonals",
    JSON.stringify(MasterDatabaseMacdonals)
  );
  // console.log(MasterDatabaseMacdonals);
}

// date will be add with timeOut
function pushDataToLocal(delay) {
  setTimeout(function () {
    // push data to bevarages
    addDataToDatabase(bevarage, bevarageImg, "bevarages");
    // breakFast
    addDataToDatabase(breakFast, breakFastImg, "breakFast");
    // burgerlist
    addDataToDatabase(burger, burgerImg, "burgerlist");
    // chickensandwich
    addDataToDatabase(ChickenSandwich, ChickenSandwichImg, "chickensandwich");
    // combomeal
    addDataToDatabase(comboMeal, comboMealImg, "combomeal");
    // dessert
    addDataToDatabase(desert, desertImg, "dessert");
    // happymeal
    addDataToDatabase(happyMeal, happyMealImg, "happymeal");
    // drinkslist
    addDataToDatabase(drinks, drinksImg, "drinkslist");
    // bakerylist
    addDataToDatabase(bakery, bakeryImg, "bakerylist");
    //frieslist
    addDataToDatabase(fries, friesImg, "frieslist");
    //dollermenu
    addDataToDatabase(dollerMenu, dollerMenuImg, "dollermenu");

    window.location.reload();
  }, delay);
}
if (Object.keys(MasterDatabaseMacdonals).length == 0) {
  pushDataToLocal(1000); // data pushed in localstore with backend
}
