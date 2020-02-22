import React, { useState  } from 'react';
import Slug from './Slug';
import recipesAPI from '../services/recipesAPI';

const Slugs = ({slugs, onSlugChange}) => {

    const handleSetSlug = (id, slug, category) => {
        try {
            recipesAPI.setSlug(id, slug)
            onSlugChange(id, slug, category)
        
        }catch(err){
            console.log(err.response)
        }    
    }

    const pluriel = slugs.length > 1 ? 's' : ''

    return (  
        <>
            <h2>{ slugs.length + " recette" + pluriel } à vérifier</h2>
            
            {slugs.map( (slug, index) => <Slug key={index} slug={slug} onSetSlug={handleSetSlug} /> )}
            
        </>
     );
}
 
export default Slugs;