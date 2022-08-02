import {ChangeEvent, FormEvent, InvalidEvent, useState } from 'react'
import { ListChecks, ClipboardText  } from 'phosphor-react'
import { Tasks } from './componentes/Tasks';
import styles from './App.module.css'


import './global.css';
// informações que mudam em cada task:
// input: checkBox 
// content: String, boolean
// button: Trash

// const tasks = [
//   {
//     description: 'string',
//     completed: 'boolean',
//   }
// ]
interface TaskCompleted{
  task?: object;
  tasks?: object;  
  description: string;
  completed: boolean;
}

export function App() {

  const [newTaskText, setNewTaskText] = useState('')  
  const [tasks, setTasks] = useState<TaskCompleted[]>([])
   

  function handleCreateNewTask(event:FormEvent){
    event.preventDefault()       
    setTasks([...tasks, {description: newTaskText, completed: false}])
    setNewTaskText('')      
  }  

  function handleNewTaskChange(event:ChangeEvent<HTMLTextAreaElement>){
    event.target.setCustomValidity('')             
    setNewTaskText(event.target.value)
  }

  function handleNewTaskInsert() {          
      setTasks([...tasks])      
  } 

  function handleNewTaskInvalid(event:InvalidEvent<HTMLTextAreaElement>) {
    event.target.setCustomValidity('Esse campo é obrigatório')
  }  
  
  function handleSetCompletedTask(id:number) {    
    const newTaskList = tasks.map(
    (task:TaskCompleted, index) => ({
    ...task, 
    completed: index === id ? !task.completed : task.completed
    })
    );    
    
    setTasks(newTaskList)
  } 

  function deleteTask(id:number) {
    const newTaskList = tasks.filter((_, index) => (id !== index));

    setTasks(newTaskList)
  }      
  return (    
    <div className={styles.wrapper}>
      <div className={styles.header}> 
        <header>        
          <p>to <ListChecks size={32} /> <span>do</span> </p>
        </header>
      </div> 
      <div>
        <form onSubmit={handleCreateNewTask} className={styles.newTask}>          
          <textarea
            name='task'
            placeholder='Adicione uma nova tarefa'
            value={newTaskText}
            onChange={handleNewTaskChange}
            onInvalid = {handleNewTaskInvalid}            
            required
          />          
          <button 
            onClick={handleNewTaskInsert} 
            type='submit' 
            disabled={newTaskText.length === 0}
          >
            Criar
          </button>          
        </form>        
        
      </div>      
      <main>        
        <div className={styles.tasksDone}>
          <p>Tarefas criadas 
            <span>{tasks.length}</span></p>
          <p className={styles.completed}>Concluídas 
            <span className={styles.completedTasks}>
              {tasks.filter((task:TaskCompleted) => (task.completed === true)).length} de {tasks.length}
            </span>
          </p>
        </div>
        <div className= {!tasks.length?styles.empty:styles.emptyLeave}> 
          <ClipboardText size={56} />
          Você ainda não tem tarefas cadastradas
          <span>Crie tarefas e organize seu itens a fazer</span>      
        </div>         
        {tasks.map((taskSend:TaskCompleted, index) => {
          return(
            <Tasks
              key={taskSend.description} 
              taskIn={taskSend}
              handleDeleteTask={async () => deleteTask(index)}
              setCompletedTask={async () => handleSetCompletedTask(index)}                     
            />
        )})}                  
      </main>             
    </div>      
  )
}
