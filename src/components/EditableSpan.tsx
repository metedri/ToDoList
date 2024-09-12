import TextField from "@mui/material/TextField";
import { ChangeEvent, useState, KeyboardEvent } from "react"


type Props = {
    title: string
    changeTitle: (newTitle: string) => void
}

export const EditableSpan = ({title, changeTitle}: Props) => {
    const [editMode, setEditMode] = useState(false);
    const [newTitle, setNewTitle] = useState(title);

    const activeEditMode = () => {
        setEditMode(true)
        setNewTitle(newTitle)
    };

    const activeViewMode = () => {
        setEditMode(false)
        changeTitle(newTitle)
    };

    const onChangeNewTitleHandler = (e: ChangeEvent<HTMLInputElement>) => setNewTitle(e.currentTarget.value);

    const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') { 
            changeTitle(newTitle) 
            setEditMode(false)
        }
    };

    return(
        editMode
        ? <TextField value={newTitle} onChange={onChangeNewTitleHandler} onKeyDown={onKeyDownHandler} onBlur={activeViewMode} autoFocus variant={'standard'}/> 
        : <span onDoubleClick={activeEditMode} >{title}</span>
    )
};