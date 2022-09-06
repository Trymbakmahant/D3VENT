const Input = (props) => {
  return (
    <div>
      <label className="label">
        <span className="label-text">{props.label}</span>
      </label>
      <input
        type={props.type}
        placeholder={props.placeholder}
        min={props.min ? props.min : ""}
        max={props.max ? props.max : ""}
        className="input input-bordered input-primary w-full max-w-xs"
      />
    </div>
  );
};

export default Input;
