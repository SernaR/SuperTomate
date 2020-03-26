import React from 'react';
import { Link } from 'react-router-dom';
import { recipeUrl } from '../services/utils'

const Super = ({bestRecipe }) => {
    const{ Recipe, recipeId } = bestRecipe
   
    return ( 
        <section className="pt-3">
            <h2 className="display-4 text-primary text-center pt-3 mb-4">La super-héroïne du potager</h2>
            {Recipe && <>
                <div className="container">
                    <img src={ Recipe.picture } className="img-fluid" alt={ Recipe.name } ></img>
                </div>
                <h3 className="text-center">
                    <Link  
                        to={ recipeUrl(Recipe.category, Recipe.slug) +  recipeId }
                    >{ Recipe.name }</Link>
                </h3>
            </>}
        </section>
    );
}
 
export default Super;
