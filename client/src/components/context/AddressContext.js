import { createContext, useState } from "react";

export const AppContext = createContext();

const AppWrapper = (props) =>{
    const [accountAddress, setAccountAddress] = useState('');

    const setAddress = (address) => {
        setAccountAddress(address);
    }

    const sharedState = {
        accountAddress,
        setAddress
    };

    return (
        <AppContext.Provider value = {{sharedState}}>
            {props.children}
        </AppContext.Provider>
    );
};

export default AppWrapper;