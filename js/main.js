
class Task {
  constructor(taskID, taskName, taskDate, taskTime) {
    this.taskID = taskID;
    this.taskName = taskName;
    this.taskDate = taskDate;
    this.taskTime = taskTime;
  }
}

const URL_LIST = "http://0.0.0.0:8080/todolists/list-own-tasks/"
const URL_DELETE = "http://0.0.0.0:8080/todolists/delete-task/"
const URL_UPDATE = "http://0.0.0.0:8080/todolists/update-task/"
const URL_ADD = "http://0.0.0.0:8080/todolists/add-task"
const URL_DELETE_LIST = "http://0.0.0.0:8080/todolists/delete-list/"
const URL_ADD_LIST = "http://0.0.0.0:8080/todolists/add-list"
const URL_GET_LISTS = "http://0.0.0.0:8080/todolists/all-lists"
const URL_UPDATE_LIST = "http://0.0.0.0:8080/todolists/update-list/"
const URL_ONE_LIST = "http://0.0.0.0:8080/todolists/list/"

var listOfListTasksWithClass = []

var listOfListTasks = [[]]
var listTasks = listOfListTasks[0]
var thisListOfTasks = 0

function addList(isImported, name, id){

  var idList;
  if (!isImported){
    idList = null
  }
  else {
    idList = id
  }

  addOptionInSpinner(idList,name)

  var list = []
  if(idList!==1){
    listOfListTasks.push(list)
  }

  if (!isImported) {
    addListToKtor(name)
  }
}

function addOptionInSpinner(idList,nameList){
  var optionElement = document.createElement("option")
  optionElement.id = nameList
  optionElement.value = idList
  optionElement.textContent = nameList
  var spinner = document.getElementById("seleccionarLista")
  spinner.appendChild(optionElement)
}

function selectOptionSpinner(optionSpinner, nameOption){
  console.log(nameOption)
  listTasks = listOfListTasks[optionSpinner]
  var removeTasks = document.getElementsByClassName("contenedor")

  for (let i = removeTasks.length; i>0; i--){
    removeTasks[i-1].remove()
  }
  thisListOfTasks = optionSpinner
  getKtorData(optionSpinner)
  //console.log(removeTasks)
}

function deleteList(){
  deleteListToKtor(thisListOfTasks, function (){
    let selectObject = document.getElementById("seleccionarLista");
    let options = document.getElementsByTagName('option')
    for (var i = options.length-1; i>=0; i--) {
      options[i].remove()
    }

    getKtorDataLists()
  })
}

var editListVar = true
function editList(){
  if (editListVar){
    let editLabel = document.getElementById("editlabel")
    editLabel.innerText = " || Editar Nombre:"
    let selectObject = document.getElementById("seleccionarLista");
    getKtorOneList(thisListOfTasks)

    editListVar = false
  }
  else{
    let editLabel = document.getElementById("editlabel")
    editLabel.innerHTML = "<b>Nueva lista ---></b> || Nombre:"
    document.getElementById("nameList").value = null
    editListVar = true
  }
}


var taskID
// fetch(URL_LASTID).then(async (result) => taskID = parseInt(await result.json())).catch(function(){taskID = 0});

var checkDraggable = false
function showTaskCreator(){
  var divElement = document.getElementById("generarTasca");
  if (divElement.style.display === "none") {
    divElement.style.display = "block";
    // console.log("showing");
  } else {
    divElement.style.display = "none";
    // console.log("hiding");
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

function putList(fromJson) {
  if (!fromJson){
    addList(false, document.getElementById("nameList").value, null)
    document.getElementById("nameList").value = null
  }
}

function putTask(fromJson) {
  if (!fromJson) {
    addTask(null, document.getElementById("tareaNombre").value, document.getElementById("tareaDate").value, document.getElementById("tareaTime").value, false, thisListOfTasks)
  }
}

function addTask(id, name, date, time, isImported, idList){
  // console.log("Nombre:" + document.getElementById("tareaNombre").value)
  // console.log("Fecha:" + document.getElementById("tareaDate").value)
  // console.log("Hora:" + document.getElementById("tareaTime").value)

  if (name === ""){
    alert("Error añadiendo tarea.\n\nVerifique que la tarea tenga un nombre, una fecha válida y una hora puesta.")
    return null
  }

  var navToAppend = document.getElementsByTagName("nav")[1];
  var finalId;

  if (!isImported) {
    taskID++;
    finalId = taskID
  } else {
    finalId = id
  }

  var divPrincipal = document.createElement("div");
  divPrincipal.className = "contenedor";
  divPrincipal.id = `${finalId}`;
  divPrincipal.setAttribute("draggable", false)

  var div1 = document.createElement("div");
  div1.className = "items";
  var input1 = document.createElement("input")
  input1.className = "vertical-center"
  input1.type = "image"
  input1.src = "./img/botones/sincheck.png"
  input1.name = "sincheck"
  input1.alt = "Marcar como completado"
  input1.height = "45"
  input1.width = "45"
  input1.setAttribute("onclick", "toCheck(this.parentElement.parentElement.id, this, null)")
  div1.appendChild(input1)
  divPrincipal.appendChild(div1)

  var div2 = document.createElement("div")
  div2.className = "items"
  div2.id = idList

  var h1 = document.createElement("h1")
  h1.className = "textitem"
  h1.textContent = name

  var p1 = document.createElement("p")
  p1.className = "textitem"
  p1.style.display = "block"
  if (!isImported) {
    if (date !== "" && time !== "") {
      p1.textContent = parseDate(date) + " a las " + time + "h"
    } else if (date === "" && time === "") {
      p1.textContent = "Lo más pronto posible"
    } else if (time === "") {
      p1.textContent = "Antes del " + parseDate(date).toLowerCase()
    } else if (date === "") {
      p1.textContent = "A las " + time + "h"
    }
  } else p1.textContent = date

  var p2 = document.createElement("p")
  p2.className = "textitem"
  p2.style.display = "none"
  p2.textContent = "Tarea completada"

  var inputEliminar = div2.appendChild(document.createElement("input"))
  inputEliminar.className = "eliminar"
  inputEliminar.type = "image"
  inputEliminar.src = "./img/botones/eliminar.png"
  inputEliminar.height = "45"
  inputEliminar.width = "45"
  inputEliminar.setAttribute("onclick", "remove(this.parentElement.parentElement)")

  var inputEditar = div2.appendChild(document.createElement("input"))
  inputEditar.className = "editar"
  inputEditar.type = "image"
  inputEditar.src = "./img/botones/editar.png"
  inputEditar.height = "45"
  inputEditar.width = "45"
  inputEditar.setAttribute("onclick", "editar(this.parentElement,this.parentElement.parentElement)")


  div2.appendChild(h1)
  div2.appendChild(p1)
  div2.appendChild(p2)
  divPrincipal.appendChild(div2)


  document.getElementById("tareaNombre").value = null
  document.getElementById("tareaDate").value = null
  document.getElementById("tareaTime").value = null

  addNewTaskToList(divPrincipal)
  navToAppend.appendChild(divPrincipal)

//(val id: String, var title: String, var date: String, var hour: String, var checked: Boolean)
  if (!isImported){
    addTaskToKtor(`${finalId}`, h1.textContent, p1.textContent, false, div2.id)
  }
}

function addNewTaskToList(divHtmlElement) {
  listTasks.push(divHtmlElement)
  addListenersToHtmlElement(divHtmlElement)
}

function addListenersToHtmlElement(divHtmlElement) {
  divHtmlElement.addEventListener("dragstart", (ev) => {
    // console.log("dragStart: " + ev.target.id);
    ev.dataTransfer.setData("text/plain", ev.target.id)
  });
  divHtmlElement.addEventListener("dragover", (ev) => {
    ev.preventDefault();
    // console.log("dragOver: " + ev.target.id);
  });
  divHtmlElement.addEventListener("drop", (ev) => {
    ev.preventDefault();
    // console.log("evento: " + ev) //es el tipo de evento que se realizó, ejemplo:  drag event
    // console.log("elemento que recibo otro: " + divHtmlElement.id) //ejemplo: tasca2
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
    if (listTasks[i].id === idReceiver) indexWherePut = i
    if (listTasks[i].id === idTransfer) {
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
  }

  for (let i = 0; i < listTasks.length; i++){
    navToAppend.appendChild(listTasks[i])
  }
}

function toCheck(id, imageElement, check){
      var taskID = document.getElementById(id)
      var nomTasca = taskID.getElementsByClassName("textitem")[0].innerHTML;
      var dataTasca = taskID.getElementsByClassName("textitem")[1].innerHTML;

      if (imageElement != null || check == null) {
        if (imageElement.name === "sincheck") {
          imageElement.src = "../Web/img/botones/completado.png";
          imageElement.name = "check"
          taskID.getElementsByClassName("textitem")[1].style.display = "none"
          taskID.getElementsByClassName("textitem")[2].style.display = "block"

          updateTaskToKtor(id, nomTasca, dataTasca, true,thisListOfTasks)
        } else {
          imageElement.src = "../Web/img/botones/sincheck.png"
          imageElement.name = "sincheck"
          taskID.getElementsByClassName("textitem")[1].style.display = "block"
          taskID.getElementsByClassName("textitem")[2].style.display = "none"
          updateTaskToKtor(id, nomTasca, dataTasca, false,thisListOfTasks)
        }
      } else {
        if (check === true){
          taskID.getElementsByTagName("input")[0].src = "../Web/img/botones/completado.png"
          taskID.getElementsByTagName("input")[0].name = "check"
          taskID.getElementsByClassName("textitem")[1].style.display = "none"
          taskID.getElementsByClassName("textitem")[2].style.display = "block"
        } else {
          taskID.getElementsByTagName("input")[0].src = "../Web/img/botones/sincheck.png"
          taskID.getElementsByTagName("input")[0].name = "sincheck"
          taskID.getElementsByClassName("textitem")[1].style.display = "block"
          taskID.getElementsByClassName("textitem")[2].style.display = "none"
        }
      }
}


function remove(element){
  for (let i = 0; i < listTasks.length; i++){
    if (listTasks[i].id === element.id){
      listTasks.splice(i,1)
    }
  }
  element.remove()
  deleteTaskToKtor(element.id)
}

function parseDate(date){
    if (date === "") return ""
    else {
      var fecha = date.split("-")
      var dia = fecha[2]
      var mes = fecha[1]
      var año = fecha[0]
      return "Día " + dia + "/" + mes + "/" + año
  }
}

var edit = true

function editar(item, contenedor){
  var items1 = contenedor.getElementsByClassName("items")[0]
  var itscheck = items1.getElementsByTagName("input")[0]

  if (itscheck.name === "sincheck"){
    var input = ""

    var it = 0
    for (const element of item.getElementsByClassName("textitem")){

      it++
    }

    if (edit){
      input = item.getElementsByClassName("textitem")[0].textContent
      item.getElementsByClassName("textitem")[0].innerHTML = "<input id='editarNom' value='"+input+"'>"
      edit = false
    } else {
      input = "<h1 class=\"textitem\">" + document.getElementById('editarNom').value + "</h1>"
      h1Text = document.getElementById('editarNom').value
      item.getElementsByClassName("textitem")[0].outerHTML = input
      edit = true
    }
  }

  if(itscheck.name === "sincheck"){
    console.log(h1Text)
   updateTaskToKtor(contenedor.id, h1Text, item.getElementsByClassName("textitem")[1].innerHTML, false, thisListOfTasks)
  }
}


function getKtorData(idList) {
  fetch(URL_LIST+idList, {
    method: "GET"
  }).then(function(response) {
    response.json().then(json => {
      for (let i = 0; i < json.length; i++) {

        addTask(json[i].id, json[i].title, json[i].date, null, true, json[i].idList)
        toCheck(json[i].id, null, json[i].checked)

      }
    });
  }).catch(function(err) {
    console.log("CUIDAO' ERRRMANOOOOO: No se ha podido conectar con el servidor!\n\nDetalles: " + err)
    const aviso = document.getElementById("avisoGuardado")
    aviso.style.backgroundColor = "#FF0000"
    aviso.style.fontSize = "34px"
    aviso.style.color = "#FFFFFF"
    aviso.innerText = "ALERTA: ¡No se ha podido conectar con el servidor!\nVerifique la conexión y recargue la página."

    var form = document.getElementById("formulariTasques");
    var elements = form.elements;
    for (var i = 0, len = elements.length; i < len; ++i) {
      //(true) desactiva el formulario cuando no esta conectado al ktor
      elements[i].disabled = false;
    }
  });
}

function getKtorDataLists() {
  fetch(URL_GET_LISTS, {
    method: "GET"
  }).then(function(response) {
    response.json().then(json => {
      //console.log(json)
      for (let i = 0; i < json.length; i++) {
        addList(true, json[i].name, json[i].id)
      }
    });
  }).catch(function(err) {
    console.log("error")
  });
}

function getKtorOneList(id) {
  fetch(URL_ONE_LIST+id, {
    method: "GET"
  }).then(function(response) {
    response.json().then(json => {
      //console.log(json)
      document.getElementById("nameList").value = json[0].name
    });
  }).catch(function(err) {
    console.log("error")
  });
}


function addListToKtor(name) {
  fetch(URL_ADD_LIST,
    {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: name
      })
    })
    .then(response => console.log(response))
    .then(err => console.log(err))
}

function addTaskToKtor(id, title, date, checked, listId) {
  // console.log(id,title,date,checked)
  fetch(URL_ADD,
    {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        // id: id,
        title: title,
        date: date,
        checked: checked,
        idList: listId
      })
    })
    .then(response => console.log(response))
    .then(err => console.log(err))
}

function deleteTaskToKtor(id) {
  fetch(URL_DELETE+id,
    {
      method: "DELETE",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id: id
      })
    })
    .then(response => console.log(response))
    .then(err => console.log(err))
}

function updateTaskToKtor(id, title, date, checked, listId) {
  fetch(URL_UPDATE+id,
    {
      method: "PUT",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        title: title,
        date: date,
        checked: checked,
        idList: listId
      })
    })
    .then(response => console.log(response))
    .then(err => console.log(err))
}

function deleteListToKtor(id, onDeleted) {
  fetch(URL_DELETE_LIST+id,
    {
      method: "DELETE",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id: id
      })
    })
    .then(response => {
      console.log(response)
      onDeleted()
    })
    .then(err => console.log(err))
}

function updateListToKtor(id,name) {
  fetch(URL_UPDATE_LIST+id,
    {
      method: "PUT",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: name
      })
    })
    .then(response => console.log(response))
    .then(err => console.log(err))
}




document.addEventListener("DOMContentLoaded", function(){
  getKtorData(thisListOfTasks)
  getKtorDataLists()
});



