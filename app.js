var ec_quantity = 0;


var button = document.getElementById("enter");
var ul = document.getElementById("list-group");

button.addEventListener("click", function () {
  ec_quantity += 1;
  var a = document.createElement("a");
  a.className = "list-group-item clearfix";
  a.onclick = function () {
    alert(`Hola en ${ec_quantity}`)
  }
  a.appendChild(document.createTextNode(`Ecuación ${ec_quantity}`));
  var rightArea = document.createElement("span");
  rightArea.className = "pull-right";
  var buttonArea = document.createElement("span");
  buttonArea.className = "btn btn-xs btn-default";
  buttonArea.onclick = function () {
    alert(`Eliminando a ${ec_quantity}`)
  }
  var deleteButton = document.createElement("button");
  deleteButton.className = "btn-danger";
  deleteButton.appendChild(document.createTextNode("X"))
  buttonArea.appendChild(deleteButton);
  rightArea.appendChild(buttonArea);
  a.appendChild(rightArea);
  ul.appendChild(a);
})