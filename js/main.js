var listTasks = []

function main() {
  alert("Cuadro de diálogo")
}

var taskID = 0


var checkDraggable = false
function showTaskCreator(){

  var divElement = document.getElementById("generarTasca");
  if (divElement.style.display === "none") {
    divElement.style.display = "block";
    console.log("showing");
  } else {
    divElement.style.display = "none";
    console.log("hiding");
  }
  var contenedorDraggable = document.getElementsByClassName("contenedor")



  if (!checkDraggable) {
    for (let i = 0; i < contenedorDraggable.length; i++) {
      contenedorDraggable[i].draggable = true
    }

    checkDraggable = true
  }

  else{
    for (let i = 0; i < contenedorDraggable.length; i++) {
      contenedorDraggable[i].draggable = false
    }
    checkDraggable = false
  }

}

function setTodayValue(){
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, '0');
  var mm = String(today.getMonth() + 1).padStart(2, '0');
  var yyyy = today.getFullYear();
  today = yyyy + '-' + mm + '-' + dd;
  document.getElementById("tareaDate").value = today;
}

function addTask(){
  date = document.getElementById("tareaDate") + document.getElementById("tareaTime")

  var navToAppend = document.getElementsByTagName("nav")[1];
  taskID++;

  var divPrincipal = document.createElement("div");
  divPrincipal.className = "contenedor";
  divPrincipal.id = "tasca" + taskID;
  divPrincipal.setAttribute("draggable", false)

  var div1 = document.createElement("div");
  div1.className = "items";

  var askTask = document.getElementById(divPrincipal)

  var input1 = document.createElement("input")
  input1.className = "vertical-center"
  input1.type = "image"
  input1.src = "./img/botones/sincheck.png"
  input1.name = "sincheck"
  input1.alt = "Marcar como completado"
  input1.height = "45"
  input1.width = "45"
  input1.setAttribute("onclick","toCheck(this.parentElement.parentElement.id, this)")
  div1.appendChild(input1)
  divPrincipal.appendChild(div1)

  var div2 = document.createElement("div")
  div2.className = "items"

  var p1 = document.createElement("p")
  p1.className = "textitem"
  p1.textContent = document.getElementById("tareaNombre").value

  var h11 = document.createElement("h1")
  h11.className = "textitem"
  h11.textContent = document.getElementById("tareaDate").value + " a las " + document.getElementById("tareaTime").value

  div2.appendChild(p1)
  div2.appendChild(h11)
  divPrincipal.appendChild(div2)

  addNewTaskToList(divPrincipal)
  navToAppend.appendChild(divPrincipal);
}

function addNewTaskToList(divHtmlElement) {
  listTasks.push(divHtmlElement)
  addListenersToHtmlElement(divHtmlElement)
}

function addListenersToHtmlElement(divHtmlElement) {
  divHtmlElement.addEventListener("dragstart", (ev) => {
    console.log("dragStart: " + ev.target.id);
    ev.dataTransfer.setData("text/plain", ev.target.id)
  });
  divHtmlElement.addEventListener("dragover", (ev) => {
    ev.preventDefault();
    console.log("dragOver: " + ev.target.id);
  });
  divHtmlElement.addEventListener("drop", (ev) => {
    ev.preventDefault();
    console.log("evento: " + ev) //es el tipo de evento que se realizó, ejemplo:  drag event
    console.log("elemento que recibo otro: " + divHtmlElement.id) //ejemplo: tasca2
    const data = ev.dataTransfer.getData("text");
    const source = document.getElementById(data);
    //alert("Dropped")
    //console.log("data: " + data) //ejemplo: tasca1
    //console.log(source) //elemento html que se quiere trasladar. ejemplo: el div con id tasca1
    orderList(data, divHtmlElement.id) //limpiar el nav, y ordenarlo con nuevo orden
  });
}

function orderList(idTransfer, idReceiver) {
  let indexWherePut;
  let indexToChange;
  let elementToChange;
  for (let i = 0; i < listTasks.length; i++) {
    if (listTasks[i].id == idReceiver) indexWherePut = i
    if (listTasks[i].id == idTransfer) {
      indexToChange = i
      elementToChange = listTasks[i]
    }
  }
  //quitar el elementToChange de la listTasks
  listTasks.splice(indexToChange,1)
  //agregar el elemento en el indexWherePut
  listTasks.splice(indexWherePut,0,elementToChange)
  renderList()
}

function renderList() {
  //TODO ver de tener el navToAppend en todo el programa
  var navToAppend = document.getElementsByTagName("nav")[1];
  //TODO mejorar el borrado de los hijos
  while (navToAppend.firstChild){
    navToAppend.removeChild(navToAppend.firstChild);
  };
  for (let i = 0; i < listTasks.length; i++){
    navToAppend.appendChild(listTasks[i])
  }
}

function toCheck(id, imageElement){
      var taskID = document.getElementById(id)
      var inputText1 = taskID.getElementsByClassName("textitem")[0].innerHTML;
      var inputText2 = taskID.getElementsByClassName("textitem")[1].innerHTML;
      console.log(inputText1)
      console.log(inputText2)

      if(imageElement.name == "sincheck"){
        imageElement.src = "../Web/img/botones/completado.png";
        imageElement.name = "check"
      }
      else{
        imageElement.src = "../Web/img/botones/sincheck.png"
        imageElement.name = "sincheck"
      }

}
