import React from 'react';

import classes from './Input.module.css'

const Input = props => {

  //to future me: I did not bother and removed all things with refs because it seemed extremely niche as the instructor said and the app works just fine without it. Lesson 128
  //only runs after the first time this component is rendered hence, the empty array as the depency 
  //focus method is available on the input-dom object to which we got access through the ref (inputRef.current). Lesson 128
  //focus is a javascript method that is specifically built into the input-dom object that you're dealing with
  // useEffect(() => {
  //   inputRef.current.focus();
  // }, [])

  //the ref prop is on all built-in html components like, input
    return (
        <div
        className={`${classes.control} ${
          props.isValid === false ? classes.invalid : ''
        }`}
      >
        <label htmlFor={props.id}>{props.label}</label>
        <input
          type={props.type}
          id={props.id}
          value={props.value}
          onChange={props.onChange}
          onBlur={props.onBlur}
        />
      </div>
    )
};

export default Input;