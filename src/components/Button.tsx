import { ButtonHTMLAttributes } from "react"

type Props = {
    classes?: string
} & ButtonHTMLAttributes<HTMLButtonElement>

export const Button = ({title, onClick, classes}: Props) => {

    return (
        <button className={classes} onClick={onClick}>{title}</button>
    )
}