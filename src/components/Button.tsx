import { ButtonHTMLAttributes } from "react"

type Props = {
    activeFilter?: boolean
} & ButtonHTMLAttributes<HTMLButtonElement>

export const Button = ({title, onClick, activeFilter}: Props) => {
    const finalClassName = `${activeFilter ? 'active-filter': ''}`

    return (
        <button className={finalClassName} onClick={onClick}>{title}</button>
    )
}