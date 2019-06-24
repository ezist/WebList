var list = document.getElementById("list");
function clearItems() {
  "use strict";
  var r = confirm("Clear list?");
  if(r == true) {
    localStorage.clear();
    // console.log("cleared list");
    loadItems();
  }
}
function deleteItem(key) {
  "use strict";
  localStorage.removeItem(key);
  // console.log("removed item " + key);
  loadItems();
}
function loadItems() {
  "use strict";
  list.innerHTML = "";
  const items = {...localStorage};
  Object.keys(items).forEach(key => {
    if(key.startsWith("mtndew:")) {
      var filteredKey = key.replace("mtndew:", ""); // in the words of Tom Scott, this filter should "never ever, ever, ever, EVER be turned off"
      filteredKey = filteredKey.replace(/</gi, "&lt;");
      filteredKey = filteredKey.replace(/>/gi, "&gt;");
      var item = items[key];
      var filteredItem = item.replace(/</gi, "&lt;");
      item = item.replace(/>/gi, "&gt;");
      list.innerHTML += "<li>" + filteredKey + " - <b>" + filteredItem + "</b> - <button type=\"button\" onclick=\"deleteItem(\'" + key.replace(/\"/gi, "&quot;") + "\')\">Remove</button></li>";
      // console.log("loaded item " + key);
    }
  });
  // console.log("loaded all items");
  itemAmount();
}
function addItem() {
  "use strict";
  if (typeof(Storage) !== "undefined") {
    var stateInput = document.getElementById("stateInput").value;
    var codeInput = document.getElementById("codeInput").value;
    localStorage.setItem("mtndew:" + codeInput, stateInput);
    stateInput = "";
    codeInput = "";
    // console.log("added item " + stateInput.value);
    loadItems();
  } else {
    document.getElementById("list").innerHTML = "Sorry, your browser does not support Web Storage.";
  }
}
function itemAmount() {
  "use strict";
  var amount = 0;
  const items = {...localStorage};
  Object.keys(items).forEach(key => {
    if(key.startsWith("mtndew:")) {
      amount += 1;
    }
  });
  document.getElementById("amount").innerHTML = "Amount: " + amount;
  // console.log("got amount of items, " + amount);
}
function clearForm() {
  "use strict";
  document.getElementById("stateInput").value = "";
  document.getElementById("codeInput").value = "";
}