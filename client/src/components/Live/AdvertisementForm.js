import { useState } from "react";

import Button from "../UI/Button";
import Input from "../UI/Input";

import classes from './AdvertisementForm.module.css';

import { useContext } from "react";
import { AppContext } from "../context/AddressContext";

import { useParams } from "react-router-dom";

const AdvertisementForm = (props) => {
    const [formInput, setFormInput] = useState({
        name: '',
        url: '',
        amount: ''
    });
    const [isFormVisible, setIsFormVisible] = useState(false);
    
    const ctx = useContext(AppContext);

    const {id} = useParams();
        const checkEvent = async () => {
            const singleEvent = await ctx.sharedState.getSingleEvent(id);
            // console.log(singleEvent);
            const myTimeout = setInterval(() => {
            fetch('https://ancient-savannah-39465.herokuapp.com/api/checkAd/',  {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
             eventName: singleEvent.name,
            })
        }).then(res => res.json())
        .then(response => {
            if(response !== "udaa de" && response !== "mission failed"){
               props.showAd(true);
               props.imageUrl(response);
            }else{
                props.showAd(false);
                props.imageUrl("");
            }
        })
    }, 5000);

        }

        checkEvent();
   
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
    const formSubmitHandler = async (event) =>{
        event.preventDefault();
        const singleEvent = await ctx.sharedState.getSingleEvent(id);

        const flowRate =  10000000000000;
        await  ctx.sharedState.createNewFlow(singleEvent.organiser, flowRate)

        

            await fetch('https://ancient-savannah-39465.herokuapp.com/api/event', {
                method: 'POST',
                body: JSON.stringify({
                    indexId: Number(singleEvent.sfIndexId),
                    eventName: singleEvent.name,
                    AddvertiseLink: formInput.url,
                    AddvertiseName: formInput.name,
                    time: formInput.amount*10
                }),
                headers:{
                    'Content-Type': 'application/json'
                }
            }) 
            
        
        const timeToStop = formInput.amount*10*1000;
        const stopFlow = () => {

            setTimeout(() => {
                const stopIt = async() => {
                    console.log(typeof(formInput.amount*10));
                    await ctx.sharedState.deleteFlow(singleEvent.organiser);
                }
                stopIt();
            }, timeToStop);
        }
        stopFlow();
        

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
            <p>*The amount you pay decides for how long your advertisement will run.  
            For example - If you pay 1 fDAIx and your ad will run for ~ 10 seconds. You need to have fDAIx in your account to use this function 
            </p>
            </div>
        }
    </div>
};

export default AdvertisementForm;
