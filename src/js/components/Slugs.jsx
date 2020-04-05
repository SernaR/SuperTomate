import React, { useState  } from 'react';
import Slug from './Slug';
import recipesAPI from '../services/recipesAPI';
import CommentBlock from './blocks/CommentBlock';

import toast from '../services/toaster' 

const Slugs = ({slugs, onSlugChange}) => {

    const handleSetSlug = (id, slug, category) => {
        try {
            recipesAPI.setSlug(id, slug)
            onSlugChange(id, slug, category)
        
        }catch(err){
            toast.error("Oups, un problème est survenue")
        }    
    }

    const pluriel = slugs.length > 1 ? 's' : ''

    return (  
        <CommentBlock title={ slugs.length + " recette" + pluriel + " à vérifier"}>
            {slugs.map( (slug, index) => <Slug key={index} slug={slug} onSetSlug={handleSetSlug} /> )} 
        </CommentBlock>
     );
}
 
export default Slugs;