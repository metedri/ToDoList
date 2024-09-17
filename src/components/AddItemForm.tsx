import { ChangeEvent, useState, KeyboardEvent } from "react"
import TextField from '@mui/material/TextField';
import IconButton from "@mui/material/IconButton";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

type Props ={
    addItem: (newTitle: string) => void
}

export const AddItemForm = ({addItem}: Props) => {
    const [newTitle, setNewTaskTitle] = useState('');
    const [error, setError] = useState('')

    const onNewTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTaskTitle(e.currentTarget.value)
    };
    const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError('')
        if (e.key === 'Enter') { addHandler(newTitle) }
    }
    const addHandler = (newTitle: string) => {
        newTitle.trim() ? addItem(newTitle) : setError('Title is required');
        setNewTaskTitle(''); 
    }


    return (
        <div>
                <TextField  
                    error={!!error}
                    helperText={error}
                    value={newTitle} 
                    onChange={onNewTitleChangeHandler}
                    onKeyDown={onKeyDownHandler}
                    variant={'outlined'}
                    size={'small'}
                    label={'Type value'}
                />
                <IconButton onClick={() => addHandler(newTitle)} size={'small'} color={'primary'}  >
                        <AddCircleOutlineIcon color={'primary'}/>
                    </IconButton>
            </div>
    )
}