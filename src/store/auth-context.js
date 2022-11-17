import React, { useState, useEffect } from 'react';

//THE BEST WAY I'VE BEEN ABLE TO UNDERSTAND THIS SO FAR (GO TO EACH OF THE COMMENTS FOR THEM TO UNDERSTAND DEEPER IF NEED BE)
//The creation of these objects/variables is the ORDER of which they work
// AuthContext is setting the base and these are default states (essentially)
//AuthContextProvider component is housing ALL of the logic related to logging in and out
//AuthContext.Provider is now giving you the ability to pass these values to other components and is pointing at what they WILL be consuming

//P.S: There is also some notes in Index.json HOW all this information can be passed like this


//createContext takes a DEFAULT context which is app or component-wide state
//createContext gives us an object that also contains components. "While AuthContext is not a component, it is an object that will CONTAIN a component"
//we put in dummy functions to make it easier for the IDE to understand what we may want to select. Basically, gives you suggestions easier
const AuthContext = React.createContext({ 
    isLoggedIn: false,
    onLogout: () => {},
    onLogin: (email,password) => {}
});

//This now manages the entire log-in state AND it also sets up all of the context.
//The advantage is that we moved all the logic from App and stored it here and now, we can distribute this as necessary to other components by having Provider point at them
export const AuthContextProvider = (props) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const storedUserLoggedInInformation = localStorage.getItem('isLoggedIn');
    
        if (storedUserLoggedInInformation === '1') {
          setIsLoggedIn(true);
        }
      }, []);

    const logoutHandler = () => {
        localStorage.removeItem('isLoggedIn');
        setIsLoggedIn(false);
    }

    const loginHandler = () => {
        localStorage.setItem('isLoggedIn', '1');
        setIsLoggedIn(true);
    }

//AuthContext.Provider is what components actually consume 
//isLoggedIn is pointing to the AuthContext and the value is pointing to the state
//onLogOut is from AuthContext and pointing to the logoutHandler. Etc.
    return (
    <AuthContext.Provider
        value={{
            isLoggedIn: isLoggedIn,
            onLogout: logoutHandler,
            onLogin: loginHandler
        }}
        >
            {props.children}
    </AuthContext.Provider>)
}

export default AuthContext;

