import { FilterValues } from "../App"
import { Button } from "./Button"
import { ChangeEvent, useState, KeyboardEvent } from "react"

type ToDoListPropsType = {
    title: string
    tasks: TasksType[]
    filter: FilterValues
    removeTask: (id: string) => void
    changeFilter: (filter: FilterValues) => void
    addTask: (title: string) => void
    changeTaskStatus: (id: string, isDone: boolean) => void
}

export type TasksType = {
    id: string
    title: string
    isDone: boolean
}

export const ToDoList = (props: ToDoListPropsType) => {
    const {title, tasks, filter, removeTask, changeFilter, addTask, changeTaskStatus} = props

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
        newTaskTitle.trim() && newTaskTitle !== 'kakashka' ? addTask(newTaskTitle) : setError('Title is required');
        setNewTaskTitle(''); 
    }

    const setFilterHandlerCreator = (filterValue: FilterValues) =>  () => changeFilter(filterValue);
    

    return (
        <div>
            <h3>{title}</h3>
            <div>
                <input 
                    className={error ? 'error' : ''}
                    value={newTaskTitle} 
                    onChange={onNewTitleChangeHandler}
                    onKeyDown={onKeyDownHandler}
                />
                <Button title={'+'} onClick={addTaskHandler} />
                {error && <div className='error-message'>{error}</div>}
            </div>
            {tasks.length === 0 ? (
                <p>Задач нет</p>
            ) : (
                <ul>
                    {tasks.map(t => {
                        const onRemoveHandler = () => removeTask(t.id)
                        const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                            changeTaskStatus(t.id, e.currentTarget.checked)
                        }

                        return <li key={t.id} className={t.isDone ? 'is-done': ''}>
                            <div>
                                <input type="checkbox" checked={t.isDone} onChange={changeTaskStatusHandler} />
                                <span>{t.title}</span>
                            </div>
                            <Button title={'x'} onClick={onRemoveHandler} />
                        </li>
                    })}
                </ul>
            )}
            <div>
                <Button classes={`${filter === 'all' ? 'active-filter': ''}`} title={'All'} onClick={setFilterHandlerCreator('all')} />
                <Button classes={`${filter === 'active' ? 'active-filter': ''}`} title={'Active'} onClick={setFilterHandlerCreator('active')} />
                <Button classes={`${filter === 'completed' ? 'active-filter': ''}`} title={'Completed'} onClick={setFilterHandlerCreator('completed')} />
            </div>
        </div>
    )
}
