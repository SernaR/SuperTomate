import React from 'react';
import { Link } from 'react-router-dom';
import { recipeUrl } from '../services/utils'

const Super = ({bestRecipe }) => {
    const{ Recipe, recipeId } = bestRecipe
   
    return ( 
        <section className="container pt-3">
            <h2 className="display-4 text-primary text-center pt-3 mb-4 recipe">La super-héroïne du potager</h2>
            {Recipe && <>
                <div className="pt-3">
                    <div className="row p-3">
                        <div id="recette-img" className="col">
                            <img src={ Recipe.picture } className="img-fluid card" alt={ Recipe.name } ></img>
                        </div>
                        <div className="col text-center p-4">
                            <h3 className="text-center home-title-3 py-2">
                                { Recipe.name }
                            </h3>
                            <p className="heroine">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus volutpat diam in sem facilisis rhoncus. Quisque consequat tincidunt convallis. Cras eget luctus tortor. Mauris gravida lectus a dui pellentesque, convallis tincidunt arcu consequat. Aliquam libero nulla, placerat a dignissim sit amet, cursus ac purus. Integer egestas eu massa in dapibus. Mauris posuere massa sem, volutpat efficitur justo blandit sit amet. Cras quis pulvinar ipsum. Maecenas eros massa, tincidunt ut lacus at, rhoncus accumsan ipsum. Vestibulum metus nisl, posuere vel risus at, convallis ultricies tellus. Donec a metus laoreet, tincidunt eros eget, ultricies ante. Curabitur non justo sed libero facilisis cursus. Morbi ornare, nulla vitae semper blandit, turpis dui imperdiet libero, non pretium erat metus non mi. Nulla blandit pellentesque purus in ultrices.</p>
                            <Link
                                className="btn btn-danger py-3"  
                                to={ recipeUrl(Recipe.category, Recipe.slug) +  recipeId }
                            >Je découvre la recette</Link>
                        </div>
                    </div>
                </div>
            </>}
        </section>
    );
}
 
export default Super;
