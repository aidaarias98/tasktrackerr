//if theres any todos saved on out local storage get them
window.addEventListener('load', () => {
    todos = JSON.parse(localStorage.getItem('todos')) || []; //using json parse to unlock the info
    const nameInput = document.querySelector('#name'); //declaring nameInput from the name input on our html
    const newTodoForm = document.querySelector('#new-todo-form');
   const input= document.querySelector('#content');
     
    const username = localStorage.getItem('username') || ''; //declaring username for local storage

    nameInput.value = username;


    nameInput.addEventListener('change', e => {
        localStorage.setItem('username', e.target.value);
    })

    newTodoForm.addEventListener('submit', e =>{ //
        e.preventDefault(); //prevents page from reloading 

        //js validation
        const val = input.value;

        if(!val){ 
            alert("Please insert a task O.o");
            return;
        }
       
        console.log("submit form"); // if successfully added task it will show this on console
   
        const todo = { //Remember that the target is the actual form
            content: e.target.elements.content.value, //getting this from the form the input content 
            category: e.target.elements.category.value,//getting this from the form the input category 
            done:false, //this is set to false bc its not crossed out yet
            createdat:new Date()//get a time stamp of date and time
        }


        todos.push(todo); //adding new tasks into our array

        localStorage.setItem('todos', JSON.stringify(todos)); // save our local storage items and turn it into json by using jsonstringify turns task list into a json string to store it 

        e.target.reset(); //reseting the form

        DisplayTodos(); //calling functions so we can display our task list 
    })

    DisplayTodos(); //displays as soon as the page is loaded
})

function DisplayTodos(){
    const todoList= document.querySelector('#todo-list'); //this is where we are actually pushing our new tasks to

    todoList.innerHTML= ''; //setting the task list equal to nothing clears all of the elements


    todos.forEach(todo =>{ //looping though all of out tasks
        const todoItem = document.createElement('div'); //creating a div
        todoItem.classList.add('todo-item')

        const label = document.createElement('label');
        const input=document.createElement('input');
        const span =document.createElement('span');
        const content =document.createElement('div');
        const actions =document.createElement('div');
        const edit =document.createElement('button');
        const deleteButton = document.createElement('button');

        input.type = 'checkbox';
        input.checked = todo.done;
        span.classList.add('bubble');

        if (todo.category == 'personal'){
            span.classList.add('personal');
        }else{
            span.classList.add('buisness')
        }

        content.classList.add('todo-content');
        actions.classList.add('actions');
        edit.classList.add('edit');
        deleteButton.classList.add('delete');

        content.innerHTML = `<input type="text" value="${todo.content}" readonly>`;
        edit.innerHTML = 'Edit';
        deleteButton.innerHTML = 'Delete';

        label.appendChild(input);
        label.appendChild(span);
        actions.appendChild(edit);
        actions.appendChild(deleteButton);
        todoItem.appendChild(label);
        todoItem.appendChild(content);
        todoItem.appendChild(actions);

        todoList.appendChild(todoItem);

        if (todo.done){
            todoItem.classList.add('done');
        }

        input.addEventListener('click', (e) =>{ //Creating an event listener 
            todo.done = e.target.checked;
            localStorage.setItem('todos', JSON.stringify(todos));

            if (todo.done){
                todoItem.classList.add('done');
            }else{
                todoItem.classList.remove('done');
            }

            DisplayTodos();
        })

        edit.addEventListener('click', (e) => {
			const input = content.querySelector('input');
			input.removeAttribute('readonly');
			input.focus();
			input.addEventListener('blur', (e) => {
				input.setAttribute('readonly', true);
				todo.content = e.target.value;
				localStorage.setItem('todos', JSON.stringify(todos));
				DisplayTodos()
            })
		})

		deleteButton.addEventListener('click', (e) => {
			todos = todos.filter(t => t != todo);
			localStorage.setItem('todos', JSON.stringify(todos));
			DisplayTodos()
		})



    })
}
