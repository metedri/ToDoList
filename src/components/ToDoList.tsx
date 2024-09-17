import { FilterValues } from "../App"
import { AddItemForm } from "./AddItemForm"
import { ChangeEvent, useState } from "react"
import { EditableSpan } from "./EditableSpan"
import IconButton from "@mui/material/IconButton"
import DeleteIcon from '@mui/icons-material/Delete';
import Button from "@mui/material/Button"
import Checkbox from "@mui/material/Checkbox"
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';
import KeyboardDoubleArrowUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp';


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

    const [collapsed, setCollapsed] = useState(false)


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
        <ul style={{ padding: '0' }}>
            {tasks.map(t => {
                const onRemoveHandler = () => removeTask(t.id, listID)
                const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                    changeTaskStatus(t.id, e.currentTarget.checked, listID)
                }

                const changeTitleHandler = (newTaskTitle: string) => {
                    changeTaskTitle(newTaskTitle, listID, t.id)
                }

                return <li key={t.id} className={t.isDone ? 'is-done' : ''} style={{ listStyle: 'none', display: 'flex', justifyContent: 'space-between' }}>
                    <div>
                        <Checkbox checked={t.isDone} onChange={changeTaskStatusHandler} />
                        <EditableSpan title={t.title} changeTitle={changeTitleHandler} />
                    </div>
                    <IconButton onClick={onRemoveHandler} size={'small'} >
                        <DeleteIcon />
                    </IconButton>

                </li>
            })}
        </ul>
    )

    return (
        <div>
            <div className='todolisttitle'>
                <h3><EditableSpan title={title} changeTitle={changeListTitleHandler} /></h3>
                <div>
                    <IconButton onClick={() => setCollapsed(!collapsed)} size={'small'}>
                        {collapsed ? <KeyboardDoubleArrowUpIcon /> : <KeyboardDoubleArrowDownIcon />}
                    </IconButton>
                    <IconButton onClick={removeToDoListHandler} size={'small'}>
                        <DeleteIcon />
                    </IconButton>
                </div>
            </div>

            {collapsed &&
                <div>
                    <AddItemForm addItem={addTaskHandler} />
                    {tasksComponents}
                    <div>
                        <Button onClick={setFilterHandlerCreator('all', listID)} size={'small'} variant={filter === 'all' ? 'outlined' : 'text'}>All</Button>
                        <Button onClick={setFilterHandlerCreator('active', listID)} size={'small'} variant={filter === 'active' ? 'outlined' : 'text'}>Active</Button>
                        <Button onClick={setFilterHandlerCreator('completed', listID)} size={'small'} variant={filter === 'completed' ? 'outlined' : 'text'}>Completed</Button>
                    </div>
                </div>
            }</div>
    )
}
