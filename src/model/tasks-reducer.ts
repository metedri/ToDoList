import { v1 } from 'uuid'
import { TasksState } from '../App'
import { AddTodolistActionType, RemoveTodolistActionType } from './todolists-reducer';

// Action creators
export const removeTaskAC = (payload: { id: string; todolistId: string }) => {
  return {
    type: 'REMOVE_TASK', 
    payload
  } as const
}

export const addTaskAC = (payload: { title: string, todolistId: string }) => {
  return {
    type: 'ADD_TASK', 
    payload
  } as const
}

export const changeTaskStatusAC = (payload: { taskId: string, isDone: boolean, todolistId: string}) => {
  return {
    type: 'CHANGE_TASK_STATUS', 
    payload
  } as const
}

export const changeTaskTitleAC = (payload: {title: string, listID: string, id: string}) => {
  return {
    type: 'CHANGE_TASK_TITLE', 
    payload
  } as const

}


// Actions types
export type RemoveTaskActionType = ReturnType<typeof removeTaskAC>
export type AddTaskActionType = ReturnType<typeof addTaskAC>
export type ChangeTaskStatusActionType = ReturnType<typeof changeTaskStatusAC>
export type ChangeTaskTitleActionType = ReturnType<typeof changeTaskTitleAC>

type ActionsType = RemoveTaskActionType 
| AddTaskActionType 
| ChangeTaskStatusActionType 
| ChangeTaskTitleActionType
| AddTodolistActionType
| RemoveTodolistActionType




export const tasksReducer = (state: TasksState, action: ActionsType): TasksState => {
  switch (action.type) {
    case 'REMOVE_TASK': {
      const { id, todolistId} = action.payload
      return { ...state, [todolistId]: state[todolistId].filter(t => t.id !== id) }
    }
    case 'ADD_TASK': {
      const { title, todolistId} = action.payload
      let newTask = { id: v1(), title, isDone: false }
      return{ ...state, [todolistId]: [newTask, ...state[todolistId]] }
    }
    case 'CHANGE_TASK_STATUS': {
      const { taskId, isDone, todolistId} = action.payload
      return { ...state, [todolistId]: state[todolistId].map(t => t.id === taskId ? { ...t, isDone } : t) }
    }
    case 'CHANGE_TASK_TITLE': {
      const { title, listID, id} = action.payload
      return { ...state, [listID]: state[listID].map(t => t.id === id ? { ...t, title: title } : t) }
    }
    case 'ADD-TODOLIST': {
      return { ...state, [action.payload.todolistId]: [] }
    }
    case 'REMOVE-TODOLIST': {
      const stateCopy = {...state}
      delete stateCopy[action.payload.id]
      return stateCopy
    }
    default:
      throw new Error("I don't understand this type")
  }
}



