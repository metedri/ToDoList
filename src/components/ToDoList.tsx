import { FilterValues } from "../App"
import { Button } from "./Button"
import { ChangeEvent, useState, KeyboardEvent } from "react"

type ToDoListPropsType = {
    listID: string
    title: string
    tasks: TasksType[]
    filter: FilterValues
    removeTask: (id: string, listID: string) => void
    changeFilter: (newFilterValues: FilterValues, id: string) => void
    addTask: (title: string, listID: string) => void
    changeTaskStatus: (id: string, isDone: boolean, listID: string) => void
    removeToDoList: (listID: string) => void
}

export type TasksType = {
    id: string
    title: string
    isDone: boolean
}

export const ToDoList = (props: ToDoListPropsType) => {
    const {listID, title, tasks, filter, removeTask, changeFilter, addTask, changeTaskStatus, removeToDoList} = props

    const [newTaskTitle, setNewTaskTitle] = useState('');
    const [error, setError] = useState('')

    const onNewTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTaskTitle(e.currentTarget.value)
    };

    const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError('')
        if (e.key === 'Enter') { addTaskHandler() }
    }

    const addTaskHandler = () => {
        newTaskTitle.trim() && newTaskTitle !== 'kakashka' ? addTask(newTaskTitle, listID) : setError('Title is required');
        setNewTaskTitle(''); 
    }

    const setFilterHandlerCreator = (newFilterValues: FilterValues, id: string) =>  () => changeFilter(newFilterValues, id);
    
    const removeToDoListHandler = () => {
        removeToDoList(listID)
    }

    return (
        <div>
            <h3>{title}<Button onClick={removeToDoListHandler}>x</Button></h3>
            
            <div>
                <input 
                    className={error ? 'error' : ''}
                    value={newTaskTitle} 
                    onChange={onNewTitleChangeHandler}
                    onKeyDown={onKeyDownHandler}
                />
                <Button onClick={addTaskHandler}>+</Button>
                {error && <div className='error-message'>{error}</div>}
            </div>
            {tasks.length === 0 ? (
                <p>Задач нет</p>
            ) : (
                <ul>
                    {tasks.map(t => {
                        const onRemoveHandler = () => removeTask(t.id, listID)
                        const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                            changeTaskStatus(t.id, e.currentTarget.checked, listID)
                        }

                        return <li key={t.id} className={t.isDone ? 'is-done': ''}>
                            <div>
                                <input type="checkbox" checked={t.isDone} onChange={changeTaskStatusHandler} />
                                <span>{t.title}</span>
                            </div>
                            <Button onClick={onRemoveHandler}>x</Button>
                        </li>
                    })}
                </ul>
            )}
            <div>
                <Button classes={`${filter === 'all' ? 'active-filter': ''}`} onClick={setFilterHandlerCreator('all', listID)}>All</Button>
                <Button classes={`${filter === 'active' ? 'active-filter': ''}`} onClick={setFilterHandlerCreator('active', listID)}>Active</Button>
                <Button classes={`${filter === 'completed' ? 'active-filter': ''}`} onClick={setFilterHandlerCreator('completed', listID)}>Completed</Button>
            </div>
        </div>
    )
}
