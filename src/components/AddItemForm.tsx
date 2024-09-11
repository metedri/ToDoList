import { ChangeEvent, useState, KeyboardEvent } from "react"
import { Button } from "./Button";

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
                <input 
                    className={error ? 'error' : ''}
                    value={newTitle} 
                    onChange={onNewTitleChangeHandler}
                    onKeyDown={onKeyDownHandler}
                />
                <Button onClick={() => addHandler(newTitle)}>+</Button>
                {error && <div className='error-message'>{error}</div>}
            </div>
    )
}