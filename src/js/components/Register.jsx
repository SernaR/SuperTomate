import React, { useState } from 'react';
import Field from './forms/Field';
import authAPI from '../services/authAPI';
import toast from '../services/toaster'


const Register = () => {

    const [user, setUser] = useState({
        name: '',
        email: '',
        password: '',
        passwordConfirm: ''
    });

    const [errors, setErrors] = useState({
        name: '',
        email: '',
        password: '',
        passwordConfirm: ''
    });

    const handleChange = ({ currentTarget }) => {
        const { name, value } = currentTarget;
        setUser({ ...user, [name]: value });
    };

    const handleSubmit = async event => {
        event.preventDefault();

        const apiErrors = {};
        if(user.password !== user.passwordConfirm) {
            apiErrors.passwordConfirm = "Votre confirmation de mot de passe n'est pas conforme avec le mot de passe original";
            setErrors(apiErrors)
            toast.error("Il y a des erreurs dans votre formulaire")
            return
        }
        
        try{
            await authAPI.register(user)
            
            toast.success(user.name + " est bien inscrit(e)")
            setUser({
                name: '',
                email: '',
                password: '',
                passwordConfirm: ''
            })
            setErrors({})

        }catch ({ response }) {
            const messages = response.data;
            if(messages) {
                messages.map( ({ propertyPath, message }) => {
                    apiErrors[propertyPath] = message;
                });
                setErrors(apiErrors);

                toast.error("Il y a des erreurs dans votre formulaire")
            } 
        }
    }

    return (  
        <form onSubmit={handleSubmit}>
            <Field
                name="name" 
                label="Pseudo" 
                error ={errors.name}
                value={user.name} 
                onChange={handleChange} />
            <Field 
                name="email" 
                label="Adresse email"
                error ={errors.email}
                value={user.email} 
                onChange={handleChange}
                type="email" 
               
            /> 
            <Field 
                name="password" 
                label="Mot de passe" 
                error ={errors.password}
                value={user.password}
                onChange={handleChange}
                type="password" 
            
            />
            <Field 
                name="passwordConfirm" 
                label="Confirmation du mot de passe" 
                value={user.passwordConfirm}
                onChange={handleChange}
                type="password" 
                error={errors.passwordConfirm}
            />              
            <div className="row justify-content-end mr-1">
                <button 
                    type="submit" 
                    className="btn btn-primary btn-sm"
                >Inscrire</button>
            </div>
        </form>  
    );
}
 
export default Register;
