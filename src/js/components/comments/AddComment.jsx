import React from 'react';
import CommentBlock from '../blocks/CommentBlock';
import commentsAPI from '../../services/commentsAPI';

import toast from '../../services/toaster' 
import CommentField from '../forms/CommentField';

const AddComment = ({ recipeId }) => {

    const handleSubmit = async comment => { 
        try {
            await commentsAPI.save(recipeId, comment)
            toast.success("Le commentaire est soumis pour modération")
        } catch(err) {
            toast.error("Oups, un problème est survenue")
        }   
    }

    return ( 
        <CommentBlock title="Laissez un commentaire">
            <CommentField onSubmit={ handleSubmit }/>
        </CommentBlock>
    );
}
 
export default AddComment;
