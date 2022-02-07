export default function EditField(props) {
  return (
    <>
      {props.edit && <input onChange={props.onChange} value={props.value} />}
      {!props.edit && <span>{props.value}</span>}
    </>
  );
}
