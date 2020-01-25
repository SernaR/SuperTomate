import React from 'react';
import Recipecard from './RecipeCard';

const RecipeCards = ({ recipes,col }) => {
    return ( 
        <div className="card-group">
            { recipes.map( (recipe, index) => <Recipecard className="row text-center" key={ index } recipe={ recipe } col={col}/>)}
        </div>
     );
}
 
export default RecipeCards;