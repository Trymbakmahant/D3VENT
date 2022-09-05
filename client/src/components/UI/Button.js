const Button = (props) => {

    const classNames = `btn ${props.classes}`;

    return (
        <button className= {classNames}>
                {props.children}
        </button>
    );
};

export default Button;