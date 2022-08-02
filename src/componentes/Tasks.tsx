import {Check , Trash  } from 'phosphor-react'

import styles from './Tasks.module.css'
interface TasksProps{
  taskIn: {
    description: string;
    completed: boolean;  
  };
  handleDeleteTask: () => {};
  setCompletedTask: () => {};
}

export function Tasks({taskIn, handleDeleteTask, setCompletedTask }:TasksProps) {
  
  return(            
    <div className={styles.tasksList}>
      <div className={styles.tasks}>
        <div className= {taskIn.completed ? styles.checkCircle:styles.check}
        onClick={setCompletedTask} >                 
          <Check size={15} />
        </div>
        <label className={taskIn.completed ? styles.taskCompleted : ''} onClick={setCompletedTask} htmlFor="task">{taskIn.description}</label>           
        <button onClick={handleDeleteTask}> <Trash size={20} /> </button>
      </div>
    </div>    
  )
}