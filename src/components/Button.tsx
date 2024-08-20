type Btn = {
    title: string
    onClick: () => void
}

export const Button = (props: Btn) => {
    return (
        <button onClick={props.onClick}>{props.title}</button>
    )
}