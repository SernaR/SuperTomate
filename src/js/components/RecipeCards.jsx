import React from 'react';
import Recipecard from './RecipeCard';

const RecipeCards = ({ recipes }) => {
    return ( 
        <div className="card-group">
            { recipes.map( (recipe, index) => <Recipecard className="row text-center py-3" key={ index } recipe={ recipe }/>)}
        </div>
     );
}
 
export default RecipeCards;