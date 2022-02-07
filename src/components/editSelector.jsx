export default function EditSelector(props) {
  return (
    <>
      {props.edit && (
        <select onChange={props.onChange} value={props.value}>
          {props.list.map((el, index) => {
            return (
              <option key={index} value={el}>
                {el}
              </option>
            );
          })}
        </select>
      )}
      {!props.edit && <span>{props.value}</span>}
    </>
  );
}
