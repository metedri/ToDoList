import { FilterValues } from "../App"
import { Button } from "./Button"
import { ChangeEvent, useState, KeyboardEvent } from "react"

type ToDoListPropsType = {
    title: string
    tasks: TasksType[]
    date?: string
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
        if (e.key === 'Enter') {
            props.addTask(newTaskTitle);
            setNewTaskTitle('');
        }
    }

    const addTask = () => {
        props.addTask(newTaskTitle);
        setNewTaskTitle('');
    }

    const onAllClickHandler = () => props.changeFilter('all');
    const onActiveClickHandler = () => props.changeFilter('active');
    const onCompletedClickHandler = () => props.changeFilter('completed');

    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input value={newTaskTitle}
                    onChange={onNewTitleChangeHandler}
                    onKeyDown={onKeyDownHandler}
                />
                <Button title={'+'} onClick={addTask} />
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
                <Button title={'All'} onClick={onAllClickHandler} />
                <Button title={'Active'} onClick={onActiveClickHandler} />
                <Button title={'Completed'} onClick={onCompletedClickHandler} />
            </div>
            <div>{props.date}</div>
        </div>
    )
}

