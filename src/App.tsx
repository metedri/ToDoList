import { useState } from 'react';
import './App.css';
import { ToDoList, TasksType } from './components/ToDoList';
import { v1 } from 'uuid';
import { Button } from './components/Button';
import { AddItemForm } from './components/AddItemForm';

export type FilterValues = 'all' | 'active' | 'completed'
type ToDoLists = { 
    id: string 
    title: string
    filter: FilterValues 
}

type TasksState = {
    [key: string]: TasksType[]
}

function App() {
    // BLL
    const toDoListID1 = v1();
    const toDoListID2 = v1();

    const [allTasks, setAllTasks] = useState<TasksState>({
        [toDoListID1]: [
            { id: v1(), title: 'HTML&CSS', isDone: true },
            { id: v1(), title: 'JS', isDone: true },
            { id: v1(), title: 'ReactJS', isDone: false },
            { id: v1(), title: 'Redux', isDone: false },
            { id: v1(), title: 'Typescript', isDone: false },
            { id: v1(), title: 'RTK query', isDone: false },
        ],
        [toDoListID2]: [
            { id: v1(), title: 'book', isDone: false },
            { id: v1(), title: 'milk', isDone: true },
        ],
    })

    let [toDoLists, setToDoLists] = useState<ToDoLists[]>([
        { id: toDoListID1, title: 'What to learn', filter: 'all' },
        { id: toDoListID2, title: 'What to buy', filter: 'all' },
    ]
    )

    //----- task -

    const removeTask = (id: string, listID: string) => {
        setAllTasks({...allTasks, [listID]: allTasks[listID].filter(t => t.id !== id)})
    };

    const addTask = (title: string, listID: string) => {
        let newTask = { id: v1(), title: title, isDone: false }
        allTasks[listID] = [newTask, ...allTasks[listID]];
        setAllTasks({...allTasks})
    };

    const changeTaskStatus = (id: string, isDone: boolean, listID: string) => {
        setAllTasks({...allTasks, [listID]: allTasks[listID].map(t => t.id === id ? { ...t, isDone } : t)})
    };

    const changeTaskTitle = (title: string, listID: string, id: string) => {
        setAllTasks({...allTasks, [listID]: allTasks[listID].map(t => t.id === id? {...t, title: title}: t)})
    };

    //----- todolists -

    const removeToDoList = (listID: string) => {
        setToDoLists(toDoLists.filter(t => t.id !== listID))
        delete allTasks[listID]
        setAllTasks({...allTasks})
    };

    const addToDoList = (title: string) => {
        const newListID = v1()
        let newList: ToDoLists = { id: newListID, title: title, filter: 'all' }
        setToDoLists([...toDoLists, newList])
        setAllTasks({ ...allTasks, [newListID]: [] });
    };

    const changeListTitle = (title: string, listID: string) => {
        let newLists = toDoLists.map(tl => tl.id === listID ? {...tl,title: title}: tl)
        setToDoLists([...newLists])
    };

    //----- filtration -
    const changeToDoListFilter = (newFilterValues: FilterValues, id: string) => {
        toDoLists = toDoLists.map(tl => tl.id === id ? {...tl, filter: newFilterValues}: tl)
        setToDoLists([...toDoLists])
    };


    const toDoListComponents: JSX.Element[]  = toDoLists.map(tl => {
        //filtration
        let tasksForTodolist = allTasks[tl.id];
        tl.filter === 'active' && (tasksForTodolist = allTasks[tl.id].filter(task => !task.isDone))
        tl.filter === 'completed' && (tasksForTodolist = allTasks[tl.id].filter(task => task.isDone))

        return <ToDoList
            key={tl.id}
            title={tl.title}
            listID={tl.id}
            tasks={tasksForTodolist}
            removeTask={removeTask}
            changeToDoListFilter={changeToDoListFilter}
            addTask={addTask}
            changeTaskStatus={changeTaskStatus}
            filter={tl.filter}
            removeToDoList={removeToDoList}
            changeTaskTitle={changeTaskTitle}
            changeListTitle={changeListTitle}
        />
    });

    return (
        <div className="App">
            <Button onClick={() => {setToDoLists([]); setAllTasks({})}}>Remove all</Button>
            <AddItemForm addItem={addToDoList}/>
            <div className='ToDoLists'>
            { toDoListComponents }
            </div>
        </div>
    );
};

export default App;
