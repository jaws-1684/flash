import React from 'react'
import FormField from '../FormField' 
import { BASE_CLASSES } from './BaseClasses'

export const emailIsValid = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)

function EmailField({onChange, name="email", label="Email", value="", error=""}) {
    let resultClasses = BASE_CLASSES.base

    switch (emailIsValid(value)) {
        case true:
            resultClasses = resultClasses.concat(" ", BASE_CLASSES.valid)
            break
        case false:
            if (value != "") {
                resultClasses = resultClasses.concat(" ", BASE_CLASSES.invalid)
            }
            break    
    }
    return (<FormField>
        <label className={BASE_CLASSES.label} htmlFor={name}>{label}</label>   
        <input onChange={onChange} 
            className={resultClasses} 
            name={name} 
            type="email" 
            autoFocus
            autoComplete="email"
            value={value}
            placeholder='Enter your email'
            required
            />
         {error && <Error title={label} text={error}/>} 
    </FormField>
  )
}

export default EmailField