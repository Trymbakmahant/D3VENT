import Input from "../UI/Input";
import Button from "../UI/Button";
import { useState, useContext } from "react"; //import useContext
import { AppContext } from "../context/AddressContext"; // import Appcontext

const Host = () => {
    const [formInput, setFormInput] = useState({
        name: '',
        price: '',
        capacity: '',
        date: '',
        time: '',
        timeFormat: '',
        thumbnail: '',
    });

    const ctx = useContext(AppContext); //initialize ctx
  
    let currentDate = new Date();
    const dd = String(currentDate.getDate()).padStart(2, '0');
    const mm = String(currentDate.getMonth() + 1).padStart(2, '0');
    const yyyy = currentDate.getFullYear();  
    currentDate = yyyy + '-' + mm + '-' + dd


    const timeFormatHandler = (event) => {
        setFormInput((prevState) => {
            return {
                ...prevState,
                timeFormat: event.target.value
            };
        });

    }

    const inputHandler = (label, inputValue) =>{

        switch(label){
            
            case 'Event Name':
                setFormInput((prevState) => { return {...prevState, name: inputValue}});
            break;

            case 'Ticket price':
                setFormInput((prevState) => {return {...prevState, price: inputValue}});
            break;

            case 'Capacity':
                setFormInput((prevState) => {return {...prevState, capacity: inputValue}});
            break;
            
            case 'date':
                setFormInput((prevState) => {return {...prevState, date: inputValue}});
            break;

            case 'time':
                setFormInput((prevState) => {return {...prevState, time: inputValue}});
            break;

            case 'thumbnail':
                setFormInput((prevState) => {return {...prevState, thumbnail: inputValue}});
            break;

        }
    }

    const formSubmitHandler = (event) =>{
        event.preventDefault();
        
        ctx.sharedState.createNewEvent(formInput);
    };

    return (
        <div>
            <form onSubmit={formSubmitHandler}>
                <Input type = "text" label = "Event Name" placeholder = "Enter your event name" inputChange = {inputHandler}/>
                <Input type = "text" label = "Ticket price" placeholder = "Enter ticket price(in wei)" inputChange = {inputHandler}/>
                <Input type = "text" label = "Capacity" placeholder = "How many people can join" inputChange = {inputHandler}/>
                <Input type = "date" label = "Date" placeholder = "Enter event date" min = {currentDate} inputChange = {inputHandler}/>
                <Input type = "number" label = "Time" placeholder = "What's the timing of event" min = "1" max = "12" inputChange = {inputHandler}/>
                <select class="select select-info w-full max-w-xs" onChange = {timeFormatHandler}>
                <option disabled selected>AM/PM</option>
                <option>AM</option>
                <option>PM</option>
                </select>
                <Input type = "text" label = "Thumbnail" placeholder = "A link to the thumbnail of event" inputChange = {inputHandler}/>
                <Button classes = "btn-primary btn-wide">Submit Event</Button>
            </form>
        </div>
    )
};

export default Host;