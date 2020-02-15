import React from 'react';
import Comment from './RecipeComment';
import CommentBlock from '../blocks/CommentBlock';
import commentsAPI from '../../services/commentsAPI';

const RecipeComments = ({ comments, onModerated = null, isAdmin = false }) => {
    const handleValidate =  id => {
        moderateComment( id, 'add')
    }

    const handleRemove = id => {
        moderateComment( id, 'remove')
    }

    const moderateComment = async (id, mode) => {
        const originalComments = [...comments]
        try{
            await commentsAPI.moderate(id, mode)
            onModerated(comments.filter( comment => comment.id !== id))
        }catch(err) {
            console.log(err.response)
            onModerated(originalComments)
        }
    }

    const handleAnswer = id => {

    }

    const pluriel = comments.length > 1 ? 's' : ''

    return ( 
        <CommentBlock title={ comments.length + " commentaire" + pluriel }>
            { comments.map( ({ id, content, createdAt, user }) =>  
                <Comment 
                    key={ id }
                    id={ id }
                    content={content}
                    createdAt={createdAt}
                    userName = { user.name }
                    isAdmin = { isAdmin }
                    onValidate = { () => handleValidate(id) }
                    onRemove = { () => handleRemove(id) } 
                    onAnswer = { handleAnswer }
                /> ) 
            }
        </CommentBlock>
    );
}
 
export default RecipeComments;