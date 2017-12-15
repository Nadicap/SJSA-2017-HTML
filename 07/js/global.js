// Local Storage

// Sets item in Local Storage
// localStorage.setItem("name", "Nadica");

// Gets the item
// var name = localStorage.getItem("name");

// Removes the item
// localStorage.removeItem("name");

// var person = {firsname: "Nadica", lastName: "Petrushevska"};
// localStorage.setItem("person", JSON.stringify(person));

// var data = JSON.parse(localStorage.getItem("person"));
// console.log(data);

// for(var x in data){
// 	console.log(data[x])
// }

// localStorage.removeItem("person");

// To do app

// function getTodos(){
// 	var todos = [];
// 	var todos_value = localStorage.getItem("todo");
// 	if(todos_value !== null){
// 		todos = JSON.parse(todos_value);
// 	}
// 	return todos;
// }

// function AddToDo(){
// 	var todo = document.getElementById("todo_src").value;
// 	var todos = getTodos();
// 	todos.push(todo);

// 	localStorage.setItem("todo", JSON.stringify(todos));

// 	show();
// }

// function show(){
// 	var todos = getTodos();
// 	var html = '<ul>';

// 	for(var i = 0; i < todos.length; i++){
// 		html += '<li>' + todos[i] + '<button class="remove" id="'+ i +'">X</button>' + '</li>';
// 	}

// 	html += '</ul>';
// 	document.getElementById("todos").innerHTML = html;

// 	var buttons = document.querySelectorAll(".remove");

// 	for(var i = 0; i < buttons.length; i++){
// 		buttons[i].addEventListener("click", remove);
// 	};

// };

// function remove(){
// 	var id = this.getAttribute("id");
// 	var todos = getTodos();
// 	todos.splice(id, 1);
// 	localStorage.setItem("todo", JSON.stringify(todos));
// 	show();
// }

// document.getElementById("button_src").addEventListener("click", AddToDo);
// show();

// Session Storage

sessionStorage.setItem("name", "Nadica");

// IndexedDB

var IndexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;

if(!indexedDB){
	console.log("Your browser doesn't support a stable version of IndexedDB")
};

var request = window.indexedDB.open("myDB", 3);

request.onupgradeneeded = function(){
	var db = request.result;
	var store = db.createObjectStore("UsersHolds", {keyPath: "id"});
	var index = store.createIndex("NameIndex", ["name.last", "name.first"]);
};

request.onsuccess = function(){
	var db = request.result;
	var tx = db.transaction("UsersHolds", "readwrite");
	var store = tx.objectStore("UsersHolds");
	var index = store.index("NameIndex");

	store.put({id: 1234, name: {first: "Nadica", last: "Petrushevska"}, age: 22});
	store.put({id: 4213, name: {first: "Pero", last: "Petkovski"}, age: 55});

	var getNadica = store.get(1234);
	var getPero = index.get(["Petkovski", "Pero"]);

	getNadica.onsuccess = function(){
		console.log(getNadica.result.name.first);
	}

	getPero.onsuccess = function(){
		console.log(getPero.result.name.first);
	}

	tx.oncomplete = function(){
		db.close();
	}
}