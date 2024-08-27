import { ButtonHTMLAttributes } from "react"

type Props = ButtonHTMLAttributes<HTMLButtonElement>

export const Button = ({title, onClick}: Props) => {
    return (
        <button onClick={onClick}>{title}</button>
    )
}