// creating variables
const poligons = document.querySelectorAll('.trello__item .trello__body');
let trelloRemoveTaskBtn = document.querySelector('.fa-circle-xmark');
let editTaskBtn = document.querySelector('.trello__editBtn');
const trelloBtn = document.querySelector('.trello__addTaskBtn');
const trelloInp = document.querySelector('.header__inp');
const trelloSprint = document.querySelector('.trello__sprint .trello__body');
let newTrelloTask;

poligons.forEach((el) => {
    el.addEventListener('dragover', allowDrop);
    el.addEventListener('drop', dropTask);
});

trelloBtn.addEventListener('click', addTask);

function removeTask() {

    // returning the avatar to the container when deleting a task
    let img = this.parentElement.querySelector('img');
    if ( img !== null){
        performerContainer.appendChild(img);
        this.parentElement.remove();
    } else {
        this.parentElement.remove();
    }
}

function editTask() {
    const taskTextBlock = document.createElement('div');
    taskTextBlock.classList.add('trello__taskTextBlock');
    taskTextBlock.setAttribute('contenteditable', 'true');
    this.parentElement.appendChild(taskTextBlock);
}

function allowDrop(e) {
    e.preventDefault(); // overrides the browser's default behavior
}

function dropTask() {
    this.appendChild(newTrelloTask);
}

function addTask() {

    const trelloTask = document.createElement('div');
    
    // adding block for avatars
        const avatarBlock = document.createElement('div');
        avatarBlock.classList.add('trello__avatarBlock');
        trelloTask.appendChild(avatarBlock);
        avatarBlock.addEventListener('drop', (event) => { event.stopPropagation() });
        avatarBlock.addEventListener('drop', dropPerformer);

        // add a remove task button and hang an event on click
        const trelloRemoveTaskBtn = document.createElement('i');
        trelloRemoveTaskBtn.classList.add('fa-solid');
        trelloRemoveTaskBtn.classList.add('fa-circle-xmark');
        trelloRemoveTaskBtn.addEventListener('click', removeTask);

    // adding an edit button
        const editTaskBtn = document.createElement('i');
        editTaskBtn.classList.add('fa-solid');
        editTaskBtn.classList.add('fa-pencil');
        editTaskBtn.classList.add('trello__editBtn');
        
        // create a new task on button click
        trelloTask.addEventListener('dragstart', (e) => { newTrelloTask = e.target });
        trelloTask.classList.add('trello__task');
        trelloTask.setAttribute('draggable', 'true');
        trelloSprint.appendChild(trelloTask);

        trelloTask.appendChild(trelloRemoveTaskBtn);
        trelloTask.appendChild(editTaskBtn);
    editTaskBtn.addEventListener('click', editTask);
    trelloTask.addEventListener('dragstart', movingTask);
}

function movingTask(e) {
    newTrelloTask = e.target;
    newTrelloTask.addEventListener('drop', (event) => { event.stopPropagation() });
};


// the appearance of a container with executors when a button is pressed
const showPerformerBtn = document.querySelector('.header__showPerformerBtn');
const performerContainer = document.querySelector('.header__performerContainer');
let performers = document.querySelectorAll('.header__performerContainer img');
let performer;

showPerformerBtn.addEventListener('click', performersVisible);

function performersVisible() {
    performerContainer.classList.toggle('performersVisible')
}
  
// adding performers
performerContainer.addEventListener('dragover', allowDrop);
performerContainer.addEventListener('drop', dropPerformer);

performers.forEach((el) => {
    el.addEventListener('dragstart', (e) => { performer = e.target });
});

function dropPerformer() {
// exclusion of nesting avatars into each other
    if (this != '<img>') {
        this.appendChild(performer);
    }  
}   

// add new performer avatar to container
const addNewPerformerBtn = document.querySelector('.header__addPerformerBtn');
let nwePerformer;
addNewPerformerBtn.addEventListener('click', addNewAvatar);

function addNewAvatar() {

    nwePerformer = document.createElement('img');
    nwePerformer.setAttribute('src', './img/Unknown.jpg');
    nwePerformer.setAttribute('alt', 'avatar');
    nwePerformer.setAttribute('draggable', 'true');
    nwePerformer.setAttribute('width', '40px');
    performerContainer.appendChild(nwePerformer);
    performers = document.querySelectorAll('.header__performerContainer img');
    performers.forEach((el) => {
        el.addEventListener('dragstart', (e) => { performer = e.target });
    });
}