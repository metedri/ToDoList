import { useReducer, useState } from 'react';
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
import { addToDoListAC, changeListTitleAC, changeToDoListFiltertAC, removeToDoListAC, todolistsReducer } from './model/todolists-reducer';
import { addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer } from './model/tasks-reducer';

export type FilterValues = 'all' | 'active' | 'completed'
export type ToDoLists = {
    id: string
    title: string
    filter: FilterValues
}

export type TasksState = {
    [key: string]: TasksType[]
}

function App() {
    // BLL
    const toDoListID1 = v1();
    const toDoListID2 = v1();

    const [allTasks, dispatchToAllTasks] = useReducer(tasksReducer, {
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

    let [toDoLists, dispatchToTodolists] = useReducer(todolistsReducer, [
        { id: toDoListID1, title: 'What to learn', filter: 'all' },
        { id: toDoListID2, title: 'What to buy', filter: 'all' },
    ])

    //----- task -

    const removeTask = (id: string, todolistId: string) => {
        dispatchToAllTasks(removeTaskAC({id, todolistId}))
    };

    const addTask = (title: string, todolistId: string) => {
        dispatchToAllTasks(addTaskAC({title, todolistId}))
    };

    const changeTaskStatus = (id: string, isDone: boolean, todolistId: string) => {
        dispatchToAllTasks(changeTaskStatusAC({id, isDone, todolistId}))
    };

    const changeTaskTitle = (title: string, todolistId: string, id: string) => {
        dispatchToAllTasks(changeTaskTitleAC({title, todolistId, id}))
    };

    //----- todolists -

    const removeToDoList = (id: string) => {
        const action = removeToDoListAC(id)
        dispatchToTodolists(action)
        dispatchToAllTasks(action)
    };

    const addToDoList = (title: string) => {
        const action = addToDoListAC(title)
        dispatchToTodolists(action)
        dispatchToAllTasks(action)
    };

    const changeListTitle = (title: string, id: string) => {
        dispatchToTodolists(changeListTitleAC(id, title))
    };

    //----- filtration -
    const changeToDoListFilter = (filter: FilterValues, id: string) => {
        dispatchToTodolists(changeToDoListFiltertAC(id, filter))
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
            <AppBar position="static" sx={{ mb: '30px' }}>
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
                    <Button color="inherit">Logout</Button>
                    <Button color="inherit">Faq</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container spacing={1} style={{ padding: '10px 0' }}>
                    {/* <Button onClick={() => { setToDoLists([]); setAllTasks({}) }} size={'small'} variant={'contained'} color={'primary'}>Remove all</Button> */}
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
