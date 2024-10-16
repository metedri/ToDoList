import { v1 } from "uuid";
import { FilterValues, ToDoLists } from "../app/App";

export const removeToDoListAC = (id: string) => {
    return {
        type: 'REMOVE_TODOLIST',
        payload: {
            id: id,
        }
    } as const
}

export const addToDoListAC = (title: string) => {
    return {
        type: 'ADD_TODOLIST',
        payload: {
            title: title,
            todolistId: v1()
        },
    } as const
}

export const changeListTitleAC = (payload: {id: string, title: string}) => {
    return {
        type: 'CHANGE_TODOLIST_TITLE',
        payload
    } as const
}

export const changeToDoListFiltertAC = (payload: {id: string, filter: FilterValues}) => {
    return {
        type: 'CHANGE_TODOLIST_FILTER',
        payload
    } as const
}


export type RemoveTodolistActionType = ReturnType<typeof removeToDoListAC>

export type AddTodolistActionType = ReturnType<typeof addToDoListAC>

export type ChangeTodolistTitleActionType = ReturnType<typeof changeListTitleAC>

export type ChangeTodolistFilterActionType = ReturnType<typeof changeToDoListFiltertAC>

type ActionsType =
    | RemoveTodolistActionType
    | AddTodolistActionType
    | ChangeTodolistTitleActionType
    | ChangeTodolistFilterActionType



const initialState: ToDoLists[] = []

export const todolistsReducer = (state = initialState, action: ActionsType): ToDoLists[] => {
    switch (action.type) {
        case 'REMOVE_TODOLIST': {
            return state.filter(t => t.id !== action.payload.id)
        }
        case 'ADD_TODOLIST': {
            let newList: ToDoLists = { 
                id: action.payload.todolistId, 
                title: action.payload.title, 
                filter: 'all' 
            }
            return [...state, newList]
        }
        case 'CHANGE_TODOLIST_TITLE': {
            return state.map(tl => tl.id === action.payload.id ? { ...tl, title: action.payload.title } : tl)
        }
        case 'CHANGE_TODOLIST_FILTER': {
            return state.map(tl => tl.id === action.payload.id ? { ...tl, filter: action.payload.filter } : tl)
        }
        default:
            return state
    }
}

