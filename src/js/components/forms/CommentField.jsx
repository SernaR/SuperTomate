import React, { useState } from 'react';

const CommentField = ({ onSubmit }) => {
    const [comment, setComment] = useState('')

    const handleChange = ({ currentTarget }) => {
        setComment(currentTarget.value)
    }

    const handleSubmit = event => {
        event.preventDefault() 
        onSubmit(comment)
        setComment('')
    }

    return ( 
        <form onSubmit={ handleSubmit }>
            <div className="form-row">
                <textarea 
                    className="form-control" 
                    id="comment" 
                    rows="5"  
                    value={ comment }  
                    onChange={ handleChange }
                ></textarea>
            </div>
            <div className="row mt-3 justify-content-end">
                <button 
                    type="submit" 
                    className="btn btn-outline-danger btn-sm mr-3"
                    >Envoyer</button>
            </div>
        </form>      
    );
}
 
export default CommentField;