import React from 'react';

const ClassicTextarea = ({ name, label, value, onChange, error = "" }) => 
    (<div className="form-group">
        <label htmlFor={name}>{label}</label>
        <textarea  
            value={value}
            onChange={onChange}
            name={name} 
            id={name} 
            className={"form-control" + (error && " is-invalid") }>
        </textarea>
        {error && <p className="invalid-feedback">{error}</p>}  
    
        
    </div>)  
     
export default ClassicTextarea;