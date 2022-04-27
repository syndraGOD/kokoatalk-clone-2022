const TODO_USERNAME = "username"
const TODO_LIST = "todo"

const usernamebox = document.querySelector('.form_box');
const todo_form = document.querySelector('#todo-form');
const todo_form_input = document.querySelector('#todo-form input');
const todo_list = document.querySelector('#todo-list');


ifusername();


function ifusername(){
    if(localStorage.getItem(TODO_USERNAME)){
        usernamebox.parentNode.removeChild(usernamebox);
        document.querySelector('.hello').classList.remove("hide");
        document.querySelector('.hello').innerText +=  localStorage.getItem(TODO_USERNAME);
    }
    else{
        usernamebox.classList.remove("hide");
    }
}

usernamebox.addEventListener("submit", username_submit);


function username_submit(event){
    event.preventDefault();
    localStorage.setItem(TODO_USERNAME, usernamebox.querySelector('input:nth-child(2)').value);
    ifusername();
}


todo_form.addEventListener("submit", handle_todoform_submit);

function handle_todoform_submit(event){
    event.preventDefault();
    const todoobj = {
        text: todo_form_input.value,
        id: Date.now()
    }
    todo_form_input.value = '';
    paint_todo(todoobj);
}

function paint_todo(todoobj){
    const li = document.createElement('li');
    li.id = todoobj.id;
    const span = document.createElement('span');
    span.innerText = todoobj.text;
    const button = document.createElement('button');
    button.innerText = 'X';
    button.addEventListener('click', deletetodo);
    li.appendChild(span);
    li.appendChild(button);
    todo_list.appendChild(li);
}

function deletetodo(event){
    const target = event.target.parentNode;
    target.remove();
}

function localStorage_push_data(data){
    let temp = localStorage.getItem(TODO_LIST);
    temp += data;
    localStorage.setItem(TODO_LIST, JSON.stringify(temp)); 
}
function localStorage_set_data(data){
    localStorage.setItem(TODO_LIST, JSON.stringify(data));
}
function localStorage_remove_data(data){
    let temp = JSON.parse(localStorage.getItem(TODO_LIST));
    temp = temp.filter((remove_data) => remove_data.id !== JSON.parseint(data.id));
    localStorage.setItem(TODO_LIST, JSON.stringify(temp));
}


temps1 = {
    text: '1번이지롱',
    id: 1
}
temps2 = {
    text: '2번',
    id: 2
}
temps3 = {
    text: '3번',
    id: 3
}

localStorage_set_data(temps1);
localStorage_push_data(temps2);
localStorage_push_data(temps3);
console.log(JSON.parse(localStorage.getItem(TODO_LIST)));