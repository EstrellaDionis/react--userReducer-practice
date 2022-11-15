import React, { useState, useEffect, useReducer } from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';

//lesson 116
//created outside of the component to show that this does not need ...
const emailReducer = (state, action) => {
  if(action.type === 'USER_INPUT'){
    //value: action.val is getting the userinput inside emailChangeHandler func
    //action.val is the payload we appended in emailChangeHandler func
    //isValid is checking the validity that state INCLUDES the '@'. The .includes is the validity
  return { value: action.val, isValid: action.val.includes('@') };
  }
  if(action.type === 'INPUT_BLUR'){
    //state.value is the last state snapshot that was entered for the email. We don't want to lose the input just because it blurred.
    //isValid is checking if that state includes the '@'
  return { value: state.value, isValid: state.value.includes('@') }
  }
  //for any other action, this default state will be returned
  return { value: '', isValid: false }
}

const passwordReducer = (state, action) => {
  if(action.type === 'USER_INPUT'){
    //value: action.val is getting the userinput inside emailHandler function
    //isValid is checking if that state includes the '@'
  return { value: action.val, isValid: action.val.trim().length > 6 };
  }
  if(action.type === 'INPUT_BLUR'){
    //state.value is the last state snapshot that was entered for the email
    //isValid is checking if that state includes the '@'
    return { value: state.value, isValid: state.value.trim().length > 6 }
  }
  //for any other action, this default state will be returned
  return { value: '', isValid: false }
}

const Login = (props) => {
  // const [enteredEmail, setEnteredEmail] = useState('');
  // const [emailIsValid, setEmailIsValid] = useState();
  // const [enteredPassword, setEnteredPassword] = useState('');
  // const [passwordIsValid, setPasswordIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);

  //you can treat this like slices of state almost
  //the dispatchEmail is used like a state updating. Instead of just setting a new state value though, you dispatch an action and that action gets consumed by the FIRST ARGUMENT, used be useReducer
  //the default values are given to the emailState slice
  const [emailState, dispatchEmail] = useReducer(emailReducer, {
    value: '',
    isValid: false,
  })

  const [passwordState, dispatchPassword] = useReducer(passwordReducer,  {
    value: '',
    isValid: null,
  })

  useEffect(() => {
    console.log('EFFECT RUNNING');

    return () => {
      console.log('EFFECT CLEANUP');
    };
  }, []);

  //object destructure here to make the useEffect re-run only when both validities change instead of with each state change
  //How to read: from emailState/passwordState we are extracting isValid and then STORING them in emailisValid/passwordIsValid constant
  const { isValid: emailisValid } = emailState
  const { isValid: passwordIsValid } = passwordState

  useEffect(() => {
    const identifier = setTimeout(() => {
      console.log('Checking form validity!');
      setFormIsValid(emailisValid && passwordIsValid);
    }, 500);

    return () => {
      console.log('CLEANUP');
      clearTimeout(identifier);
    };
  }, [emailisValid, passwordIsValid]);

  const emailChangeHandler = (event) => {
    //type is the action
    // val is the payload and here, we are saving what the user entered
    dispatchEmail({ type: 'USER_INPUT', val: event.target.value })

    // setFormIsValid(
    //   event.target.value.includes('@') && passwordState.isValid
    // );
  };

  const passwordChangeHandler = (event) => {
    dispatchPassword({type: 'USER_INPUT', val: event.target.value})

    setFormIsValid(
      //here we check if the emailState is valid which is done so within emailChangeHandler function 
      //and also checking if the entered characters are greater than 6
      emailState.isValid && event.target.value.trim().length > 6
    );
  };

  const validateEmailHandler = () => {
    dispatchEmail({ type: 'INPUT_BLUR' })
  };

  const validatePasswordHandler = () => {
    dispatchPassword({type: 'INPUT_BLUR'})
  };

  const submitHandler = (event) => {
    event.preventDefault();
    props.onLogin(emailState.value, passwordState.value);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${
            emailState.isValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={emailState.value}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div>
        <div
          className={`${classes.control} ${
            passwordState.isValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={passwordState.value}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
        </div>
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
