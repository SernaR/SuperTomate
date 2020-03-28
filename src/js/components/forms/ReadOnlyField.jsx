import React from 'react';

const ReadOnlyField = ({ name, label, value }) => 
    (  
        <div className="form-group">
            <div className="row">
                <label htmlFor={name} className="lead col-sm-4">{label}</label>
                <div className="col-sm-8">
                    <input 
                        value={value}
                        readOnly
                        type="text"
                        name={name} 
                        id={name} 
                        className="form-control-plaintext" 
                    />    
                </div>
            </div>
        </div>  
    )
 
export default ReadOnlyField;