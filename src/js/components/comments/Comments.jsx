import React from 'react';
import Comment from './Comment';
import CommentBlock from '../blocks/CommentBlock';

const Comments = (props) => {
    return ( 
        <CommentBlock title="Commentaires">
            <Comment />
            <Comment />
            <Comment />
        </CommentBlock>
    );
}
 
export default Comments;