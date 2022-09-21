import { useState } from "react";

const Input = (props) => {
  const [input, setInput] = useState('');  

  const changeInputHandler = (event) =>{

    setInput(event.target.value);

    props.inputChange(props.label, event.target.value);
  };

  return (
    <div>
      <label className="label">
        <span className="label-text">{props.label}</span>
      </label>
      <input
        value = {input}
        onChange = {changeInputHandler} 
        type={props.type}
        placeholder={props.placeholder}
        min={props.min ? props.min : ""}
        max={props.max ? props.max : ""}
        className="input input-bordered input-primary w-full max-w-xs"
        required
      />
    </div>
  );
};

export default Input;
