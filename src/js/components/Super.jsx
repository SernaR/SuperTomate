import React from 'react';
import { Link } from 'react-router-dom';
import { recipeUrl } from '../services/utils'

const Super = ({ headline }) => {
    const{ recipe, highlight } = headline
   
    return ( 
        <section className="container pt-3">
            <h2 className="display-4 text-primary text-center pt-3 mb-4 recipe">La super-héroïne du potager</h2>
            { recipe && <>
                <div className="pt-3">
                    <div className="row p-3">
                        <div id="recette-img" className="col">
                            <img src={ recipe.picture } className="img-fluid card" alt={ recipe.name } ></img>
                        </div>
                        <div className="col text-center p-4">
                            <h3 className="text-center home-title-3 py-2">
                                { recipe.name }
                            </h3>
                            <p className="heroine">{ highlight.content }</p>
                            <Link
                                className="btn btn-danger py-3"  
                                to={ recipeUrl(recipe.category, recipe.slug) +  recipe.id }
                            >Je découvre la recette</Link>
                        </div>
                    </div>
                </div>
            </>}
        </section>
    );
}
 
export default Super;
