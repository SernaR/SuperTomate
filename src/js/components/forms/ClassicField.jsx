import React from 'react';

const ClassicField = ({ name, label, value, onChange, placeholder = "", type = "text", error = "" }) => 
    (  
        <div className="form-group">
            
                <label htmlFor={name} className="lead">{label}</label>
               
                    <input 
                        value={value}
                        onChange={onChange}
                        type={type}
                        name={name} 
                        id={name} 
                        className={"form-control" + (error && " is-invalid") }/>
                    {error && <p className="invalid-feedback">{error}</p>}  
              
          
        </div>  
    )
 
export default ClassicField;