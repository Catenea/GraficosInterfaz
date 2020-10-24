
var ec_quantity = 0;
var Createbutton = document.getElementById("enter");
var ul = document.getElementById("list-group");
var ECUATION = "NULL";
var EcuationInput = document.getElementById("EcInput")
var ECUATION_LIST = [];

Createbutton.addEventListener("click", function () {
  var valid = validateEcuation();
  if (valid == true) {
    ec_quantity += 1;
  var a = document.createElement("a");
  a.className = "list-group-item clearfix ecuation-item";
  a.appendChild(document.createTextNode(`${ECUATION}`));
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
  plot();
  }else{
    alert("Por favor ingrese una función válida")
  }
  
})

EcuationInput.addEventListener("input", updateName)
 
function updateName() {
  ECUATION = document.getElementById("EcInput").value;
  // console.log(math.eval(ECUATION));
  var code = math.compile(ECUATION)
  console.log(code.eval());
}

function validateEcuation() {
  try {
    plot()
    return true;
  } catch (error) {
    console.log("nope");
    return false;
  }
  
}

var parameters = {
  target: '#myFunction',
  data: [{
    fn: 'sin(x)', 
    color: 'red'
 }],
  grid: true,
  yAxis: {domain: [-1, 1]},
  xAxis: {domain: [0, 2*Math.PI]}
};

function plot() {
  console.log(ECUATION);
  var f = ECUATION
  var xMin = -5
  var xMax = 5
  var yMin = -5
  var yMax = 5
  var color = document.getElementById("color").value;
  
  parameters.data[0].fn = f;
  parameters.xAxis.domain = [xMin, xMax];
  parameters.yAxis.domain = [yMin, yMax];
  parameters.data[0].color = color;
  
  functionPlot(parameters);
}

