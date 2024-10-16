import { TasksState, ToDoLists } from "../app/App"
import { tasksReducer } from "./tasks-reducer"
import { addToDoListAC, todolistsReducer } from "./todolists-reducer"

test('ids should be equals', () => {
    const startTasksState: TasksState = {}
    const startTodolistsState: ToDoLists[] = []

    const action = addToDoListAC('new todolist')

    const endTasksState = tasksReducer(startTasksState, action)
    const endTodolistsState = todolistsReducer(startTodolistsState, action)

    const keys = Object.keys(endTasksState)
    const idFromTasks = keys[0]
    const idFromTodolists = endTodolistsState[0].id

    expect(idFromTasks).toBe(action.payload.todolistId)
    expect(idFromTodolists).toBe(action.payload.todolistId)
})

