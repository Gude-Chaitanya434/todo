interface TodoTask{
    id: number,
    task: string,
    completed: boolean
}

class TodoApp{
    todoTasks: TodoTask[]
    taskInputHTML: HTMLInputElement 
    todoItemsHTML: HTMLUListElement
    todoerrorHTML: HTMLParagraphElement
    

    constructor(){
        this.todoTasks = []
        this.taskInputHTML = document.getElementById("taskInput") as HTMLInputElement
        this.todoItemsHTML = document.getElementById("todoItems") as HTMLUListElement
        this.todoerrorHTML = document.getElementById("error") as HTMLParagraphElement
        
    }

    addNewTask(taskText: string){
        
        if(taskText==""){
            this.todoerrorHTML.innerText="please enter the task";
         }
         else{
    
        const newTask:TodoTask  = {
            id: (new Date()).getTime(),
            task:taskText,
            completed : false
        };
    
    

        this.todoTasks.push(newTask)
        this.renderTasks()
        this.taskInputHTML.value = ''
        this.todoerrorHTML.innerText = "";
        }
        
        
    
       
    }
    


    markCompleted(id: number){
        const targetTask = this.todoTasks.filter((el) =>{
            return el.id === id
        })[0]
        if(targetTask){
            targetTask.completed = !targetTask.completed;
        }
        // TODO: send alert for invalid id
        this.renderTasks()
    }

    removeTask(id: number){
        this.todoTasks = this.todoTasks.filter((el) =>{
            return el.id !== id
        })
        this.renderTasks()
    }

    renderTasks(){
        /*
        convert the ts array into html list
        */
        const visibleTasks = this.todoTasks.slice(0, 5);/*used to create a subset of the todoTasks array containing only the first five tasks*/
        this.todoItemsHTML.innerHTML = ''
        this.todoTasks.forEach((todoTask: TodoTask)=>{
            this.todoItemsHTML.innerHTML += `
                <li class="${todoTask.completed? 'completed': 'notcompleted'}">
                    ${todoTask.task}
                    <button onclick="todoApp.markCompleted(${todoTask.id})"><i class="fa-solid fa-check"></i></button>
                    <button onclick="todoApp.removeTask(${todoTask.id})"><i class="fa-solid fa-trash-can"></i></button>
                </li>
            `;
        });
       
    }
}

const todoApp = new TodoApp()