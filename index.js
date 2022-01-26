let tasklist = [];

$(".popListBtn").click(function () {
	$("#addList").show(500);
	$("body > :not(#addList)").addClass("blur");
});
$(".closeBtn").click(function () {
	$(".add__list").hide(500);
	$("body > *:not(.add__list)").removeClass("blur");
});

const addTask = () => {
	const taskTitle = document.getElementById("listName").value;
	const task = {
		id: Math.floor(Math.random() * 100),
		taskName: taskTitle,
		lists: [],
	};
	tasklist.push(task);
	$(".empty").hide();
	console.log(tasklist);
	displayTask(task.id);
};

const displayTask = (cardId) => {
	let cards = document.createElement("div");
	cards.setAttribute("class", "card");
	cards.setAttribute("id", cardId);

	$("#cards__section").append(cards);

	let h = document.createElement("h2");
	h.innerHTML = tasklist[tasklist.length - 1].taskName;
	cards.appendChild(h);

	let hr = document.createElement("hr");
	cards.appendChild(hr);

	$("body > *:not(#addList)").removeClass("blur");
	$("#addList").hide(500);

	let cardItems = document.createElement("div");
	cardItems.setAttribute("class", "cardItems");

	let del = `<i class="fa fa-trash-o deleteIcon" aria-hidden="true" onclick='deleteList(this)'></i>`;
	let add = `<i class="fa fa-plus-circle addIcon" aria-hidden="true" onclick="addItem(this)"></i>`;

	$(cards).append(cardItems, del, add);
};
let cardId;
const addItem = (id) => {
	$("#addItem").show(500);
	$("body > *:not(#addItem)").addClass("blur");
	cardId = id.parentNode.id;
	console.log(cardId);
};
const createItem = () => {
	const itemName = document.getElementById("itemName").value;
	let subtasks = document.querySelector("#cards__section").children;
	let innerdiv = document.createElement("div");
	innerdiv.setAttribute("class", "innerdiv");
	for (let i = 0; i < tasklist.length; i++) {
		let abc = subtasks[i];
		let bcd = abc.children[2];
		if (tasklist[i].id === Number(cardId)) {
			innerdiv.innerHTML = `<span class="intext">${itemName}</span><button class="itemBtn" onclick="markDone(this)" class="mark">Mark Done</button>`;
			bcd.appendChild(innerdiv);
		}
	}
	$("body > *:not(#addItem)").removeClass("blur");
	$("#addItem").hide(500);
};
const markDone = (itemId) => {
	let val = itemId.parentNode.children;
	let text = val[0];
	let butt = val[1];

	for (let i of tasklist) {
		if (i.id === Number(cardId)) {
			butt.style.display = "none";
			$(text).addClass("completed");
			break;
		}
	}
};
const deleteList = (id) => {
	let cardToDelete = id.parentNode;
	tasklist.splice(Number(cardId), 1);
	cardToDelete.remove();
	console.log(tasklist);
	if (tasklist.length == 0) {
		$(".empty").show();
	}
};
