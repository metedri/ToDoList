import { useState } from 'react';
import './App.css';
import { ToDoList, TasksType } from './components/ToDoList';
import { v1 } from 'uuid';

export type FilterValues = 'all' | 'active' | 'completed'

function App() {
    const [tasks, setTasks] = useState<TasksType[]>(
        [
            { id: v1(), title: 'HTML&CSS', isDone: true },
            { id: v1(), title: 'JS', isDone: true },
            { id: v1(), title: 'ReactJS', isDone: false },
            { id: v1(), title: 'Redux', isDone: false },
            { id: v1(), title: 'Typescript', isDone: false },
            { id: v1(), title: 'RTK query', isDone: false },
        ]
    );

    const removeTask = (id: string) => { setTasks(tasks.filter(t => t.id !== id)) };

    const addTask = (title: string) => {
        let newTask = { id: v1(), title: title, isDone: false }
        let newTasks = [newTask, ...tasks];
        setTasks(newTasks);
    };

    const changeTaskStatus = (id: string, isDone: boolean) => {
        const updatedTasks = tasks.map(t =>
            t.id === id ? { ...t, isDone } : t
        );
        setTasks(updatedTasks);
    };

    const [filter, setFilter] = useState<FilterValues>('all');

    const changeFilter = (filter: FilterValues) => setFilter(filter);

    let tasksForTodolist = tasks;
    if (filter === 'active') {
        tasksForTodolist = tasks.filter(task => !task.isDone)
    };

    if (filter === 'completed') {
        tasksForTodolist = tasks.filter(task => task.isDone)
    };

    return (
        <div className="App">
            <ToDoList title="What to learn"
                tasks={tasksForTodolist}
                removeTask={removeTask}
                changeFilter={changeFilter}
                addTask={addTask}
                changeTaskStatus={changeTaskStatus}
                filter={filter}
            />
        </div>
    );
}

export default App;
