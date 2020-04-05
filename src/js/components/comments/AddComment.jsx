import React, { useState } from 'react';
import CommentBlock from '../blocks/CommentBlock';
import commentsAPI from '../../services/commentsAPI';

import toast from '../../services/toaster' 

const AddComment = ({ recipeId }) => {
    const [comment, setComment] = useState('')

    const handleChange = ({ currentTarget }) => {
        setComment(currentTarget.value)
    }

    const handleSubmit = async event => {
        event.preventDefault() 
        try {
            await commentsAPI.save(recipeId, comment)
            toast.success("Le commentaire est soumis pour modération")
            setComment('')
        } catch(err) {
            toast.error("Oups, un problème est survenue")
        } 
        
    }

    return ( 
        <CommentBlock title="Laissez un commentaire">
            <form onSubmit={handleSubmit}>
                <div className="form-row">
                    <label htmlFor="comment">Votre commentaire</label>
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
                        className="btn btn-primary btn-sm mr-3"
                        >Envoyer</button>
                </div>
            </form>      
        </CommentBlock>
    );
}
 
export default AddComment;