import React, { useState } from 'react';
import Field from './forms/Field';
import authAPI from '../services/authAPI';

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
            //toast.error('Des erreurs dans votre formulaire')
            return
        }
        
        try{
            await authAPI.register(user)
            setUser({
                name: '',
                email: '',
                password: '',
                passwordConfirm: ''
            })
            setErrors({})
            //toast.success('Vous êtes inscrit, vous pouvez vous connecter')

        }catch ({ response }) {
            const messages = response.data;
            if(messages) {
                messages.map( ({ propertyPath, message }) => {
                    apiErrors[propertyPath] = message;
                });
                setErrors(apiErrors);
                //toast.error('Des erreurs dans votre formulaire')
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
            <div className="form-group">
                <button 
                    type="submit" 
                    className="btn btn-primary"
                >Inscrire</button>
            </div>
        </form>  
    );
}
 
export default Register;
