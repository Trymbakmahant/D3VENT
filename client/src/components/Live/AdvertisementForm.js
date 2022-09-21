import { useState } from "react";

import Button from "../UI/Button";
import Input from "../UI/Input";

import classes from './AdvertisementForm.module.css';

const AdvertisementForm = () => {
    const [formInput, setFormInput] = useState({
        name: '',
        url: '',
        amount: ''
    });
    const [isFormVisible, setIsFormVisible] = useState(false);

    const showOrHideFormHandler = () =>{
        setIsFormVisible(!isFormVisible);
    }

    const inputHandler = (label, inputValue) =>{
        switch(label){
            case 'Name':
                setFormInput((prevState)=>{
                    return {...prevState, name: inputValue}
                });
                break;
            case 'Image Url':
                setFormInput((prevState)=>{
                    return {...prevState, url: inputValue}
                });
                break;
            case 'Amount':
                setFormInput((prevState)=>{
                    return {...prevState, amount: inputValue}
                });
                break;
            default:
                break;
        }
    }
    const formSubmitHandler = (event) =>{
        event.preventDefault();
        console.log('Data is: ', formInput.name, formInput.url, formInput.amount);
    }

    return <div>
            <Button classes = {`btn-accent btn-outline`} onClick = {showOrHideFormHandler}>{isFormVisible ? "Hide Advertisement Form" : "Show Advertisement Form"}</Button>
            {isFormVisible && <div className= {classes.ad}>
                <form onSubmit = {formSubmitHandler}>
                <Input 
                    type = 'text' 
                    label = 'Name' 
                    placeholder = 'Enter your product name' 
                    inputChange = {inputHandler}
                />
                <Input
                    type = 'text'
                    label = 'Image Url'
                    placeholder = 'Product image url (google drive link)'
                    inputChange = {inputHandler}
                />
                <Input
                    type = 'number'
                    label = 'Amount'
                    min = '1'
                    placeholder = 'Amount you want to pay to run ad'
                    inputChange = {inputHandler}
                />
                <Button classes = {`btn-warning ${classes.submit}`}>Click to add advertisement</Button>
            </form>
            <p>*The amount you pay decides for how  <br /> long your advertisement will run. <br/> 
            For example - If you pay 1 MATIC and <br/> 10 people are watching your stream <br /> then your advertisement will run for 10 seconds. 
            </p>
            </div>
        }
    </div>
};

export default AdvertisementForm;