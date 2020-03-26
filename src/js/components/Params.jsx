import React, { useState } from 'react';

const Params = ({ params, name, title, onSubmit }) => {
    
    const [param, setParam] = useState('')

    const handleChange = ({ currentTarget }) => {
        setParam(currentTarget.value)
    }

    const handleClick = () => {
        onSubmit(param, name)
        setParam('')
    }

    return ( <>
        <div className="form-group">
            <label className="control-label">{ title }</label>
            <div className="form-group">
                <div className="input-group mb-3">
                    <input name={ name } type="text" value={ param } className="form-control" onChange={ handleChange }/> 
                    <div className="input-group-append">
                        <span className="input-group-text pointer" onClick={ handleClick }>Envoyer</span>
                    </div>
                </div>
            </div>
        </div>
        <ul>
            { params.map( (param, index) => <li key={index}>{param.name}</li> )}
        </ul>
    </> );
}
 
export default Params;