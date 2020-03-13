import React, { useState, useRef, useEffect } from 'react';

const Step = ({index, step, onAdd, onUpdate, onDelete}) => {

    let inputRef = useRef(null)

    useEffect(() => {
        if(item.update) inputRef.current.focus()
      });

    const [item, setItem] = useState({
        content: '', 
        update: false,
    })

    const handleChange = ({ currentTarget }) => {
        setItem({ ...item, content: currentTarget.value }) 
    }
    
    const handleClick = (event) => {
        event.preventDefault()
        
        if (item.content) {
            item.update ? onUpdate(item, index) : onAdd(item)
            setItem({
                content: '', 
                update: false,
            })
        }
    }
    
    const updateStep = () => {
        setItem({
            content: step.content,
            update: true
        })
    }
    const deleteStep = (event) => {
        event.preventDefault()
        onDelete(step)
    }

    return (
        <>{ (step && !item.content) && 
        
            <div className="list-group-item d-flex justify-content-between bg-light">
                { step.content }
                <div className="btn-group">
                    <i className="fas fa-pencil-alt mx-2 text-primary pointer" onClick={ updateStep }></i>
                    <i className="fas fa-trash-alt mx-2 text-danger pointer" onClick={ deleteStep }></i>
                </div>
            </div>
        ||
            <div className="input-group mb-3">
                <textarea
                    value={ item.content }
                    ref={ inputRef }
                    onChange={ handleChange }
                    className="form-control"
                    aria-label="basic-addon"
                    aria-describedby="basic-addon"
                />
            <div className="input-group-append">
                    <button
                        className="input-group-text"
                        onClick={ handleClick }
                    >Ajouter</button>
                </div>
            </div>}
        </> 
     );
}
 
export default Step;

