import React from 'react';
import Like from './Like';

const Vote = ({ recipe, userId, recipeId, onLike, isAdmin }) => {
    const { user, likes } = recipe
    let isRecorded

    if (likes) {
        isRecorded = likes.findIndex( like => like.userId === userId) === -1
    }  
    
    const handleLike = (record) => onLike({...record, userId})

    return ( <>
        {((user && userId === user.id) || isAdmin) 
            && isRecorded 
            && <Like recipeId={ recipeId } onLike={handleLike}/> 
        }
    </> );
}
 
export default Vote;

