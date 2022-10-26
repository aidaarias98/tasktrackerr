//if theres any todos saved on out local storage get them
window.addEventListener('load', () => {
    todos = JSON.parse(localStorage.getItem('todos')) || []; //using json parse to unlock the info
    const nameInput = document.querySelector('#name'); //declaring nameInput from the name input on our html
    const newTodoForm = document.querySelector('#new-todo-form');
    const input1= document.querySelector('#content');//this is the input for the actual "e.g code"
     
    const username = localStorage.getItem('username') || ''; //

    nameInput.value = username; //pulls whats in our local storage to the "name here input"


    nameInput.addEventListener('change', e => { 
        localStorage.setItem('username', e.target.value); //setting username in the actual local storage
    })

    newTodoForm.addEventListener('submit', e =>{ //
        e.preventDefault(); //prevents page from reloading 

        //js validation
        const val = input1.value;

        if(!val){ 
            alert("Please insert a task 😵‍💫");
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

        e.target.reset(); //reseting the form (target is form) 

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

        //setting up all the elements we need (basically the dummy task html but through js)
        const label = document.createElement('label');
        const input= document.createElement('input');
        const span = document.createElement('span');
        const content = document.createElement('div');
        const actions = document.createElement('div');
        const edit = document.createElement('button');
        const deleteButton = document.createElement('button');

        input.type = 'checkbox'; //the circle that we check when its done 
        input.checked = todo.done; // tells us if its done or not
        span.classList.add('bubble'); //setting our class to the span  (hmtl)

        //blue or pink....this is for the catergories so if personal is selected add personal span class and vice versa for buisness
        if (todo.category == 'personal'){
            span.classList.add('personal');
        }else{
            span.classList.add('buisness')
        }

        //adding classes to these consts
        content.classList.add('todo-content');
        actions.classList.add('actions');
        edit.classList.add('edit');
        deleteButton.classList.add('delete');


        //task list buttons/inner text
        content.innerHTML = `<input type="text" value="${todo.content}" readonly>`; //this is for the second input will allow what is typed to be displayed on task list 
        edit.innerHTML = 'Edit'; //giving it the html words 
        deleteButton.innerHTML = 'Delete'; //giving it the html words 

        //appending all the elements 
        label.appendChild(input);
        label.appendChild(span);
        actions.appendChild(edit);
        actions.appendChild(deleteButton);
        todoItem.appendChild(label);
        todoItem.appendChild(content);
        todoItem.appendChild(actions);

        todoList.appendChild(todoItem);


        if (todo.done){ //this conditonal allows us to check off the task once completed
            todoItem.classList.add('done');
        }

        input.addEventListener('click', (e) =>{ //Creating an event listener  for the checkbox on click
            todo.done = e.target.checked; //check to see if what we clicked is checked
            localStorage.setItem('todos', JSON.stringify(todos)); // setting item (todos) in LS to todos array so eveytime we update it we to call LS

            if (todo.done){  //conditional so once we check it it will tell us if its done (true) or false
                todoItem.classList.add('done'); //telling us its done if checked
            }else{
                todoItem.classList.remove('done'); //if not it will take away the done and display as false
            }

            DisplayTodos(); //calling function to redisplay tasks in case of change
        })

        //edit
        edit.addEventListener('click', (e) => { //on click event listener
			const input = content.querySelector('input'); //where input is being stored so that we we selected the content 
			input.removeAttribute('readonly'); //removing the readonly attribute to be able to edit
			input.focus(); //highlights that input when selected
			input.addEventListener('blur', (e) => { //this event listener will allow us to click outside the input to "stop editing"
				input.setAttribute('readonly', true); 
				todo.content = e.target.value; //setting to new tasks to the new value inserted
				localStorage.setItem('todos', JSON.stringify(todos)); //resetting local storage for new values inserted
				DisplayTodos()//calling function again to redisplay any changes made
            })
		})

        //delete
		deleteButton.addEventListener('click', (e) => { //on click event listener
			todos = todos.filter(t => t != todo); // if t is not equal to todo we will delete filter() creates new array w/ elements that pass a test provided by funtion
			localStorage.setItem('todos', JSON.stringify(todos));//resetting local storage for new values inserted
			DisplayTodos()//calling function again to redisplay any changes made
		})


    })
}