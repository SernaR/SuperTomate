import React from 'react';
import { Link } from 'react-router-dom';
import { recipeUrl } from '../services/utils'

const MyRecipes = ({ recipes }) => {

    const myRecipes = recipes.map( (recipe, index) => 
        <div className="row" key={index} >
            <div className="col-10">
            <Link 
                to={recipeUrl(recipe.category, recipe.slug) + recipe.id }  
                style={{textDecoration: 'none'}} 
            >
                <li className="list-group-item list-group-item-action d-flex justify-content-between align-items-center">
                    <span >{ recipe.name }</span>
                    { recipe.isDraft && <span className="badge badge-secondary mx-1" >Brouillon</span>}
                </li>
            </Link></div>
            <div className="col-2">
                <Link to={ "/addRecipe/" + recipe.id} >
                    <li className="list-group-item list-group-item-action d-flex justify-content-between align-items-center">
                        <span className="mx-3 badge badge-primary pointer">modifier</span>
                    </li>    
                </Link>
            </div>
            
        </div>
    )

    return ( 
        <ul className="list-group">
            { myRecipes}
        </ul>
     );
}
 
export default MyRecipes;