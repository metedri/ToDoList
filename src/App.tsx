import { useState } from 'react';
import './App.css';
import { ToDoList, TasksType } from './components/ToDoList';
import { v1 } from 'uuid';
import { Button } from './components/Button';

export type FilterValues = 'all' | 'active' | 'completed'
type toDoLists = { 
    id: string 
    title: string
    filter: FilterValues 
}

function App() {
    const toDoListID1 = v1();
    const toDoListID2 = v1();

    const [allTasks, setAllTasks] = useState({
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
        ]
    })

    let [toDoLists, setToDoLists] = useState<toDoLists[]>([
        { id: toDoListID1, title: 'What to learn', filter: 'all' },
        { id: toDoListID2, title: 'What to buy', filter: 'all' },
    ]
    )


    const removeTask = (id: string, listID: string) => {
        allTasks[listID] = allTasks[listID].filter(t => t.id !== id);
        setAllTasks({...allTasks})
    };

    const removeToDoList = (listID: string) => {
        setToDoLists(toDoLists.filter(t => t.id !== listID))
        delete allTasks[listID]
        setAllTasks({...allTasks})
    }

    const addTask = (title: string, listID: string) => {
        let newTask = { id: v1(), title: title, isDone: false }
        allTasks[listID] = [newTask, ...allTasks[listID]];
        setAllTasks({...allTasks})
    };

    const changeTaskStatus = (id: string, isDone: boolean, listID: string) => {
        allTasks[listID] = allTasks[listID].map(t => t.id === id ? { ...t, isDone } : t)
        setAllTasks({...allTasks})
    }

    //filtration
    const changeFilter = (newFilterValues: FilterValues, id: string) => {
        let toDoList = toDoLists.find(tl => tl.id === id)
        if (toDoList) {
            toDoList.filter = newFilterValues
            setToDoLists([...toDoLists])
        }
    };


    return (
        <div className="App">
            <Button onClick={() => setToDoLists([])}>Remove all</Button>
            <div className='ToDoLists'>
            {
                toDoLists.map(tl => {
                    //filtration
                    let tasksForTodolist = allTasks[tl.id];
                    tl.filter === 'active' && (tasksForTodolist = tasksForTodolist.filter(task => !task.isDone))
                    tl.filter === 'completed' && (tasksForTodolist = tasksForTodolist.filter(task => task.isDone))

                    return <ToDoList
                        key={tl.id}
                        title={tl.title}
                        listID={tl.id}
                        tasks={tasksForTodolist}
                        removeTask={removeTask}
                        changeFilter={changeFilter}
                        addTask={addTask}
                        changeTaskStatus={changeTaskStatus}
                        filter={tl.filter}
                        removeToDoList={removeToDoList}
                    />
                })
            }
            </div>
        </div>
    );
}

export default App;
