import React from 'react';

const Check = ({ name, onChange, checked }) => {
    return ( 
        <div className="form-check">
            <input 
                className="form-check-input" 
                type="checkbox" 
                name={ name } 
                checked={ checked }
                id={ name } 
                onChange={onChange}
            />
            <label className="form-check-label" htmlFor={ name }>
                { name }
            </label>
        </div>
    );
}
 
export default Check;