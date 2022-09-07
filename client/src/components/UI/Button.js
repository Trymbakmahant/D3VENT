const Button = (props) => {

    const classNames = `btn ${props.classes}`;

    const clickHandler = () => {
        if(props.onClick){
            props.onClick();
        }
        return;
    };

    return (
        <button className= {classNames} onClick = {clickHandler}>
                {props.children}
        </button>
    );
};

export default Button;