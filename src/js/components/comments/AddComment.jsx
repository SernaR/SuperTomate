import React, { useState } from 'react';
import CommentBlock from '../blocks/CommentBlock';
import commentsAPI from '../../services/commentsAPI';

const AddComment = ({ recipeId }) => {
    const [comment, setComment] = useState('')

    const handleChange = ({ currentTarget }) => {
        setComment(currentTarget.value)
    }

    const handleSubmit = async event => {
        event.preventDefault() 
        try {
            await commentsAPI.save(recipeId, comment)
            setComment('')
        } catch(err) {
            //NotificationManager.error(err.response.data.error, 'Error');
            console.log(err.response)
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
                <div className="container text-center">
                    <button 
                        type="submit" 
                        className="btn btn-primary btn-lg my-2 w-50"
                        >Envoyer</button>
                </div>
            </form>      
        </CommentBlock>
    );
}
 
export default AddComment;