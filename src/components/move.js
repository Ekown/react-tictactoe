
export default function Move(props) {
    return (
        <li>
          <button 
            style={{ fontWeight: props.isSelected && 'bold' }} 
            onClick={props.onClick}
          >
            {props.desc}
          </button>
        </li>
    );
}