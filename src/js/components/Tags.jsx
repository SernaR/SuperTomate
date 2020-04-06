import React from 'react';
import AddRecipeBlock from './blocks/AddRecipeBlock';
import Tag from './Tag';

const Tags = ({tagList, tags, onTagChange, error}) => {

    const handleClick = id => {
        if ( tags.indexOf(id) === -1 && tags.length < 3 ) {
            tags.push(id)
            onTagChange('tags', tags)
        } else  {
            onTagChange('tags', tags.filter( tag => tag !== id ))  
        }
    }

    return ( 
        <AddRecipeBlock>
            { tagList.map( (tag, index) => <Tag
                key={ index } 
                name={ tag.name }  
                color={ tags && tags.includes(tag.id) ? "secondary" : "primary" }
                onClick={() => handleClick(tag.id)}/>
            )}
            <p><span className="small">Limité à 3 badges maximum</span>{error && <span className="small error-message"> - {error}</span>}</p>
              
        </AddRecipeBlock>
    );
}
 
export default Tags;
