//Initial vars
var ec_quantity = 0;
var Createbutton = document.getElementById("enter");
var ul = document.getElementById("list-group");
var ECUATION = "NULL";
var EcuationInput = document.getElementById("EcInput")
var ECUATION_LIST = [];
var registerField = document.getElementById("registerEmail")
const loggedOutLinks = document.querySelectorAll('.logged-out');
const loggedInLinks = document.querySelectorAll('.logged-in');
var CURRENT_USER = null

//Listen auth state changes
auth.onAuthStateChanged(user => {
  if (user) {
    CURRENT_USER = user.email
    getEcuations(user.email)
    loggedInLinks.forEach(item => item.style.display = 'block');
    loggedOutLinks.forEach(item => item.style.display = 'none');
  } else {
    CURRENT_USER=null
    loggedInLinks.forEach(item => item.style.display = 'none');
    loggedOutLinks.forEach(item => item.style.display = 'block');
    ECUATION_LIST=[];
    var list_elements = document.getElementsByClassName("ecuation-item");
    
    for (let index = 0; index <= list_elements.length;) {
      const element = list_elements[index];
      element.parentNode.removeChild(element);
      
    }
    console.log('user logged out');
  }
})

function getEcuations(user) {
  var ecuationsRef = db.collection("ecuations");
  var ecuations = ecuationsRef.where("user", "==", user);
  ecuations.get().then(snapshot => {
    snapshot.docs.forEach(doc => {
      addEcuation(doc.data().ecuation);
    });
  });
}



//Create
Createbutton.addEventListener("click", function () {
  var valid = validateEcuation();
  if (valid == true) {
    addEcuation()
  } else {
    alert("Por favor ingrese una función válida")
  }

})

//add Ecuations
function addEcuation(ec = null) {
    if (ec) {
      var newEcuation = ec
    }else{
      var newEcuation = ECUATION
    }
    if (CURRENT_USER != null && ec == null) {
      db.collection('ecuations').add({
        user: CURRENT_USER,
        ecuation: newEcuation
      })
    }
    ec_quantity += 1;
    var ecu = newEcuation
    var index = ec_quantity
    var a = document.createElement("a");
    ECUATION_LIST.push(newEcuation);
    a.className = "list-group-item clearfix ecuation-item";
    a.id = `ecuation_${ec_quantity}`
    a.appendChild(document.createTextNode(`${newEcuation}`));
    var rightArea = document.createElement("span");
    rightArea.className = "pull-right";
    var buttonArea = document.createElement("span");
    buttonArea.className = "btn btn-xs btn-default";
    var deleteButton = document.createElement("button");
    deleteButton.className = "btn-danger";
    deleteButton.appendChild(document.createTextNode("X"));
    deleteButton.onclick = function () {
      var ecuation_id = document.getElementById(`ecuation_${index}`)
      ecuation_id.parentNode.removeChild(ecuation_id)
    }
    var viewButton = document.createElement("button");
    viewButton.className = "btn-primary view-button";
    viewButton.appendChild(document.createTextNode("Ver"))
    viewButton.onclick = function () {
      plot(ecu)
    }
    buttonArea.appendChild(viewButton);
    buttonArea.appendChild(deleteButton);
    rightArea.appendChild(buttonArea);
    a.appendChild(rightArea);
    ul.appendChild(a);
    plot(newEcuation);

}
//Plotting
EcuationInput.addEventListener("input", updateName)

function updateName() {
  ECUATION = document.getElementById("EcInput").value;
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
  yAxis: { domain: [-1, 1] },
  xAxis: { domain: [0, 2 * Math.PI] }
};

function plot(ec = null) {
  // console.log("Ploteando ", ec);
  if (ec != null) {
    var f = ec
  } else {
    var f = ECUATION
  }

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

