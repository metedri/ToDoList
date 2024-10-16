import './App.css';
import { ToDoList, TasksType } from '../components/ToDoList';
import { AddItemForm } from '../components/AddItemForm';
import Button from '@mui/material/Button';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid2';
import Paper from '@mui/material/Paper';
import { addToDoListAC, changeListTitleAC, changeToDoListFiltertAC, removeToDoListAC } from '../model/todolists-reducer';
import { addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC } from '../model/tasks-reducer';
import { useAppDispatch, useAppSelector } from './hooks';

export type FilterValues = 'all' | 'active' | 'completed'
export type ToDoLists = {
    id: string
    title: string
    filter: FilterValues
}

export type TasksState = {
    [key: string]: TasksType[]
}

export const App = () => {

    const tasks = useAppSelector(state => state.tasks)
    const toDoLists = useAppSelector(state => state.todolists)
    
    const dispatch = useAppDispatch();

    //----- task -

    const removeTask = (id: string, todolistId: string) => {
        dispatch(removeTaskAC({id, todolistId}))
    };

    const addTask = (title: string, todolistId: string) => {
        dispatch(addTaskAC({title, todolistId}))
    };

    const changeTaskStatus = (id: string, isDone: boolean, todolistId: string) => {
        dispatch(changeTaskStatusAC({id, isDone, todolistId}))
    };

    const changeTaskTitle = (title: string, todolistId: string, id: string) => {
        dispatch(changeTaskTitleAC({title, todolistId, id}))
    };

    //----- todolists -

    const removeToDoList = (id: string) => {
        dispatch(removeToDoListAC(id))
    };

    const addToDoList = (title: string) => {
        dispatch(addToDoListAC(title))
    };

    const changeListTitle = (title: string, id: string) => {
        dispatch(changeListTitleAC({id, title}))
    };

    //----- filtration -
    const changeToDoListFilter = (filter: FilterValues, id: string) => {
        dispatch(changeToDoListFiltertAC({id, filter}))
    };


    const toDoListComponents: JSX.Element[] = toDoLists.map(tl => {
        //filtration
        let tasksForTodolist = tasks[tl.id];
        tl.filter === 'active' && (tasksForTodolist = tasks[tl.id].filter(task => !task.isDone))
        tl.filter === 'completed' && (tasksForTodolist = tasks[tl.id].filter(task => task.isDone))

        return <Paper elevation={2} style={{ padding: '10px' }} key={tl.id}>
            <ToDoList
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

