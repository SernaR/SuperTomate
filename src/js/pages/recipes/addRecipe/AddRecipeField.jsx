import React from 'react';

const AddRecipeField = ({ name, label, value, onChange, placeholder = "", type = "text", error = "", children }) => 
    (  
        <div className="form-group">
            <div className="row">
                <label htmlFor={name} className="lead col-sm-4">{label}</label>
                <div className="col-sm-8">
                    { children ? children :
                        <>
                            <input 
                                value={value}
                                onChange={onChange}
                                type={type}
                                placeholder={placeholder || label}
                                name={name} 
                                id={name} 
                                className={"form-control" + (error && " is-invalid") }/>
                            {error && <p className="invalid-feedback">{error}</p>}
                        </>
                    }   
                </div>
            </div>  
        </div>
        
    )

 
export default AddRecipeField;