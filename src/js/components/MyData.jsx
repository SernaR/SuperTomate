import React, { useState } from 'react'
import Field from './forms/Field'
import ReadOnlyField from './forms/ReadOnlyField'
import userAPI from '../services/userAPI'

import toast from '../services/toaster'

function MyData({user}) {
    const{ name, email } = user

    const [credentials, setCredentials] = useState({
        password: '',
        passwordConfirm: ''
    });

    const [errors, setErrors] = useState({
        password: '',
        passwordConfirm: ''
    });

    const handleChange = ({ currentTarget }) => {
        const { name, value } = currentTarget;
        setCredentials({ ...credentials, [name]: value });
    };

    const handleSubmit = async event => {
        event.preventDefault();

        if(credentials.password !== credentials.passwordConfirm) {
            setErrors({...errors,passwordConfirm: "Votre confirmation de mot de passe n'est pas conforme avec le mot de passe original" })
            return
        }

        try{
            await userAPI.passwordChange(credentials)
            toast.success("Le mot de passe a été modifié avec success")
            
            setCredentials({
                password: '',
                passwordConfirm: ''
            })
            setErrors({
                password: '',
                passwordConfirm: ''
            });

        }catch({ response }) {
            setErrors({...errors, password: response.data })
        }
    }    

    return(
        <form onSubmit={handleSubmit}>
            <ReadOnlyField name="name" label="Mon pseudo :" value={name}/>
            <ReadOnlyField name="email" label="Mon email :" value={email}/> 
            <Field 
                name="password" 
                label="Modifier le mot de passe" 
                error ={errors.password}
                value={credentials.password}
                onChange={handleChange}
                type="password" 
            
            />
            <Field 
                name="passwordConfirm" 
                label="Confirmation" 
                value={credentials.passwordConfirm}
                onChange={handleChange}
                type="password" 
                error={errors.passwordConfirm}
            />              
            <div className="row justify-content-end mr-1">
                <button 
                    type="submit" 
                    className="btn btn-outline-secondary btn-sm"
                >Modifier</button>
            </div>
        </form>  
    )
}

export default MyData