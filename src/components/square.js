
export default function Square(props) {
    return (
        <button
            className={`square ${props.isWinning}`}
            onClick={props.onClick}>
            {props.value}
        </button>
    );
}