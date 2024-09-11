import { FilterValues } from "../App"
import { AddItemForm } from "./AddItemForm"
import { Button } from "./Button"
import { ChangeEvent } from "react"
import { EditableSpan } from "./EditableSpan"

type Props = {
    listID: string
    title: string
    tasks: TasksType[]
    filter: FilterValues
    removeTask: (id: string, listID: string) => void
    addTask: (title: string, listID: string) => void
    changeTaskStatus: (id: string, isDone: boolean, listID: string) => void
    removeToDoList: (listID: string) => void
    changeToDoListFilter: (newFilterValues: FilterValues, id: string) => void
    changeTaskTitle: (title: string, listID: string, id: string) => void
    changeListTitle: (title: string, listID: string) => void
}

export type TasksType = {
    id: string
    title: string
    isDone: boolean
}

export const ToDoList = (props: Props) => {
    const {
        listID,
        title,
        tasks,
        filter,
        removeTask,
        changeToDoListFilter,
        addTask,
        changeTaskStatus,
        removeToDoList,
        changeTaskTitle,
        changeListTitle
    } = props

    const addTaskHandler = (newTaskTitle: string) => {
        addTask(newTaskTitle, listID)
    }

    const setFilterHandlerCreator = (newFilterValues: FilterValues, id: string) => () => changeToDoListFilter(newFilterValues, id);

    const removeToDoListHandler = () => {
        removeToDoList(listID)
    }

    const changeListTitleHandler = (newListTitle: string) => {
        changeListTitle(newListTitle, listID)
    }

    const tasksComponents = tasks.length === 0 ? (<p>Задач нет</p>) : (
        <ul>
            {tasks.map(t => {
                const onRemoveHandler = () => removeTask(t.id, listID)
                const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                    changeTaskStatus(t.id, e.currentTarget.checked, listID)
                }

                const changeTitleHandler = (newTaskTitle: string) => {
                    changeTaskTitle(newTaskTitle, listID, t.id)
                }
            
                return <li key={t.id} className={t.isDone ? 'is-done' : ''}>
                    <div>
                        <input type="checkbox" checked={t.isDone} onChange={changeTaskStatusHandler} />
                        <EditableSpan title={t.title} changeTitle={changeTitleHandler}/>
                    </div>
                    <Button onClick={onRemoveHandler}>x</Button>
                </li>
            })}
        </ul>
    )

    return (
        <div>
            <div className='todolisttitle'>
                <h3><EditableSpan title={title} changeTitle={changeListTitleHandler}/></h3>
                <Button onClick={removeToDoListHandler}>x</Button>
            </div>
            <AddItemForm addItem={addTaskHandler} />
            {tasksComponents}
            <div>
                <Button classes={`${filter === 'all' ? 'active-filter' : ''}`} onClick={setFilterHandlerCreator('all', listID)}>All</Button>
                <Button classes={`${filter === 'active' ? 'active-filter' : ''}`} onClick={setFilterHandlerCreator('active', listID)}>Active</Button>
                <Button classes={`${filter === 'completed' ? 'active-filter' : ''}`} onClick={setFilterHandlerCreator('completed', listID)}>Completed</Button>
            </div>
        </div>
    )
}
