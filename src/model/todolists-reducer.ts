import { v1 } from "uuid";
import { FilterValues, ToDoLists } from "../App";

export const removeToDoListAC = (id: string) => {
    return {
        type: 'REMOVE-TODOLIST',
        payload: {
            id: id,
        }
    } as const
}

export const addToDoListAC = (title: string) => {
    return {
        type: 'ADD-TODOLIST',
        payload: {
            title: title,
            todolistId: v1()
        },
    } as const
}

export const changeListTitleAC = (id: string, title: string) => {
    return {
        type: 'CHANGE-TODOLIST-TITLE',
        payload: {
            id: id,
            title: title,
        }
    } as const
}

export const changeToDoListFiltertAC = (id: string, filter: FilterValues) => {
    return {
        type: 'CHANGE-TODOLIST-FILTER',
        payload: {
            id: id,
            filter: filter,
        }
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

const toDoListID1 = v1();
const toDoListID2 = v1();


const initialState: ToDoLists[] = [
    { id: toDoListID1, title: 'What to learn', filter: 'all' },
    { id: toDoListID2, title: 'What to buy', filter: 'all' },
]

export const todolistsReducer = (state = initialState, action: ActionsType): ToDoLists[] => {
    switch (action.type) {
        case "REMOVE-TODOLIST": {
            return state.filter(t => t.id !== action.payload.id)
        }
        case "ADD-TODOLIST": {
            let newList: ToDoLists = { 
                id: action.payload.todolistId, 
                title: action.payload.title, 
                filter: 'all' 
            }
            return [...state, newList]
        }
        case 'CHANGE-TODOLIST-TITLE': {
            return state.map(tl => tl.id === action.payload.id ? { ...tl, title: action.payload.title } : tl)
        }
        case "CHANGE-TODOLIST-FILTER": {
            return state.map(tl => tl.id === action.payload.id ? { ...tl, filter: action.payload.filter } : tl)
        }
        default:
            throw new Error('I don`t understand this type')
    }
}

