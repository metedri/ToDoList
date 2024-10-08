import { addToDoListAC, changeListTitleAC, changeToDoListFiltertAC, removeToDoListAC, todolistsReducer } from './todolists-reducer'
import { v1 } from 'uuid'
import { ToDoLists } from '../App'

let todolistId1 = v1()
let todolistId2 = v1()
let startState: ToDoLists[]

beforeEach(() => {
    startState = [
        { id: todolistId1, title: 'What to learn', filter: 'all' },
        { id: todolistId2, title: 'What to buy', filter: 'all' },
    ]
})

test('correct todolist should be removed', () => {
    let todolistId1 = v1()
    let todolistId2 = v1()

    const startState: ToDoLists[] = [
        { id: todolistId1, title: 'What to learn', filter: 'all' },
        { id: todolistId2, title: 'What to buy', filter: 'all' },
    ]

    const endState = todolistsReducer(startState, removeToDoListAC(todolistId1))

    expect(endState.length).toBe(1)
    expect(endState[0].id).toBe(todolistId2)
})

test('correct todolist should be added', () => {
    const endState = todolistsReducer(startState, addToDoListAC('New Todolist'))

    expect(endState.length).toBe(3)
    expect(endState[2].title).toBe('New Todolist')
})

test('correct todolist should change its name', () => {
    const endState = todolistsReducer(startState, changeListTitleAC(todolistId2, 'New Todolist'))

    expect(endState[0].title).toBe('What to learn')
    expect(endState[1].title).toBe('New Todolist')
})

test('correct filter of todolist should be changed', () => {   
    const endState = todolistsReducer(startState, changeToDoListFiltertAC(todolistId2, 'completed'))
   
    expect(endState[0].filter).toBe('all')
    expect(endState[1].filter).toBe('completed')
  })