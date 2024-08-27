import { FilterValues } from "../App"
import { Button } from "./Button"
import { ChangeEvent, useState, KeyboardEvent } from "react"

type ToDoListPropsType = {
    title: string
    tasks: TasksType[]
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
    const [newTaskTitle, setNewTaskTitle] = useState('');

    const onNewTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTaskTitle(e.currentTarget.value)
    };

    const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') { addTaskHandler() }
    }

    const addTaskHandler = () => {
        if ( newTaskTitle) {
        props.addTask(newTaskTitle);
        setNewTaskTitle(''); 
    }}

    const setFilterHandlerCreator = (filterValue: FilterValues) =>  () => props.changeFilter(filterValue);
    

    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input 
                    value={newTaskTitle} 
                    onChange={onNewTitleChangeHandler}
                    onKeyDown={onKeyDownHandler}
                />
                <Button title={'+'} onClick={addTaskHandler} />
            </div>
            {props.tasks.length === 0 ? (
                <p>Задач нет</p>
            ) : (
                <ul>
                    {props.tasks.map(t => {
                        const onRemoveHandler = () => props.removeTask(t.id)
                        const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                            const newStatusValue = e.currentTarget.checked
                            props.changeTaskStatus(t.id, newStatusValue)
                        }


                        return <li key={t.id}>
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
                <Button title={'All'} onClick={setFilterHandlerCreator('all')} />
                <Button title={'Active'} onClick={setFilterHandlerCreator('active')} />
                <Button title={'Completed'} onClick={setFilterHandlerCreator('completed')} />
            </div>
        </div>
    )
}

