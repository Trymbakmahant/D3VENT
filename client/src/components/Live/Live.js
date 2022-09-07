import Button from "../UI/Button";

const Live = () =>{
    
    const goLiveHandler = () =>{
        
    };

    return (
        <div>
            <Button classes = 'btn-error btn-wide' onClick = {goLiveHandler}>
                <i class="fa-regular fa-signal-stream fa-2x"></i>&nbsp; Go Live
            </Button>
        </div>
    )
};

export default Live;