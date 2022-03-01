
export default function Sort(props) {
    return (
      <button
        onClick={props.onClick}
      >
        Sort to {props.desc}
      </button>
    );
}