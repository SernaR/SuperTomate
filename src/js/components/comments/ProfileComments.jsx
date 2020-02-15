import React from 'react';
import CommentBlock from '../blocks/CommentBlock';
import Comment from './ProfileComment'


const ProfileComments = ({comments, onRead}) => {
    const pluriel = comments.length > 1 ? 's' : ''

    return ( 
    <CommentBlock title={ comments.length + " commentaire" + pluriel }>
    { comments.map( ({ id, content, createdAt, recipe }, index) =>  
        <Comment 
            key={ index }
            id={ id }
            content={content}
            createdAt={createdAt}
            recipe = { recipe && recipe.name }
            onRead = { () => onRead(id) }
        /> ) 
    }
</CommentBlock> );
}
 
export default ProfileComments;
