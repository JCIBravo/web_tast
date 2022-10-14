var listTasks = []

function main() {
  alert("Cuadro de diálogo")
}

var taskID = 0

function showTaskCreator(){
  var divElement = document.getElementById("generarTasca");
  if (divElement.style.display === "none") {
    divElement.style.display = "block";
    console.log("showing");
  } else {
    divElement.style.display = "none";
    console.log("hiding");
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

function allowDrop(ev) {
  ev.preventDefault();
}

/*function drag(ev) {
  ev.dataTransfer.setData("text/plain", ev.target.id);
}*/

function drop(ev) {
  ev.preventDefault();
  var data = ev.dataTransfer.getData("text");
  ev.target.appendChild(document.getElementById(data));
}



function addTask(){
  date = document.getElementById("tareaDate") + document.getElementById("tareaTime")

  var navToAppend = document.getElementsByTagName("nav")[1];
  taskID++;

  var divPrincipal = document.createElement("div");
  divPrincipal.className = "contenedor";
  divPrincipal.id = "tasca" + taskID;
  divPrincipal.setAttribute("draggable", true)
  divPrincipal.addEventListener("dragstart", (ev) =>
    ev.dataTransfer.setData("text/plain", ev.target.id)
  );
  divPrincipal.addEventListener("dragover", (ev) => {
    //console.log("dragOver");
    ev.preventDefault();
  });
  divPrincipal.addEventListener("drop", (ev) => {
    //console.log("dragOver");
    ev.preventDefault();
    const data = ev.dataTransfer.getData("text");
    const source = document.getElementById(data);
    //TODO agregar la acción que quiero hacer cuando suelte
    alert("Dropped")
  });
  navToAppend.appendChild(divPrincipal);

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

  listTasks += divPrincipal


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
