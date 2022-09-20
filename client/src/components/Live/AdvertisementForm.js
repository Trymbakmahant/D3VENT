import { useState } from "react";

import Button from "../UI/Button";
import Input from "../UI/Input";

const AdvertisementForm = () => {
    const [isFormVisible, setIsFormVisible] = useState(false);

    const showOrHideFormHandler = () =>{
        setIsFormVisible(!isFormVisible);
    }

    const inputHandler = () =>{

    }
    const formSubmitHandler = () =>{
        
    }

    return <div>
            <Button classes = {`btn-accent btn-outline`} onClick = {showOrHideFormHandler}>{isFormVisible ? "Hide Advertisement Form" : "Show Advertisement Form"}</Button>
            {isFormVisible && <div>
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
                    placeholder = 'Amount you want to pay to run ad'
                    inputChange = {inputHandler}
                />
                <Button classes = 'btn-warning'>Click to add advertisement</Button>
            </form>
            <p>*The amount you pay decides for how  <br /> long your advertisement will run. <br/> 
            For example - If you pay 1 MATIC and <br/> 10 people are watching your stream <br /> then your advertisement will run for 10 seconds. 
            </p>
            </div>
        }
    </div>
};

export default AdvertisementForm;