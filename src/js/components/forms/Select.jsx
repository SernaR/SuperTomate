import React from 'react';

const Select = ({ name, label, value, onChange, options }) => 
    (  
        <div className="form-group">
            <div className="row">
                <label htmlFor={name} className="lead col-sm-4">{label}</label>
                <div className="col-sm-8">
                    <select 
                        className="form-control" 
                        value={value}
                        onChange={onChange}
                        id={name} 
                        name={name} >
                    { 
                    options.map( (option, index) => <option key={index} value={option.id}>{ option.name }</option>)
                    }
                    </select>      
                </div>
            </div>
        </div>  
    )
 
export default Select;