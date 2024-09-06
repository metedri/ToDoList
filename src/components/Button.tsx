import { ButtonHTMLAttributes } from "react"

type Props = {
    classes?: string
} & ButtonHTMLAttributes<HTMLButtonElement>

export const Button = ({children, onClick, classes}: Props) => {

    return (
        <button className={classes} onClick={onClick}>{children}</button>
    )
}