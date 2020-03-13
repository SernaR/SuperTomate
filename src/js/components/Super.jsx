import React from 'react';
import { Link } from 'react-router-dom';
import { recipeUrl } from '../services/utils'

const Super = ({bestRecipe }) => {
    const{ Recipe, recipeId } = bestRecipe
   
    return ( 
        <section className="pt-3">
            <h2 className="display-4 text-primary text-center pt-3 mb-4">La super-héroïne du potager</h2>
            {Recipe && <div className="jumbotron super">
                <div className="container text-center">
                    <Link 
                        className="btn btn-primary btn-lg align-middle" 
                        to={ recipeUrl(Recipe.category, Recipe.slug) +  recipeId }
                    >{ Recipe.name }</Link>
                </div>
                <div className="container vide"></div>
            </div>}
        </section>
    );
}
 
export default Super;
