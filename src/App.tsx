import { useState } from 'react';
import './App.css';
import { ToDoList, TasksType } from './components/ToDoList';
import { v1 } from 'uuid';
import { AddItemForm } from './components/AddItemForm';
import Button from '@mui/material/Button';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid2';
import Paper from '@mui/material/Paper';

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
        setAllTasks({ ...allTasks, [listID]: allTasks[listID].filter(t => t.id !== id) })
    };

    const addTask = (title: string, listID: string) => {
        let newTask = { id: v1(), title: title, isDone: false }
        allTasks[listID] = [newTask, ...allTasks[listID]];
        setAllTasks({ ...allTasks })
    };

    const changeTaskStatus = (id: string, isDone: boolean, listID: string) => {
        setAllTasks({ ...allTasks, [listID]: allTasks[listID].map(t => t.id === id ? { ...t, isDone } : t) })
    };

    const changeTaskTitle = (title: string, listID: string, id: string) => {
        setAllTasks({ ...allTasks, [listID]: allTasks[listID].map(t => t.id === id ? { ...t, title: title } : t) })
    };

    //----- todolists -

    const removeToDoList = (listID: string) => {
        setToDoLists(toDoLists.filter(t => t.id !== listID))
        delete allTasks[listID]
        setAllTasks({ ...allTasks })
    };

    const addToDoList = (title: string) => {
        const newListID = v1()
        let newList: ToDoLists = { id: newListID, title: title, filter: 'all' }
        setToDoLists([...toDoLists, newList])
        setAllTasks({ ...allTasks, [newListID]: [] });
    };

    const changeListTitle = (title: string, listID: string) => {
        let newLists = toDoLists.map(tl => tl.id === listID ? { ...tl, title: title } : tl)
        setToDoLists([...newLists])
    };

    //----- filtration -
    const changeToDoListFilter = (newFilterValues: FilterValues, id: string) => {
        toDoLists = toDoLists.map(tl => tl.id === id ? { ...tl, filter: newFilterValues } : tl)
        setToDoLists([...toDoLists])
    };


    const toDoListComponents: JSX.Element[] = toDoLists.map(tl => {
        //filtration
        let tasksForTodolist = allTasks[tl.id];
        tl.filter === 'active' && (tasksForTodolist = allTasks[tl.id].filter(task => !task.isDone))
        tl.filter === 'completed' && (tasksForTodolist = allTasks[tl.id].filter(task => task.isDone))

        return <Paper elevation={2} style={{ padding: '10px' }}>
            <ToDoList
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
        </Paper>
    });

    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        To Do List
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container spacing={1} style={{ padding: '10px 0' }}>
                    <Button onClick={() => { setToDoLists([]); setAllTasks({}) }} size={'small'} variant={'contained'} color={'primary'}>Remove all</Button>
                    <AddItemForm addItem={addToDoList} />
                </Grid>
                <Grid container spacing={2}>
                    {toDoListComponents}
                </Grid>

            </Container>
        </div>
    );
};

export default App;
