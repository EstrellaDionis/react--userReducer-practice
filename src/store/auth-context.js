import React from 'react';

//createContext takes a DEFAULT context and which is app or component-wide state
//createContext gives us an object that also contains components. "While AuthContext is not a component, it is an object that will CONTAIN a component"
const AuthContext = React.createContext({ 
    isLoggedIn: false
});

export default AuthContext;


//we wrap this component in the App component and now, this state is available in ALL of those components